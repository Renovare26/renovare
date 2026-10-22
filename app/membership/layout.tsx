import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Membership",
  description:
    "The Renovaré Membership — an online library of DIY hair styling tutorials that teaches you to recreate your salon look at home, with optional hands on lessons at our Fairfax, VA studio.",
}

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children
}
