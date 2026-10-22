import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Renovaré collective in Fairfax, VA. We're building a small, deliberate team of color, blonding, and cutting specialists.",
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
