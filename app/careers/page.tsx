"use client"

import { useActionState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Navigation, Footer } from "@/components/site-shared"
import { submitCareersInterest, type CareersState } from "./actions"

// Established tiers within the collective.
// NOTE: These are growth paths, not a list of current openings — the team grows slowly
// and intentionally. The "Luminary" tier is intentionally NOT listed; it is bookmarked
// for a future season and should not appear anywhere on the site.
const TIERS = [
  {
    name: "Salon Assistant",
    desc: "Support the floor and learn the craft from the inside out — the strongest foundation there is.",
  },
  {
    name: "Initiate Artist",
    desc: "Building a book with mentorship close at hand, taking guests of your own.",
  },
  {
    name: "Signature Artist",
    desc: "An established artist with a confident point of view and a growing, loyal clientele.",
  },
  {
    name: "Renovaré Artisan",
    desc: "A seasoned specialist trusted with our most complex color and transformative work.",
  },
]

const OFFERINGS = [
  "Competitive commission & retail incentives",
  "In house & external education",
  "Flexible, balanced scheduling",
  "A beautiful, well equipped studio",
]

function CareersHero() {
  return (
    <section className="pt-36 lg:pt-44 pb-16 lg:pb-20 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="editorial-eyebrow text-xs text-primary mb-6"
        >
          Careers
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif uppercase text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[0.98] tracking-tight text-balance"
        >
          A place to grow into the artist you are becoming —{" "}
          <span className="italic text-primary">and a home for the artist you already are</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-muted-foreground text-lg mt-8 leading-relaxed text-pretty"
        >
          Renovaré is built for both: the established artist arriving with a full book and a refined
          point of view, and the emerging talent ready to be shaped. We grow slowly and intentionally,
          so rather than post openings we keep an ongoing, selective conversation with artists whose
          craft and care align with ours.
        </motion.p>
      </div>
    </section>
  )
}

function JoinTheCollective() {
  return (
    <section className="px-6 lg:px-12 pb-24 lg:pb-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="editorial-eyebrow text-xs text-primary mb-4">Join the Collective</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-balance">
            Elevated artistry. Genuine hospitality.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
            These are the paths within our collective. Availability varies by season — introduce
            yourself and tell us where you are in your craft.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mb-16">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-t border-border pt-5"
            >
              <h3 className="font-serif text-xl text-foreground mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-2xl p-8 lg:p-10"
        >
          <p className="editorial-eyebrow text-[10px] text-primary mb-6">What We Offer</p>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {OFFERINGS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                <span aria-hidden className="text-primary mt-1.5 text-xs">
                  &#9670;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

function InterestForm() {
  const [state, formAction, isPending] = useActionState<CareersState, FormData>(submitCareersInterest, {
    status: "idle",
    message: "",
  })

  return (
    <section className="pb-28 lg:pb-40 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <form className="space-y-6" action={formAction}>
          <div>
            <label htmlFor="name" className="block text-sm text-foreground mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm text-foreground mb-2">
              Position of interest
            </label>
            <select
              id="role"
              name="role"
              required
              defaultValue=""
              className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="" disabled>
                Select a position
              </option>
              <option value="salon-assistant">Salon Assistant</option>
              <option value="initiate-artist">Initiate Artist</option>
              <option value="signature-artist">Signature Artist</option>
              <option value="renovare-artisan">Renovaré Artisan</option>
            </select>
          </div>

          <div>
            <label htmlFor="portfolio" className="block text-sm text-foreground mb-2">
              Portfolio or Instagram
            </label>
            <input
              type="text"
              id="portfolio"
              name="portfolio"
              className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="@yourwork"
            />
          </div>

          <div>
            <label htmlFor="about" className="block text-sm text-foreground mb-2">
              A little about you
            </label>
            <textarea
              id="about"
              name="about"
              required
              rows={5}
              className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
              placeholder="Where you are in your craft, what you specialize in, and what draws you to Renovaré."
            />
          </div>

          {state.message && (
            <p
              aria-live="polite"
              className={`rounded-lg border px-4 py-3 text-sm ${
                state.status === "error"
                  ? "border-destructive/30 bg-destructive/5 text-destructive"
                  : "border-primary/30 bg-primary/5 text-primary"
              }`}
              role="status"
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-primary text-primary-foreground rounded-lg text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-3 group disabled:opacity-60"
          >
            {isPending ? "Sending…" : "Submit Interest"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-muted-foreground/70 text-center leading-relaxed pt-2">
            Submitting your interest begins a selective vetting process. We&apos;ll be in touch only if there
            is a potential fit.
          </p>
        </form>
      </motion.div>
    </section>
  )
}

export default function CareersPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <CareersHero />
      <JoinTheCollective />
      <InterestForm />
      <Footer />
    </main>
  )
}
