// ============================================================================
// RESERVE / NEW-GUEST INTAKE CONFIG
// ----------------------------------------------------------------------------
// This file is the single place to manage the Reserve page's intake form.
//
//  • CHANGE THE DESTINATION EMAIL:  edit SALON_INBOX below.
//  • ADD / REMOVE / REORDER QUESTIONS:  edit the INTAKE_FIELDS array. The form
//    renders fields in array order, so reordering the array reorders the form.
//  • A longer, "expanded" question set is included but commented out at the
//    bottom — the owner can move items up into INTAKE_FIELDS to enable them.
// ============================================================================

// TODO(owner): CONFIRM the exact salon inbox address before launch.
export const SALON_INBOX = "info@renovaresalon.com"

// Where the notification email appears to come from. Resend requires this to be
// on a verified domain; onboarding@resend.dev works for initial testing.
export const INTAKE_FROM = "Renovaré Reservations <onboarding@resend.dev>"

export type IntakeFieldType = "text" | "email" | "tel" | "select" | "textarea" | "checkbox"

export type IntakeField = {
  /** Unique key — also used as the form field name and email label key. */
  name: string
  label: string
  type: IntakeFieldType
  required?: boolean
  placeholder?: string
  /** Options for `select` fields. */
  options?: string[]
  /** Small helper text shown under the field. */
  help?: string
  /** Layout width within the two-column grid. Defaults to "full". */
  width?: "full" | "half"
}

// ----------------------------------------------------------------------------
// DEFAULT (SHORTENED) INTAKE — intentionally low-friction so new guests can
// book easily right now. Add more questions by uncommenting items below.
// ----------------------------------------------------------------------------
export const INTAKE_FIELDS: IntakeField[] = [
  { name: "firstName", label: "First Name", type: "text", required: true, placeholder: "Jane", width: "half" },
  { name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Smith", width: "half" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@example.com", width: "half" },
  { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(555) 555-5555", width: "half" },
  {
    name: "service",
    label: "What are you interested in?",
    type: "select",
    required: true,
    options: [
      "Color — Balayage & Dimensional",
      "Color — Blonding & Lightening",
      "Color — Global / Single Process",
      "Haircut & Style",
      "Keratin & Smoothing",
      "Extensions",
      "Skin Care & Facials",
      "Not sure yet — I'd like guidance",
    ],
  },
  {
    name: "artistTier",
    label: "Preferred Artist Tier",
    type: "select",
    required: false,
    placeholder: "No preference — match me with the right Artist",
    options: ["Initiate Artist", "Signature Artist", "Renovaré Artisan", "Renovaré Founder (Stephanie)"],
    help: "Not sure which tier is right? Leave this on “No preference” and we'll guide you.",
  },
  {
    name: "goals",
    label: "Tell us a little about your hair goals",
    type: "textarea",
    required: false,
    placeholder:
      "Share the look you're hoping for, your hair history (past color, treatments), and anything that helps us prepare an estimate.",
  },
]

// ----------------------------------------------------------------------------
// EXPANDED QUESTION LIBRARY (disabled by default).
// To enable any of these, copy the object into INTAKE_FIELDS above in the
// position you'd like it to appear. Owner will supply the finalized full list.
// ----------------------------------------------------------------------------
// export const INTAKE_FIELDS_EXPANDED: IntakeField[] = [
//   { name: "pronouns", label: "Pronouns", type: "text", width: "half" },
//   { name: "referral", label: "How did you hear about us?", type: "text", width: "half" },
//   { name: "hairHistory", label: "Have you had color, keratin, or lightening in the last 12 months?", type: "textarea" },
//   { name: "boxDye", label: "Any box dye or henna currently on your hair?", type: "select", options: ["No", "Yes", "Not sure"], width: "half" },
//   { name: "budget", label: "Comfortable investment range", type: "select", options: ["$100–$200", "$200–$350", "$350–$500", "$500+"], width: "half" },
//   { name: "occasion", label: "Any event or timeline we should know about?", type: "text" },
//   { name: "inspiration", label: "Inspiration photos (link)", type: "text" },
//   { name: "preferredDays", label: "Preferred days / times", type: "text" },
// ]

// Optional add-on that guests can request with any service.
export const PRIVATE_ROOM = {
  name: "privateRoom",
  label: "Request a private room for my service",
  // Set to false to hide the "Coming Soon" tag once the private room is live.
  comingSoon: true,
  note: "A quiet, enclosed space for a more secluded visit.",
} as const
