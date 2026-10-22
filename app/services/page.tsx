"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navigation, Footer, PhotoFill, type Photo } from "@/components/site-shared"
import { IMAGES } from "@/lib/site-images"

type Tier = "Initiate" | "Signature" | "Artisan" | "Founder"
const TIER_ORDER: Tier[] = ["Initiate", "Signature", "Artisan", "Founder"]

type TierPrices = Partial<Record<Tier, string>>

type Service = {
  name: string
  includes?: string
  description?: string
  prices?: TierPrices
  note?: string
  single?: string
}

type Collection = {
  heading: string
  intro?: string
  services: Service[]
}

// Four finalized artist pricing tiers. Note: the "Luminary" tier is intentionally not
// used anywhere on the site — it is bookmarked for a future season.
const ARTISTS: { name: Tier; blurb: string }[] = [
  {
    name: "Initiate",
    blurb:
      "Licensed artists refining their craft through advanced mentorship while delivering beautiful foundational results.",
  },
  {
    name: "Signature",
    blurb: "Experienced artists known for polished, consistent work and thoughtful guest care.",
  },
  {
    name: "Artisan",
    blurb:
      "Advanced artists specializing in customized color, precision cutting, and elevated transformations.",
  },
  {
    name: "Founder",
    blurb:
      "Stephanie personally provides appointments for guests seeking highly customized transformations, advanced color work, and her signature approach to consultation and artistry. Availability is limited.",
  },
]

const HAIRCUT_COLLECTION: Collection = {
  heading: "Signature Haircut Collection",
  services: [
    {
      name: "Women's Signature Haircut & Finish",
      includes:
        "Personalized consultation, luxury shampoo experience, customized haircut, standard professional blow dry & finish.",
      prices: { Initiate: "From $85", Signature: "From $100", Artisan: "From $145", Founder: "From $220" },
    },
    {
      name: "Signature Blowout",
      includes: "Luxury shampoo experience, standard professional blow dry & finish.",
      prices: { Initiate: "From $55", Signature: "From $80", Artisan: "From $90", Founder: "From $100" },
    },
    {
      name: "Editorial Blowout",
      includes: "Elevated styling using hot tools when desired.",
      prices: { Initiate: "From $75", Signature: "From $110", Artisan: "From $130", Founder: "From $180" },
    },
    {
      name: "Gentlemen's Precision Cut",
      prices: { Initiate: "From $55", Signature: "From $80", Artisan: "From $100", Founder: "From $140" },
    },
    {
      name: "Bang Refresh",
      prices: { Initiate: "From $25", Signature: "From $30", Artisan: "From $35", Founder: "From $50" },
    },
  ],
}

const COLOR_INCLUSIONS =
  "All coloring and highlighting experiences include: personalized consultation; toning/gloss as needed; Signature Blowout & finish; (bond building treatment included only with highlighting/dimensional services where lightener is used — not included with color services). A haircut may be selected in place of the included Signature Blowout & Finish for an additional investment based on artist level — Add a Signature Haircut: Initiate +$30 · Signature +$20 · Artisan +$55 · Founder +$120."

const BLONDING_COLLECTION: Collection = {
  heading: "Blonding Collection",
  services: [
    {
      name: "Face Framing Brightening",
      prices: { Initiate: "From $150", Signature: "From $185", Artisan: "From $215", Founder: "From $255" },
    },
    {
      name: "Signature Partial Blonding Experience",
      prices: { Initiate: "From $250", Signature: "From $295", Artisan: "From $345", Founder: "From $395" },
    },
    {
      name: "Signature Full Blonding Experience",
      prices: { Initiate: "From $345", Signature: "From $385", Artisan: "From $445", Founder: "From $525" },
    },
    {
      name: "Signature Balayage Experience",
      prices: { Initiate: "From $365", Signature: "From $405", Artisan: "From $475", Founder: "From $575" },
    },
    {
      name: "Signature Partial Balayage Experience",
      prices: { Initiate: "From $285", Signature: "From $325", Artisan: "From $385", Founder: "From $475" },
    },
    { name: "Platinum Transformation", note: "Consultation required. Starting at $500+" },
    { name: "Blonding Correction", note: "Consultation required. Custom quote." },
  ],
}

const BRUNETTE_COLLECTION: Collection = {
  heading: "Brunette Collection",
  services: [
    {
      name: "Signature Brunette Refresh",
      description:
        "Designed to maintain, deepen, or beautifully refresh brunette hair while preserving shine, richness, and dimension.",
      prices: { Initiate: "From $155", Signature: "From $205", Artisan: "From $260", Founder: "From $325" },
    },
    {
      name: "Dimensional Brunette Experience",
      description:
        "Soft ribbons of light and depth for natural movement and dimension without transitioning to a blonde appearance.",
      prices: { Initiate: "From $265", Signature: "From $325", Artisan: "From $385", Founder: "From $465" },
    },
    {
      name: "Brunette Transformation",
      note:
        "For a significant brunette color change, correction, or customized dimensional transformation. Consultation required. Custom quote.",
    },
  ],
}

const RED_COLLECTION: Collection = {
  heading: "Red Hair Collection",
  services: [
    {
      name: "Signature Red Enhancement Experience",
      description:
        "For added dimension, softness, or tonal refinement while maintaining a naturally rich red appearance.",
      prices: { Initiate: "From $265", Signature: "From $325", Artisan: "From $385", Founder: "From $465" },
    },
    {
      name: "Red Hair Preservation Gloss",
      description:
        "Refreshes faded tones, restores shine, and enhances natural or previously colored red hair between appointments.",
      prices: { Initiate: "From $85", Signature: "From $115", Artisan: "From $170", Founder: "From $200" },
    },
  ],
}

const COLOR_COLLECTION: Collection = {
  heading: "Color Collection",
  services: [
    {
      name: "Root Touch Up",
      prices: { Initiate: "From $125", Signature: "From $165", Artisan: "From $195", Founder: "From $260" },
    },
    {
      name: "Signature All Over Color",
      prices: { Initiate: "From $155", Signature: "From $205", Artisan: "From $260", Founder: "From $325" },
    },
    {
      name: "Gloss & Shine Refresh",
      prices: { Initiate: "From $85", Signature: "From $115", Artisan: "From $170", Founder: "From $200" },
    },
    {
      name: "Dimensional Color Experience",
      prices: { Initiate: "From $265", Signature: "From $325", Artisan: "From $385", Founder: "From $465" },
    },
    { name: "Color Correction", note: "Consultation required. Custom quote." },
  ],
}

const COLOR_COLLECTIONS: Collection[] = [
  BLONDING_COLLECTION,
  BRUNETTE_COLLECTION,
  RED_COLLECTION,
  COLOR_COLLECTION,
]

// Real Renovaré client work, one per color family, in the same order as COLOR_COLLECTIONS.
const COLLECTION_PHOTOS: Photo[] = [
  {
    kind: "real",
    src: IMAGES.workPlatinumContrast,
    alt: "High-contrast platinum money piece against deep base color by Renovaré",
  },
  {
    kind: "real",
    src: IMAGES.workCaramelBalayage,
    alt: "Caramel balayage on brunette hair by Renovaré",
  },
  {
    kind: "real",
    src: IMAGES.workCopperWaves,
    alt: "Copper and strawberry blonde waves by Renovaré",
  },
  {
    kind: "real",
    src: IMAGES.workGlossyMelt,
    alt: "Glossy brunette-to-caramel color melt on long waves by Renovaré",
  },
]

const HAIR_HEALTH: Service[] = [
  { name: "Signature Hair Renewal Treatment", single: "From $60" },
  { name: "Detox Treatment", single: "From $85" },
  { name: "Moisture Recovery Treatment", single: "From $60" },
  { name: "Bond Repair Therapy", single: "From $75" },
  { name: "Scalp Renewal Experience", single: "From $110" },
  { name: "Professional Smoothing Treatment", single: "Starting at $300" },
  { name: "Express Smoothing Treatment", single: "Starting at $150" },
]

function PriceRows({ prices }: { prices: TierPrices }) {
  return (
    <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-lg border border-border bg-border">
      {TIER_ORDER.map((tier) => (
        <div key={tier} className="bg-card px-3 py-3">
          <dt className="editorial-eyebrow text-[10px] text-muted-foreground">{tier}</dt>
          <dd className="font-serif text-base text-foreground mt-1">{prices[tier]}</dd>
        </div>
      ))}
    </dl>
  )
}

function ServiceBlock({ service }: { service: Service }) {
  return (
    <div className="border-t border-border pt-6">
      <h4 className="font-serif text-xl lg:text-2xl text-foreground text-balance">{service.name}</h4>
      {service.includes && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          <span className="text-foreground/80">Includes: </span>
          {service.includes}
        </p>
      )}
      {service.description && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{service.description}</p>
      )}
      {service.prices && <PriceRows prices={service.prices} />}
      {service.note && (
        <p className="mt-4 inline-block text-sm text-primary border border-primary/30 rounded-full px-4 py-1.5">
          {service.note}
        </p>
      )}
    </div>
  )
}

function CollectionSection({
  collection,
  photo,
}: {
  collection: Collection
  photo?: Photo
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-24"
    >
      <div className="flex items-end justify-between gap-6 mb-2">
        <h3 className="editorial-eyebrow text-xs text-primary">{collection.heading}</h3>
      </div>

      {photo && (
        <div className="photo-live relative aspect-[16/9] overflow-hidden mb-8">
          <PhotoFill photo={photo} sizes="(max-width: 1024px) 100vw, 720px" />
        </div>
      )}

      <div className="space-y-8">
        {collection.services.map((service) => (
          <ServiceBlock key={service.name} service={service} />
        ))}
      </div>
    </motion.div>
  )
}

function ExperiencesHero() {
  return (
    <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-28 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="editorial-eyebrow text-xs text-primary mb-6"
        >
          Experiences
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight text-balance"
        >
          Beautiful hair begins with thoughtful artistry.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg leading-relaxed mt-8 text-pretty"
        >
          Every appointment at Renovaré is thoughtfully customized around your hair, your goals, and your
          lifestyle. Whether you&apos;re maintaining your signature look or planning a complete
          transformation, our artists will recommend the experience best suited to achieving your desired
          result.
        </motion.p>
      </div>
    </section>
  )
}

function ChooseYourArtist() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <p className="editorial-eyebrow text-xs text-primary mb-4">Choose Your Artist</p>
          <p className="text-muted-foreground leading-relaxed">
            Every Renovaré Artist completes advanced education through our in house training pathway. Pricing
            reflects each artist&apos;s experience, demand, and availability.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {ARTISTS.map((artist, i) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-t border-border pt-6"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-xs tracking-[0.2em] text-primary">0{i + 1}</span>
                <h3 className="font-serif text-2xl lg:text-3xl text-foreground">{artist.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{artist.blurb}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PleaseNote() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12">
      <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
        <p className="editorial-eyebrow text-[10px] text-primary mb-3">Please Note</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The prices below reflect Artist Labor. A separate Professional Materials Investment applies to
          color and chemical services. Whenever possible, we&apos;ll provide an estimated total investment
          before your service begins.
        </p>
      </div>
    </div>
  )
}

export default function ExperiencesPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <ExperiencesHero />
      <ChooseYourArtist />

      <section className="pt-20 lg:pt-28">
        <PleaseNote />
      </section>

      {/* Haircut collection */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <CollectionSection
            collection={HAIRCUT_COLLECTION}
            photo={{
              kind: "real",
              src: IMAGES.workPrecisionCut,
              alt: "Long layered precision cut and finish on a Renovaré guest",
            }}
          />
        </div>
      </section>

      {/* Coloring & highlighting shared inclusions */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="editorial-eyebrow text-xs text-primary mb-4">Coloring &amp; Highlighting</p>
            <div className="bg-secondary rounded-2xl p-6 lg:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">{COLOR_INCLUSIONS}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color-family collections */}
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-20 lg:space-y-28">
          {COLOR_COLLECTIONS.map((collection, i) => (
            <CollectionSection
              key={collection.heading}
              collection={collection}
              photo={COLLECTION_PHOTOS[i]}
            />
          ))}
        </div>
      </section>

      {/* Hair Health collection */}
      <section className="py-12 lg:py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="editorial-eyebrow text-xs text-primary mb-8">Hair Health Collection</p>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
              {HAIR_HEALTH.map((service) => (
                <div
                  key={service.name}
                  className="flex items-baseline justify-between gap-4 border-t border-border pt-5"
                >
                  <span className="font-serif text-lg text-foreground text-balance">{service.name}</span>
                  <span className="text-sm text-primary whitespace-nowrap">{service.single}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Materials Investment */}
      <section className="py-12 lg:py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="editorial-eyebrow text-xs text-primary mb-4">Professional Materials Investment</p>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                A separate Professional Materials Investment applies to customized color and chemical
                services. This investment reflects the professional color, lighteners, developers, toners,
                treatments, disposables, and other professional materials used throughout your appointment.
                It also supports the thoughtfully curated guest amenities that are part of every Renovaré
                experience.
              </p>
              <p>Because every guest&apos;s hair is unique, this investment varies according to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>hair length</li>
                <li>hair density</li>
                <li>previous color history</li>
                <li>product usage</li>
                <li>service complexity</li>
              </ul>
              <p>Whenever possible, we&apos;ll provide an estimated total investment before beginning your service.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before Your Appointment + Private Room Upgrade */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="editorial-eyebrow text-xs text-primary mb-6">Before Your Appointment</p>
            <ul className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <li className="border-t border-border pt-4">
                Every appointment begins with a personalized consultation.
              </li>
              <li className="border-t border-border pt-4">
                Corrective color, platinum transformations, and extensions (coming soon) require a
                consultation before booking.
              </li>
              <li className="border-t border-border pt-4">Prices shown reflect Artist Labor only.</li>
              <li className="border-t border-border pt-4">
                A separate Professional Materials Investment applies to customized color and chemical
                services.
              </li>
              <li className="border-t border-border pt-4">
                Final investment varies according to the time, techniques, and professional materials
                required to achieve your desired result.
              </li>
            </ul>
            <Link
              href="/policies"
              className="mt-8 inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              View Guest Policies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:pt-11"
          >
            <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <p className="editorial-eyebrow text-[10px] text-primary">Private Room Upgrade</p>
                <span className="text-[10px] tracking-[0.2em] uppercase bg-secondary text-muted-foreground rounded-full px-3 py-1">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guests may optionally upgrade to a private room for their service, for a little added quiet
                and privacy during your experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <Link
            href="/reservations"
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors group"
          >
            Reserve Your Experience
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
