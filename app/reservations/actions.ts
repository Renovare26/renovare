"use server"

import { INTAKE_FIELDS, PRIVATE_ROOM } from "@/lib/intake-config"
import { emailShell, rowsToHtml, sendSalonNotification } from "@/lib/send-email"

export type IntakeState = {
  status: "idle" | "success" | "error"
  message: string
}

export async function submitIntake(_prev: IntakeState, formData: FormData): Promise<IntakeState> {
  // Collect every configured field dynamically so this works regardless of how
  // the owner edits INTAKE_FIELDS.
  const entries: { label: string; value: string }[] = []

  for (const field of INTAKE_FIELDS) {
    const raw = formData.get(field.name)
    const value = typeof raw === "string" ? raw.trim() : ""
    if (field.required && !value) {
      return { status: "error", message: `Please complete the "${field.label}" field.` }
    }
    entries.push({ label: field.label, value: value || "—" })
  }

  // Private room add-on (checkbox).
  const privateRoom = formData.get(PRIVATE_ROOM.name) === "on"
  entries.push({ label: "Private Room Requested", value: privateRoom ? "Yes" : "No" })

  // Basic email sanity check.
  const email = String(formData.get("email") || "")
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const html = emailShell(
    "New Reservation Request",
    "A new guest submitted the Reserve form on renovaresalon.com.",
    rowsToHtml(entries),
  )
  const text = entries.map((e) => `${e.label}: ${e.value}`).join("\n")

  const result = await sendSalonNotification({
    subject: "New Reservation Request — Renovaré",
    html,
    text,
    replyTo: email || undefined,
  })

  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "missing_key"
          ? "We couldn't send your request just yet. Please call us at 571.455.9838 and we'll take care of you."
          : "Something went wrong sending your request. Please try again or call 571.455.9838.",
    }
  }

  return {
    status: "success",
    message: "Thank you — your request is in. We'll be in touch within 24–48 hours to confirm your retreat.",
  }
}
