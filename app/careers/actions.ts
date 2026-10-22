"use server"

import { emailShell, rowsToHtml, sendSalonNotification } from "@/lib/send-email"

export type CareersState = {
  status: "idle" | "success" | "error"
  message: string
}

export async function submitCareersInterest(
  _prev: CareersState,
  formData: FormData,
): Promise<CareersState> {
  const get = (name: string) => String(formData.get(name) || "").trim()
  const name = get("name")
  const email = get("email")
  const role = get("role")
  const portfolio = get("portfolio")
  const about = get("about")

  if (!name || !email || !role || !about) {
    return { status: "error", message: "Please complete your name, email, position, and introduction." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const entries = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Position of Interest", value: role },
    { label: "Portfolio or Instagram", value: portfolio || "—" },
    { label: "About", value: about },
  ]
  const result = await sendSalonNotification({
    subject: "New Careers Interest — Renovaré",
    html: emailShell("New Careers Interest", "An artist submitted interest in joining the Renovaré collective.", rowsToHtml(entries)),
    text: entries.map((entry) => `${entry.label}: ${entry.value}`).join("\n"),
    replyTo: email,
  })

  if (!result.ok) {
    return {
      status: "error",
      message: "We couldn't send your interest just yet. Please try again or email us directly.",
    }
  }

  return {
    status: "success",
    message: "Thank you — your interest is in. We'll be in touch if there is a potential fit.",
  }
}
