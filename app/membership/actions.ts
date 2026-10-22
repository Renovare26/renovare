"use server"

import { sendSalonNotification, emailShell, rowsToHtml } from "@/lib/send-email"

export type WaitlistState = {
  status: "idle" | "success" | "error"
  message: string
}

/**
 * Captures Styling Edit waitlist signups and emails them to the salon inbox.
 * The destination address is managed in lib/intake-config.ts (SALON_INBOX).
 */
export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const interest = String(formData.get("interest") || "").trim()

  if (!email) {
    return { status: "error", message: "Please enter your email so we can notify you." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const entries = [
    { label: "Name", value: name || "—" },
    { label: "Email", value: email },
    { label: "Interested In", value: interest || "—" },
  ]

  const html = emailShell(
    "New Styling Edit Waitlist Signup",
    "Someone asked to be notified when The Styling Edit launches.",
    rowsToHtml(entries),
  )
  const text = entries.map((e) => `${e.label}: ${e.value}`).join("\n")
  const result = await sendSalonNotification({
    subject: "New Styling Edit Waitlist Signup — Renovaré",
    html,
    text,
    replyTo: email,
  })

  if (!result.ok) {
    return {
      status: "error",
      message: result.reason === "missing_key"
        ? "We couldn't add you just yet. Please call us at 571.455.9838 and we'll add you manually."
        : "Something went wrong. Please try again or call 571.455.9838.",
    }
  }

  return {
    status: "success",
    message: "You're on the list. We'll email you the moment The Styling Edit opens.",
  }
}

