"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// IMAGES lives in a plain (non-client) module so server components can import it safely.
// Re-exported here for existing client-component consumers.
import { IMAGES } from "@/lib/site-images"
export { IMAGES }

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  )
}

/**
 * A Photo is either one of the salon's own uploaded images (`real`) or a clearly
 * marked placeholder awaiting a real photo of the salon's own work (`placeholder`).
 * No stock photography is ever used.
 */
export type Photo =
  | { kind: "real"; src: string; alt: string }
  | { kind: "placeholder"; caption: string; alt: string }

/** Soft, feathered taupe placeholder captioned with the exact real photo that belongs here. */
export function PhotoPlaceholder({ caption, className = "" }: { caption: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for real photo: ${caption}`}
      className={`absolute inset-0 photo-placeholder fade-edges flex items-center justify-center ${className}`}
    >
      <div className="photo-live-layer flex flex-col items-center text-center px-6">
        <CameraIcon className="w-6 h-6 text-foreground/35 mb-4" />
        <span className="editorial-eyebrow text-[10px] text-foreground/40 mb-2">Photo Placeholder</span>
        <span className="font-serif text-sm md:text-base text-foreground/70 max-w-[16rem] leading-snug text-balance">
          {caption}
        </span>
      </div>
    </div>
  )
}

/** Renders a fill-positioned real photo or its placeholder, with feathered edges. */
export function PhotoFill({
  photo,
  className = "",
  objectFit = "cover",
  priority = false,
  sizes,
}: {
  photo: Photo
  className?: string
  objectFit?: "cover" | "contain"
  priority?: boolean
  sizes?: string
}) {
  if (photo.kind === "placeholder") {
    return <PhotoPlaceholder caption={photo.caption} className={className} />
  }
  return (
    <Image
      src={photo.src || "/placeholder.svg"}
      alt={photo.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`${objectFit === "contain" ? "object-contain" : "object-cover"} fade-edges ${className}`}
    />
  )
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Facials", href: "/facials" },
  { label: "Membership", href: "/membership" },
  { label: "The Collective", href: "/the-collective" },
  { label: "Reserve", href: "/reservations" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <nav className="flex items-center justify-between px-6 lg:px-12 py-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-2xl text-white tracking-wider">Renovaré</span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="tel:5714559838" className="hidden md:block text-white text-sm tracking-wider">
              571.455.9838
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-2 border border-white/50 text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-500"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 lg:px-12 py-6">
                <span className="font-serif text-2xl text-primary-foreground tracking-wider">Renovaré</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 border border-primary-foreground/50 text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-primary transition-all duration-500"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center px-6 lg:px-24 overflow-y-auto py-8">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 font-serif text-4xl lg:text-6xl text-primary-foreground hover:text-primary-foreground/70 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-6 lg:px-12 py-8 flex flex-wrap gap-8 text-primary-foreground/70 text-sm">
                <a href="tel:5714559838" className="hover:text-primary-foreground transition-colors">
                  571.455.9838
                </a>
                <span>10650 Main St, Suite 201, Fairfax VA</span>
                <a
                  href="https://instagram.com/renovarefairfax"
                  className="hover:text-primary-foreground transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4" /> @renovarefairfax
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            {/* Logo slot — a new plain logo mark can drop in here */}
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <span className="font-serif text-3xl tracking-[0.15em] uppercase">Renovaré</span>
            </Link>
            {/* Confirmed brand tagline */}
            <p className="editorial-eyebrow text-[10px] text-background/60 mb-5">
              Elevated Artistry. Genuine Hospitality.
            </p>
            <p className="text-background/70 leading-relaxed max-w-md">
              A retreat style salon collective in Fairfax, Virginia. Expert color, blonding, and restorative
              care in a calm, unhurried space.
            </p>
            <a
              href="https://www.instagram.com/renovarefairfax"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
              <span className="tracking-[0.15em] uppercase text-sm">@renovarefairfax</span>
            </a>
          </div>

          <div>
            <h4 className="font-serif mb-6 tracking-[0.2em] uppercase text-sm">Explore</h4>
            <ul className="space-y-3 text-background/70">
              <li>
                <Link href="/our-story" className="hover:text-background transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-background transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/facials" className="hover:text-background transition-colors">
                  Facials &amp; Skin
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-background transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/the-collective" className="hover:text-background transition-colors">
                  The Collective
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-background transition-colors">
                  Reserve
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif mb-6 tracking-[0.2em] uppercase text-sm">Studio</h4>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="tel:5714559838" className="hover:text-background transition-colors">
                  571.455.9838
                </a>
              </li>
              <li className="leading-relaxed">10650 Main St, Suite 201, Fairfax, VA 22030</li>
              <li>
                <Link href="/careers" className="hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-background transition-colors">
                  Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            &copy; {new Date().getFullYear()} Renovaré. All rights reserved.
          </p>
          <p className="text-background/50 text-sm">Fairfax, Virginia</p>
        </div>
      </div>
    </footer>
  )
}
