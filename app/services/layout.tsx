import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Renovaré's Experiences — customized haircuts, blonding, balayage, brunette and red color, and restorative hair health treatments in Fairfax, VA. Transparent, artist-tiered pricing.",
  alternates: { canonical: "https://www.renovaresalon.com/services" },
  openGraph: {
    title: "Services | Renovaré Fairfax",
    description:
      "Customized hair experiences with transparent, artist-tiered pricing in Fairfax, Virginia.",
    url: "https://www.renovaresalon.com/services",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
