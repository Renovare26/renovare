"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Navigation, Footer } from "@/components/site-shared"
import { IMAGES } from "@/lib/site-images"

// A comparison page: three distinct hero treatments for the homepage.
// Pick one and we'll wire it into app/page.tsx as the live Hero.

function VariantLabel({ n, title, note }: { n: string; title: string; note: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-6">
      <div className="flex items-baseline gap-4 border-b border-border pb-4">
        <span className="font-serif text-3xl text-primary/40">{n}</span>
        <div>
          <h2 className="font-serif text-2xl text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{note}</p>
        </div>
      </div>
    </div>
  )
}

// Variant 1 — Split Editorial (text left, full uncropped portrait right)
function HeroSplit() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">
        <div className="order-2 lg:order-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16">
          <p className="editorial-eyebrow text-xs text-primary mb-6">
            A Retreat Style Salon Collective — Fairfax, VA
          </p>
          <h1 className="font-serif uppercase text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95] tracking-tight">
            The Art of
            <br />
            <span className="editorial-accent text-primary">Renewal</span>
            <br />
            and Restoration
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-md mt-8 leading-relaxed">
            Where expert hands meet a calm, unhurried space. Private. Intentional. Unrushed.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors group"
            >
              Reserve Your Experience
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="text-xs tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative flex items-center justify-center px-6 pt-28 pb-6 lg:p-12">
          <div className="relative w-full max-w-md lg:max-w-none aspect-[3/4] lg:h-[72vh] lg:aspect-auto">
            <Image
              src={IMAGES.founderPortrait || "/placeholder.svg"}
              alt="A Renovaré guest in the studio"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain fade-edges"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Variant 2 — Full-Bleed Cinematic (background photo, overlay, centered copy)
function HeroFullBleed() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-foreground">
      <Image
        src={IMAGES.relaxationTableWide || "/placeholder.svg"}
        alt="Inside the Renovaré studio"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      {/* readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/50" />
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="editorial-eyebrow text-xs text-background/80 mb-6">
          A Retreat Style Salon Collective — Fairfax, VA
        </p>
        <h1 className="font-serif uppercase text-5xl sm:text-6xl lg:text-8xl text-background leading-[0.95] tracking-tight text-balance">
          The Art of <span className="editorial-accent">Renewal</span>
        </h1>
        <p className="text-background/85 text-lg lg:text-xl max-w-xl mx-auto mt-8 leading-relaxed text-pretty">
          Where expert hands meet a calm, unhurried space. Private. Intentional. Unrushed.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Link
            href="/reservations"
            className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground text-xs tracking-[0.25em] uppercase hover:bg-background/90 transition-colors group"
          >
            Reserve Your Experience
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="text-xs tracking-[0.25em] uppercase text-background border-b border-background/40 pb-1 hover:border-background transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  )
}

// Variant 3 — Centered Type + Image Band (typographic statement over a wide photo strip)
function HeroCentered() {
  const strip = [IMAGES.workBalayageDetail, IMAGES.workBrunetteResult, IMAGES.workBlowoutProfile, IMAGES.workCurls]
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-6 pt-24 pb-12">
        <p className="editorial-eyebrow text-xs text-primary mb-6">
          A Retreat Style Salon Collective — Fairfax, VA
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.02] tracking-tight text-balance">
          The art of <span className="italic text-primary">renewal</span>.
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-8 leading-relaxed">
          Expert hair artistry in a calm, unhurried space. Private. Intentional. Unrushed.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Link
            href="/reservations"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors group"
          >
            Reserve Your Experience
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="text-xs tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 pb-3">
        {strip.map((src, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src={src || "/placeholder.svg"}
              alt="Renovaré work"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HeroOptionsPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <div className="pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="editorial-eyebrow text-xs text-primary mb-4">Internal — Design Review</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground text-balance">
            Homepage Hero — Three Directions
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Compare the options below and tell me which one to make live. I&apos;ll wire your pick into the
            homepage and we can fine tune copy and imagery from there.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <VariantLabel n="01" title="Split Editorial" note="Text left, a full uncropped portrait right. Calm and magazine like." />
          <HeroSplit />

          <VariantLabel n="02" title="Full Bleed Cinematic" note="Immersive background photo with centered copy over a soft scrim." />
          <HeroFullBleed />

          <VariantLabel n="03" title="Centered Type + Image Band" note="A typographic statement above a row of work photos." />
          <HeroCentered />
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}
