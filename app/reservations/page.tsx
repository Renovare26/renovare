"use client"

import { motion } from "framer-motion"
import { Phone, MapPin, Clock, ArrowRight, Check } from "lucide-react"
import { Navigation, Footer, PhotoFill } from "@/components/site-shared"
import { ContactForm } from "@/components/contact-form"
import { IMAGES } from "@/lib/site-images"

function ReserveHero() {
  return (
    <section className="relative min-h-[80vh] bg-background overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pb-16 pt-8 lg:pt-32 lg:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="editorial-eyebrow text-xs text-primary mb-6"
          >
            Reserve
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95]"
          >
            Reserve your
            <br />
            <span className="italic text-primary">retreat</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg lg:text-xl max-w-md mt-8 leading-relaxed"
          >
            A few quick questions help us prepare for your first retreat. An estimate is shared after
            your complimentary consultation.
          </motion.p>
          <motion.a
            href="#request"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors w-fit group"
          >
            Begin Your Request
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="order-1 lg:order-2 relative flex items-center justify-center px-6 pt-28 pb-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="photo-live relative w-full max-w-md lg:max-w-none aspect-[3/4] lg:h-[64vh] lg:aspect-auto"
          >
            <PhotoFill
              photo={{
                kind: "real",
                src: IMAGES.shampooChair,
                alt: "The Renovaré shampoo suite beside the studio window",
              }}
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ReserveForm() {
  const expectations = [
    "A short, thoughtful welcome before your first retreat",
    "A price estimate shared after your complimentary consultation",
    "Pairing with the artist best suited to your goals",
    "A reply within 24–48 hours to confirm your retreat",
  ]

  return (
    <section id="request" className="py-24 lg:py-40 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="editorial-eyebrow text-xs text-primary mb-6">New Guest Welcome</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-8 leading-tight">
              A calm start to your first retreat
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Fill out the form below to schedule a complimentary consultation. Share a few details about
              your goals and we'll reach out to find a time that works for you.
            </p>

            <ul className="space-y-4 mb-12">
              {expectations.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-6 border-t border-border pt-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    10650 Main St, Suite 201
                    <br />
                    Fairfax, VA 22030
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Phone</h4>
                  <a href="tel:5714559838" className="text-muted-foreground hover:text-primary transition-colors">
                    571.455.9838
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Hours</h4>
                  <p className="text-muted-foreground">
                    Thu – Fri: 11am – 8pm
                    <br />
                    Saturday: 10am – 6pm
                    <br />
                    Sun – Wed: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background p-8 lg:p-12 rounded-2xl border border-border h-fit"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function ReservePage() {
  return (
    <main className="bg-background">
      <Navigation />
      <ReserveHero />
      <ReserveForm />
      <Footer />
    </main>
  )
}
