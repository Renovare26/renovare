import type { Metadata } from "next"
import { Navigation, Footer } from "@/components/site-shared"

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Booking, cancellation, and guest policies for Renovaré, a retreat style salon collective in Fairfax, Virginia.",
}

const policies = [
  {
    title: "Booking & Deposits",
    body: "A card on file or deposit reserves your appointment. It is applied to your service total on the day of your visit.",
  },
  {
    title: "Cancellations",
    body: "We kindly ask for at least 48 hours' notice to reschedule or cancel. Late cancellations may be subject to a fee of up to 50% of the reserved service.",
  },
  {
    title: "Late Arrivals",
    body: "Because appointments are given room to breathe, arrivals more than 15 minutes late may need to be adjusted or rescheduled to protect the next guest's time.",
  },
  {
    title: "Redo & Satisfaction",
    body: "Your happiness matters. If something isn't right, reach out within 7 days of your visit and we'll make it right.",
  },
  {
    title: "Children & Guests",
    body: "To preserve the calm of the studio, we ask that only those receiving services join us in the space when possible.",
  },
]

export default function PoliciesPage() {
  return (
    <main className="bg-background">
      <Navigation />

      <section className="pt-36 lg:pt-44 pb-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="editorial-eyebrow text-xs text-primary mb-6">Studio Policies</p>
          <h1 className="font-serif uppercase text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[0.95] tracking-tight text-balance">
            Care, clarity, and <span className="italic text-primary">consideration</span>
          </h1>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-36">
        <div className="max-w-3xl mx-auto divide-y divide-border">
          {policies.map((policy) => (
            <div key={policy.title} className="py-8">
              <h2 className="font-serif text-2xl text-foreground mb-3">{policy.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{policy.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
