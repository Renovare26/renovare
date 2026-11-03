import { Navigation, Footer } from "@/components/site-shared"
import RenovareServicesPage, { HEADER_OFFSET } from "@/components/renovare-services-page"

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      {/* Spacer so the fixed site header never covers the page's hero */}
      <div aria-hidden="true" style={{ height: HEADER_OFFSET, background: "#F5F1EB" }} />
      <RenovareServicesPage />
      <Footer />
    </>
  )
}
