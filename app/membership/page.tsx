"use client"

import { useActionState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, PlayCircle, Users } from "lucide-react"
import { Navigation, Footer, PhotoFill, type Photo } from "@/components/site-shared"
import { joinWaitlist } from "./actions"

/* -------------------------------------------------------------------------
   OWNER-EDITABLE PLACEHOLDERS — swap these in when finalized.
   - Prices are shown verbatim, so include the currency symbol.
   - WHOP_URL is where every "Join" button points until the portal is live.
   ------------------------------------------------------------------------- */
  const TIER_1_PRICE = "$24" // Online Library monthly price
  const TIER_2_PRICE = "$159" // Library + In-Salon Lessons monthly price
// Retained for launch: swap the tier CTAs from "#waitlist" back to WHOP_URL when live.
export const WHOP_URL = "https://whop.com/renovare" // TODO: real Whop membership link

function MembershipHero() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-36 pb-20 lg:pt-44 lg:pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <p className="editorial-eyebrow text-xs text-primary">The Styling Edit</p>
          <span className="px-4 py-1.5 rounded-full border border-primary/40 text-primary text-[10px] tracking-[0.3em] uppercase">
            Coming Soon
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] text-balance"
        >
          Love your hair leaving the chair.
          <br />
          <span className="italic text-primary">Recreate it at home.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          An online library of DIY styling tutorials that teaches you — step by step — how to
          restyle your salon look between visits. Because the best hair days shouldn&apos;t only
          happen in our chair.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors group"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#tiers"
            className="text-xs tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            Preview the Tiers
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      title: "Leave with a look you love",
      desc: "Your artist creates your style in the chair — the starting point you want to keep.",
    },
    {
      title: "Follow the tutorials",
      desc: "Watch on demand modules that break down a wide variety of styles — blowouts, waves, curls, updos and more — into simple, repeatable steps.",
    },
    {
      title: "Recreate it yourself",
      desc: "Practice the techniques at home and keep your look fresh between appointments.",
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <p className="editorial-eyebrow text-xs text-primary mb-4">The Problem We Solve</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground leading-tight text-balance">
            You leave feeling incredible — then can&apos;t quite recreate it at home. This changes that.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t border-border pt-6"
            >
              <span className="font-serif text-3xl text-primary/60">0{i + 1}</span>
              <h3 className="font-serif text-xl text-foreground mt-4 mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MembershipTiers() {
  const tier1Benefits = [
    "On demand access to the full styling tutorial library",
    "Step by step modules for blowouts, waves, curls & finishing",
    "New tutorials added over time",
    "Watch anytime, on any device",
    "Cancel anytime",
  ]

  const tier2Benefits = [
    "In person, hands on styling lessons at the salon",
    "Taught on a mannequin head to build real technique",
    "Personalized guidance from a Renovaré artist",
    "The fastest way to master styling your own hair",
  ]

  return (
    <section id="tiers" className="py-24 lg:py-36 bg-secondary">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="editorial-eyebrow text-xs text-primary mb-4">Choose Your Membership</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">Two Ways to Learn</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start with the online library, or add in salon lessons for hands on mastery. Month to month,
            cancel anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Tier 1 — Online Library */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 lg:p-10 flex flex-col bg-background border border-border"
          >
            <PlayCircle className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
            <p className="editorial-eyebrow text-[10px] text-muted-foreground mb-2">Tier One</p>
            <h3 className="font-serif text-3xl text-foreground mb-2">Online Library</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              On demand access to every styling tutorial — learn at your own pace, from home.
            </p>
            <div className="flex items-end gap-2 mb-8">
              <span className="font-serif text-5xl text-foreground">{TIER_1_PRICE}</span>
              <span className="text-sm mb-2 text-muted-foreground">per month</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {tier1Benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Pre-launch: points to the waitlist. When the Whop portal is live, swap
                href to WHOP_URL and change the label back to "Join — Online Library". */}
            <a
              href="#waitlist"
              className="w-full text-center py-4 rounded-lg text-xs tracking-[0.25em] uppercase transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Notify Me — Online Library
            </a>
          </motion.div>

          {/* Tier 2 — Library + In-Salon Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-8 lg:p-10 flex flex-col bg-primary text-primary-foreground shadow-xl lg:-translate-y-4"
          >
            <span className="self-start mb-6 px-3 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground text-[10px] tracking-[0.25em] uppercase">
              Most Hands On
            </span>
            <Users className="w-8 h-8 text-primary-foreground mb-6" strokeWidth={1.5} />
            <p className="editorial-eyebrow text-[10px] text-primary-foreground/70 mb-2">Tier Two</p>
            <h3 className="font-serif text-3xl text-primary-foreground mb-2">Hands On</h3>
            <p className="text-sm text-primary-foreground/80 mb-6 leading-relaxed">
              Everything in the Online Library, plus in person lessons taught on a mannequin head —
              learn how to style hair the way a hair stylist does.
            </p>
            <div className="flex items-end gap-2 mb-8">
              <span className="font-serif text-5xl text-primary-foreground">{TIER_2_PRICE}</span>
              <span className="text-sm mb-2 text-primary-foreground/70">per month</span>
            </div>

            <ul className="space-y-4 mb-4">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 mt-1 flex-shrink-0 text-primary-foreground" />
                <span className="text-sm leading-relaxed text-primary-foreground/90 font-medium">
                  Everything in the Online Library
                </span>
              </li>
            </ul>
            <p className="text-[10px] tracking-[0.25em] uppercase text-primary-foreground/60 mb-4">Plus</p>
            <ul className="space-y-4 mb-10 flex-1">
              {tier2Benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-primary-foreground" />
                  <span className="text-sm leading-relaxed text-primary-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs leading-relaxed text-primary-foreground/70 mb-6 border-t border-primary-foreground/20 pt-5">
              In salon lessons are delivered locally, in person — this tier is for members within
              commuting distance of our Fairfax salon. Prefer not to commit monthly? In salon lessons
              are also available à la carte, as a single session — ask us for per class pricing.
            </p>

            {/* Pre-launch: points to the waitlist. When the Whop portal is live, swap
                href to WHOP_URL and change the label back to "Join — Hands On". */}
            <a
              href="#waitlist"
              className="w-full text-center py-4 rounded-lg text-xs tracking-[0.25em] uppercase transition-colors bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Notify Me — Hands On
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-10 max-w-xl mx-auto leading-relaxed"
        >
          Membership is never required. Classes can also be attended à la carte, as single sessions —
          per class pricing varies with the nature of the class. Join the waitlist and you&apos;ll be the
          first to know when enrollment opens.
        </motion.p>
      </div>
    </section>
  )
}

function WhyMannequin() {
  const photo: Photo = {
    kind: "placeholder",
    caption: "REAL IN-SALON MANNEQUIN LESSON — from @renovarefairfax",
    alt: "A hands-on styling lesson taught on a mannequin head at Renovaré",
  }

  return (
    <section className="py-24 lg:py-36 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="photo-live relative aspect-[4/5] w-full order-2 lg:order-1"
          >
            <PhotoFill photo={photo} sizes="(max-width: 1024px) 90vw, 45vw" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="editorial-eyebrow text-xs text-primary mb-4">Why a Mannequin</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground leading-tight mb-6 text-balance">
              Master it on a mannequin first — then it&apos;s second nature on yourself.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Styling your own hair means working backward, in a mirror, at an angle. It&apos;s hard.
              Learning the technique on a mannequin head lets you see every step clearly and build the
              muscle memory without the frustration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Once your hands know the motion, recreating it on your own hair simply clicks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Waitlist() {
  const [state, formAction, pending] = useActionState(joinWaitlist, {
    status: "idle" as const,
    message: "",
  })

  return (
    <section id="waitlist" className="py-24 lg:py-36 bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto px-6 lg:px-12 text-center"
      >
        <p className="editorial-eyebrow text-xs text-primary mb-4">Be First to Know</p>
        <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-balance mb-5">
          Join the Styling Edit waitlist
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          The Styling Edit is launching soon. Add your name and we&apos;ll send you a note the moment
          enrollment opens — no obligation, no spam.
        </p>

        {state.status === "success" ? (
          <div className="bg-background rounded-2xl p-10">
            <p className="font-serif text-2xl text-foreground mb-3">Thank you.</p>
            <p className="text-muted-foreground leading-relaxed">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4 text-left">
            <div>
              <label htmlFor="wl-name" className="block text-sm text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="wl-name"
                name="name"
                className="w-full px-4 py-3 bg-background border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="wl-email" className="block text-sm text-foreground mb-2">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="wl-email"
                name="email"
                required
                className="w-full px-4 py-3 bg-background border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="wl-interest" className="block text-sm text-foreground mb-2">
                Which interests you?
              </label>
              <select
                id="wl-interest"
                name="interest"
                defaultValue="Either — send me details"
                className="w-full px-4 py-3 bg-background border-0 rounded-lg text-foreground focus:ring-2 focus:ring-primary outline-none"
              >
                <option>Either — send me details</option>
                <option>Online Library</option>
                <option>Hands On (in salon lessons)</option>
              </select>
            </div>

            {state.status === "error" && (
              <p className="text-sm text-destructive leading-relaxed">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-4 bg-primary text-primary-foreground rounded-lg text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-3 group disabled:opacity-60"
            >
              {pending ? "Adding you…" : "Join the Waitlist"}
              {!pending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}

export default function MembershipPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <MembershipHero />
      <HowItWorks />
      <MembershipTiers />
      <WhyMannequin />
      <Waitlist />
      <Footer />
    </main>
  )
}
