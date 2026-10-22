// ============================================================================
// SHARED SALON EMAIL SENDER
// ----------------------------------------------------------------------------
// Every site form (Reserve, homepage Contact) routes through this helper so
// there is a single place that controls delivery.
//
//  • DESTINATION:  edit SALON_INBOX in lib/intake-config.ts
//  • FROM ADDRESS: uses the verified Resend domain (RESEND_EMAIL_DOMAIN) so mail
//    reliably reaches any inbox. Falls back to Resend's sandbox sender only when
//    no verified domain is configured (test mode — delivers to the Resend
//    account owner's address only).
// ============================================================================

import { Resend } from "resend"
import { randomUUID } from "node:crypto"
import { SALON_INBOX } from "./intake-config"

function resolveFrom(): string {
  const configuredFrom = process.env.RESEND_FROM?.trim()
  if (configuredFrom) return configuredFrom

  const domain = process.env.RESEND_EMAIL_DOMAIN?.trim()
  if (domain) return `Renovaré <notifications@${domain.replace(/^https?:\/\//, "")}>`
  return "Renovaré <onboarding@resend.dev>"
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  return apiKey ? new Resend(apiKey) : null
}

export type SendResult = { ok: true } | { ok: false; reason: "missing_key" | "send_failed" }

export async function sendSalonNotification(opts: {
  subject: string
  html: string
  text: string
  replyTo?: string
}): Promise<SendResult> {
  const resend = getResendClient()
  if (!resend) {
    console.log("[v0] RESEND_API_KEY missing — email not sent:", opts.text)
    return { ok: false, reason: "missing_key" }
  }

  const { error } = await resend.emails.send(
    {
      from: resolveFrom(),
      to: [SALON_INBOX],
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    },
    { idempotencyKey: `salon-form/${randomUUID()}` },
  )

  if (error) {
    console.log("[v0] Resend error:", error.name, error.message)
    return { ok: false, reason: "send_failed" }
  }

  return { ok: true }
}

export function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export function rowsToHtml(entries: { label: string; value: string }[]) {
  const rows = entries
    .map(
      (e) =>
        `<tr><td style="padding:8px 16px;font-weight:600;color:#3a352f;vertical-align:top;white-space:nowrap">${e.label}</td><td style="padding:8px 16px;color:#3a352f">${escapeHtml(
          e.value,
        )}</td></tr>`,
    )
    .join("")

  return rows
}

export function emailShell(heading: string, intro: string, rows: string) {
  return `
    <div style="font-family:Georgia,serif;background:#f6f2ec;padding:32px">
      <h2 style="color:#7a6a55;font-weight:normal;letter-spacing:1px">${heading}</h2>
      <p style="color:#6b6459">${intro}</p>
      <table style="border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;width:100%;max-width:560px">
        ${rows}
      </table>
    </div>`
}
