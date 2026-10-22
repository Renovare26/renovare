"use server"

import { emailShell, rowsToHtml, sendSalonNotification } from "@/lib/send-email"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
}

const SERVICE_LABELS: Record<string, string> = {
  balayage: "Balayage & Dimensional Color",
  blonding: "Blonding & Lightening",
  global: "Global Color",
  cut: "Precision Cut & Style",
  keratin: "Keratin Treatment",
  extensions: "Extensions",
  consultation: "Consultation Only",
}

const TIER_LABELS: Record<string, string> = {
  initiate: "Initiate Artist",
  signature: "Signature Artist",
  artisan: "Renovaré Artisan",
  founder: "Renovaré Founder (Stephanie)",
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (name: string) => String(formData.get(name) || "").trim()

  const firstName = get("firstName")
  const lastName = get("lastName")
  const email = get("email")
  const phone = get("phone")
  const service = get("service")
  const artistTier = get("artistTier")
  const message = get("message")

  if (!firstName || !lastName || !email || !phone) {
    return { status: "error", message: "Please complete your name, email, and phone so we can reach you." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const entries: { label: string; value: string }[] = [
    { label: "Name", value: `${firstName} ${lastName}` },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Service Interest", value: SERVICE_LABELS[service] || "—" },
    { label: "Preferred Artist Tier", value: TIER_LABELS[artistTier] || "No preference" },
    { label: "Hair Goals", value: message || "—" },
  ]

  const html = emailShell(
    "New Appointment Request",
    "A new guest submitted the contact form on renovaresalon.com.",
    rowsToHtml(entries),
  )
  const text = entries.map((e) => `${e.label}: ${e.value}`).join("\n")

  const result = await sendSalonNotification({
    subject: "New Appointment Request — Renovaré",
    html,
    text,
    replyTo: email,
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
    message: "Thank you — your request is in. We'll be in touch within 24–48 hours to confirm.",
  }
}
