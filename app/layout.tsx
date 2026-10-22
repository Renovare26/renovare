import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"

// Unified typeface — the whole site uses Playfair Display, matching the hero wordmark.
const playfairSans = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.renovaresalon.com"),
  title: {
    default: "Renovaré | Hair Salon in Fairfax, VA",
    template: "%s | Renovaré Fairfax",
  },
  description:
    "Renovaré is a retreat style salon collective in Fairfax, Virginia. Expert color, dimensional blonding, precision cutting, and restorative treatments in a calm, unhurried space.",
  keywords: [
    "hair salon Fairfax VA",
    "balayage Fairfax",
    "blonding specialist Northern Virginia",
    "hair color Fairfax",
    "precision haircut Fairfax",
    "Renovaré salon",
  ],
  openGraph: {
    title: "Renovaré | Hair Salon in Fairfax, VA",
    description:
      "A retreat style salon collective in Fairfax, Virginia. Expert color, blonding, and restorative treatments in a calm, unhurried space.",
    url: "https://www.renovaresalon.com",
    siteName: "Renovaré",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.renovaresalon.com",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairSans.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
