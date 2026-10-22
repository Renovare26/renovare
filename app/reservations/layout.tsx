import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reserve",
  description:
    "Request your appointment at Renovaré, a retreat style salon collective in Fairfax, VA. Color, blonding, cutting, and restorative treatments by appointment.",
}

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
