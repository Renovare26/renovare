import type { Metadata } from "next"
import Link from "next/link"
import { Navigation, Footer, PhotoFill } from "@/components/site-shared"
import { IMAGES } from "@/lib/site-images"

export const metadata: Metadata = {
  title: "Facials & Skin — Radoslava",
  description:
    "Facials and skin care with Radoslava, an independent aesthetics practice operating inside Renovaré in Fairfax, Virginia. Every treatment begins with a consultation.",
}

/**
 * FACIALS PAGE
 *
 * Radoslava's aesthetics practice is an INDEPENDENT business operating inside the
 * Renovaré space. Copy on this page must never imply she is a Renovaré employee, and
 * booking is handled separately from Renovaré's own reservations.
 *
 * PRICING: intentionally omitted. Per the owner, treatment investment is discussed at
 * consultation rather than published. Do not add a price grid here.
 */

type Focus = {
  title: string
  body: string
}

const FOCUS_AREAS: Focus[] = [
  {
    title: "Consultation first",
    body: "Every appointment opens with an unhurried skin consultation — history, current routine, sensitivities, and what you actually want to change. Nothing is chosen before your skin is read.",
  },
  {
    title: "Custom facial treatment",
    body: "Every facial is tailored to your skin that day. Each step is adjusted as she works — no fixed menu.",
  },
  {
    title: "Ongoing skin plans",
    body: "For goals that take more than one visit, Radoslava builds \u201congoing\u201d plans for your skin across appointments and home care, so your progress keeps building.",
  },
]

export default function FacialsPage() {
  return (
    <main className="bg-background">
      <Navigation />

      {/* Hero — full-bleed treatment photo with the practice name over it */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        <PhotoFill
          photo={{
            kind: "real",
            src: IMAGES.facialTreatment,
            alt: "A custom facial treatment in progress in the treatment room at Renovaré",
          }}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="max-w-4xl">
            <p className="editorial-eyebrow text-xs text-background/80 mb-5">Facials &amp; Skin</p>
            <h1 className="font-serif uppercase text-4xl sm:text-5xl lg:text-7xl text-background leading-[0.95] tracking-tight text-balance">
              Skin Care{" "}
              <span className="italic">
                Perso<span className="not-italic">n</span>ali<span className="not-italic">z</span>ed
              </span>
            </h1>
            <p className="mt-6 text-base lg:text-lg text-background/85 leading-relaxed max-w-xl text-pretty">
              An independent aesthetics practice by Radoslava, operating inside the Renovaré collective in
              Fairfax.
            </p>
            <a
              href="https://skinsolutionscenter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-8 py-4 border border-background/45 text-background text-xs tracking-[0.25em] uppercase hover:bg-background/10 transition-colors"
            >
              skinsolutionscenter.com
            </a>
          </div>
        </div>
      </section>

      {/* The practitioner */}
      <section className="px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="photo-live relative aspect-[3/4] overflow-hidden">
            <PhotoFill
              photo={{
                kind: "real",
                src: IMAGES.radoslavaPortrait,
                alt: "Radoslava, master aesthetician, in her treatment room inside Renovaré",
              }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="editorial-eyebrow text-xs text-primary mb-6">The Practitioner</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground leading-tight tracking-tight text-balance">
              Radoslava
            </h2>
            <p className="editorial-eyebrow text-[11px] text-muted-foreground mt-4">
              Master Aesthetician — Skin Solutions Center
            </p>

            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                Radoslava keeps her own treatment room inside the Renovaré collective — a separate practice
                sharing the same quiet, unhurried standard of care. Guests come to her for skin work that
                is assessed before it is delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the treatment works — consultation-led, no pricing */}
      <section className="bg-secondary px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="editorial-eyebrow text-xs text-primary mb-6">The Approach</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-secondary-foreground leading-tight tracking-tight text-balance">
              No fixed menu. A plan for your skin.
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-10 lg:gap-14">
            {FOCUS_AREAS.map((area) => (
              <article key={area.title} className="flex flex-col">
                <h3 className="font-serif text-xl lg:text-2xl text-secondary-foreground text-balance">
                  {area.title}
                </h3>
                <p className="mt-4 text-sm text-secondary-foreground/75 leading-relaxed text-pretty">
                  {area.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investment note — deliberately no prices */}
      <section className="px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="editorial-eyebrow text-xs text-primary mb-6">Investment</p>
          <h2 className="font-serif text-2xl lg:text-4xl text-foreground leading-tight tracking-tight text-balance">
            Pricing is shared at consultation
          </h2>
          <p className="mt-7 text-muted-foreground leading-relaxed text-pretty">
            Estimated starting prices can be found on her website. However, a more accurate reflection of
            your investment will be determined at the time of consultation.
          </p>
        </div>
      </section>

      {/* Booking — separate from Renovaré reservations */}
      <section className="bg-foreground px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="editorial-eyebrow text-xs text-background/60 mb-6">Reserve With Radoslava</p>
          <h2 className="font-serif uppercase text-3xl lg:text-5xl text-background leading-[1.02] tracking-tight text-balance">
            Book your skin consultation
          </h2>
          <p className="mt-7 text-background/70 leading-relaxed text-pretty">
            Book your facial through Renovaré or directly at the Skin Solutions Center — whichever is
            easier for you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservations#request"
              className="w-full sm:w-auto px-8 py-4 bg-background text-foreground text-xs tracking-[0.25em] uppercase hover:bg-background/90 transition-colors"
            >
              Book Through Renovaré
            </Link>
            <a
              href="https://skinsolutionscenter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-background/45 text-background text-xs tracking-[0.25em] uppercase hover:bg-background/10 transition-colors"
            >
              skinsolutionscenter.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
