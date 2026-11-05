import type { Metadata } from "next"
import { Navigation, Footer } from "@/components/site-shared"
import MembershipPage, { HEADER_OFFSET } from "@/components/renovare-membership-page"

const TITLE = "Hair Styling Classes in Fairfax, VA | Renovaré Salon"
const DESCRIPTION =
  "Learn to style your own hair like a pro. Hands-on blowout, curl, braid, and updo classes in Fairfax, VA. Single classes $195 or Founding Membership $65/mo."
const URL = "https://www.renovaresalon.com/membership"
const SHARE_IMAGE = {
  url: "/images/salon/relaxation-table.jpeg",
  alt: "The calm, retreat-style interior of Renovaré Salon in Fairfax, Virginia",
}

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Renovaré",
    locale: "en_US",
    type: "website",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
}

export default function Page() {
  return (
    <>
      <Navigation />
      {/* Spacer so the fixed site header never covers the page's hero */}
      <div aria-hidden="true" style={{ height: HEADER_OFFSET, background: "#F5F1EB" }} />
      <MembershipPage />
      <Footer />
    </>
  )
}
