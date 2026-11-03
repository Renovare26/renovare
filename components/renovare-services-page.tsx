"use client"

import { useState, type MouseEvent, type ReactNode } from "react"

/**
 * Renovaré Salon — Services & Investment page
 * Drop-in replacement for the existing Services page (Next.js App Router / v0).
 * Self-contained: all styles are scoped to `.rnv-services`, no extra packages needed.
 *
 * ─── EDIT THESE SETTINGS ──────────────────────────────────────────────────────
 */
const BOOKING_URL = "https://phorest.com/book/salons/renovaresalon"
const PHONE_DISPLAY = "(571) 455-9838"
const SMS_URL = "sms:+15714559838"
export const HEADER_OFFSET = 82 // px: height of the site's sticky header, so jump links land exactly on the heading

/**
 * Optional photos. Leave a `src` empty ("") and that photo space simply doesn't show,
 * so there are never broken images. Use real, unfiltered salon photos.
 */
const IMAGES = {
  hero: { src: "", alt: "Inside Renovaré Salon in Fairfax, Virginia" },
  experience: [
    { src: "/images/salon/relaxation-table.jpeg", alt: "Relaxation table with Renovaré Rocks painting and coloring books" },
    { src: "/images/salon/shampoo-chair.jpeg", alt: "Shiatsu massage chair at the shampoo bowl with weighted blanket" },
    { src: "", alt: "Nespresso iced latte and snacks for guests" },
  ],
  sections: {
    cut: { src: "", alt: "Haircut and blowout result at Renovaré" },
    gray: { src: "", alt: "Gray coverage result at Renovaré" },
    brighten: { src: "", alt: "Babylights result at Renovaré" },
    dimension: { src: "", alt: "Soft dimensional color result at Renovaré" },
    balayage: { src: "", alt: "Balayage result at Renovaré" },
    gloss: { src: "", alt: "Glossy, mirror-like shine at Renovaré" },
    transform: { src: "", alt: "Platinum transformation result at Renovaré" },
    health: { src: "", alt: "Healthy, restored hair at Renovaré" },
  } as Record<string, { src: string; alt: string }>,
}
/* ──────────────────────────────────────────────────────────────────────────── */

type TierKey = "i" | "s" | "a" | "f"
type Price = [number, number, number, number] | { consult: string } | { one: string }
type Service = { name: string; desc?: string; price: Price }
type Section = { id: string; chip: string; title: string; sub: string; nudge?: string; items: Service[] }

const TIERS: { key: TierKey; label: string }[] = [
  { key: "i", label: "Initiate" },
  { key: "s", label: "Signature" },
  { key: "a", label: "Artisan" },
  { key: "f", label: "Founder" },
]

const NUDGE_COLOR =
  "Not sure what to call it? Text us a photo of your hair and a look you love, and tell us in your own words. We'll take it from there."

const MENU: Section[] = [
  {
    "id": "cut",
    "chip": "Cut & Style",
    "title": "Cut & Style",
    "sub": "Cuts, blowouts, and finishing touches.",
    "items": [
      {
        "name": "Women's Signature Haircut & Finish",
        "desc": "Personalized consultation, luxury shampoo experience, customized haircut, and a professional blow dry and finish.",
        "price": [
          85,
          95,
          130,
          210
        ]
      },
      {
        "name": "Signature Blowout",
        "desc": "Luxury shampoo experience with a professional blow dry and finish.",
        "price": [
          55,
          65,
          75,
          100
        ]
      },
      {
        "name": "Editorial Blowout",
        "desc": "Elevated styling with hot tools when desired, for events, photos, or simply feeling your best.",
        "price": [
          90,
          100,
          115,
          165
        ]
      },
      {
        "name": "Special Occasion Styling",
        "desc": "Polished updos, soft waves, and event styling for weddings, galas, and celebrations.",
        "price": {
          "consult": "Coming soon · Text us to join the early list"
        }
      },
      {
        "name": "Gentlemen's Precision Cut",
        "desc": "A tailored, precise cut for a clean and polished finish.",
        "price": [
          55,
          65,
          80,
          125
        ]
      },
      {
        "name": "Precision Bang Trim",
        "desc": "A quick reshape to keep your fringe or face frame looking intentional between visits.",
        "price": [
          10,
          20,
          30,
          50
        ]
      }
    ]
  },
  {
    "id": "gray",
    "chip": "Gray Coverage",
    "title": "Root & Gray Coverage",
    "sub": "Seamless, even color from roots to ends.",
    "items": [
      {
        "name": "Root Touch Up",
        "desc": "Fresh, even color at the regrowth, including gray coverage.",
        "price": [
          135,
          155,
          185,
          250
        ]
      },
      {
        "name": "All Over Color",
        "desc": "One rich, even shade from roots to ends, or full gray coverage. Beautiful for deepening or refreshing brunette and red hair.",
        "price": [
          185,
          210,
          235,
          330
        ]
      }
    ]
  },
  {
    "id": "brighten",
    "chip": "Brighten Up",
    "title": "Brighten Up",
    "sub": "Fine, hand-placed babylights for luminous, blended brightness.",
    "items": [
      {
        "name": "Face Framing Highlights",
        "desc": "Brightness placed around the face for a lifted, luminous look with minimal commitment.",
        "price": [
          135,
          150,
          175,
          250
        ]
      },
      {
        "name": "Partial Baby Lights",
        "desc": "Fine babylights placed through the top and crown, where light naturally falls.",
        "price": [
          215,
          245,
          275,
          400
        ]
      },
      {
        "name": "Full Baby Lights",
        "desc": "Fine babylights on top with softer highlights beneath, for a fully blended, luminous result.",
        "price": [
          255,
          325,
          435,
          560
        ]
      }
    ]
  },
  {
    "id": "dimension",
    "chip": "Soft Dimension",
    "title": "Soft Dimension",
    "sub": "Subtle ribbons of light so your color is never flat.",
    "items": [
      {
        "name": "Partial Classic Highlights",
        "desc": "Soft, natural highlights through the top and part line to break up all-over color with gentle movement.",
        "price": [
          155,
          190,
          220,
          290
        ]
      },
      {
        "name": "Full Classic Highlights",
        "desc": "Natural dimension placed throughout for depth and movement. Beautiful on brunette and red hair.",
        "price": [
          205,
          235,
          290,
          380
        ]
      }
    ],
    "nudge": NUDGE_COLOR
  },
  {
    "id": "balayage",
    "chip": "Balayage",
    "title": "Lived-In Balayage",
    "sub": "Soft, low-maintenance color that grows out beautifully.",
    "items": [
      {
        "name": "Partial Balayage",
        "desc": "Hand-painted brightness through the top and face frame for an effortless, sun-kissed look.",
        "price": [
          195,
          225,
          250,
          375
        ]
      },
      {
        "name": "Full Balayage",
        "desc": "Hand-painted dimension throughout for seamless, low-maintenance color you'll love for months.",
        "price": [
          235,
          260,
          300,
          425
        ]
      }
    ]
  },
  {
    "id": "gloss",
    "chip": "Gloss & Shine",
    "title": "Gloss & Shine",
    "sub": "Glass-like shine and fresh tone, renewed between color visits.",
    "items": [
      {
        "name": "Gloss & Shine Refresh",
        "desc": "A sheer, conditioning gloss that refreshes tone and restores rich, reflective shine. Beautiful on every shade.",
        "price": [
          85,
          105,
          125,
          160
        ]
      },
      {
        "name": "Oribe Mirror Rinse Glass Hair Treatment",
        "desc": "A rinse-out treatment that smooths the surface of the hair for a dramatic, mirror-like shine in minutes. Add it to any service. The same price with every artist.",
        "price": {
          "one": "$45"
        }
      }
    ]
  },
  {
    "id": "health",
    "chip": "Hair Health",
    "title": "Hair & Scalp Health",
    "sub": "Restorative care for stronger, softer, healthier hair.",
    "items": [
      {
        "name": "Signature Hair Renewal Treatment",
        "price": {
          "one": "From $60"
        }
      },
      {
        "name": "Detox Treatment",
        "price": {
          "one": "From $85"
        }
      },
      {
        "name": "Moisture Recovery Treatment",
        "price": {
          "one": "From $60"
        }
      },
      {
        "name": "Bond Repair Therapy",
        "price": {
          "one": "From $75"
        }
      },
      {
        "name": "Scalp Renewal Experience",
        "price": {
          "one": "From $95"
        }
      },
      {
        "name": "Professional Smoothing Treatment",
        "price": {
          "one": "Starting at $300"
        }
      },
      {
        "name": "Express Smoothing Treatment",
        "price": {
          "one": "Starting at $150"
        }
      }
    ],
    "nudge": "Not sure which treatment your hair needs? Your artist will recommend one during your consultation."
  },
  {
    "id": "transform",
    "chip": "Transformations",
    "title": "Transformations",
    "sub": "For a significant change. Every transformation begins with a consultation.",
    "items": [
      {
        "name": "Platinum Transformation",
        "desc": "For guests moving to an icy or platinum blonde.",
        "price": {
          "consult": "Consultation required · Starting at $500+"
        }
      },
      {
        "name": "Brunette Transformation",
        "desc": "For a significant brunette color change or customized dimensional transformation.",
        "price": {
          "consult": "Consultation required · Custom quote"
        }
      },
      {
        "name": "Color Correction",
        "desc": "For color that needs to be balanced, removed, or redirected.",
        "price": {
          "consult": "Consultation required · Custom quote"
        }
      },
      {
        "name": "Blonding Correction",
        "desc": "For blonde that needs to be balanced, repaired, or redirected.",
        "price": {
          "consult": "Consultation required · Custom quote"
        }
      }
    ],
    "nudge": NUDGE_COLOR
  }
]

const GOALS: { target: string; title: string; desc: string }[] = [
  {
    "target": "gray",
    "title": "Cover my grays",
    "desc": "Seamless coverage from roots to ends."
  },
  {
    "target": "brighten",
    "title": "Brighten up",
    "desc": "Luminous, blended babylights."
  },
  {
    "target": "dimension",
    "title": "Soft, natural dimension",
    "desc": "Color that's never flat."
  },
  {
    "target": "balayage",
    "title": "Low-maintenance, lived-in",
    "desc": "Soft color that grows out beautifully."
  },
  {
    "target": "cut",
    "title": "A fresh cut or blowout",
    "desc": "Polished, personal, and easy to style."
  },
  {
    "target": "transform",
    "title": "Something completely new",
    "desc": "Platinum, big changes, and corrections."
  },
  {
    "target": "gloss",
    "title": "Shine & healthier hair",
    "desc": "Glass-like shine and restorative care."
  },
  {
    "target": "sms",
    "title": "I'm not sure yet",
    "desc": "Text us a photo and tell us in your own words."
  }
]

const LEVELS: { key: TierKey; name: string; desc: string; tag?: string }[] = [
  {
    "key": "i",
    "name": "Initiate",
    "desc": "Licensed artists refining their craft through advanced mentorship while delivering beautiful foundational results.",
    "tag": "Our most accessible investment"
  },
  {
    "key": "s",
    "name": "Signature",
    "desc": "Experienced artists known for polished, consistent work and thoughtful guest care."
  },
  {
    "key": "a",
    "name": "Artisan",
    "desc": "Advanced artists specializing in customized color, precision cutting, and elevated transformations."
  },
  {
    "key": "f",
    "name": "Founder",
    "desc": "Stephanie personally provides appointments for guests seeking highly customized transformations, advanced color work, and her signature approach to consultation and artistry.",
    "tag": "Availability is limited"
  }
]

const AMENITIES: { title: string; desc: string }[] = [
  {
    "title": "Arrival neck wrap",
    "desc": "Warm or chilled, in eucalyptus or lavender."
  },
  {
    "title": "Gourmet refreshments",
    "desc": "Nespresso iced lattes, sparkling water, and curated snacks."
  },
  {
    "title": "A relaxation table",
    "desc": "Renovaré Rocks painting, coloring books, reading, or a remote-work setup with charging while your color processes."
  },
  {
    "title": "The shampoo bowl",
    "desc": "Shiatsu massage chairs, weighted blankets, eye masks, lavender aromatherapy, and a scalp massage. Napping welcome."
  },
  {
    "title": "Quiet appointments",
    "desc": "Prefer a peaceful visit? Just let us know when you reserve."
  },
  {
    "title": "Bond building",
    "desc": "Included with every highlighting and dimensional service where lightener is used."
  }
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
}

function JumpLink({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToId(to)
  }
  return (
    <a href={`#${to}`} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

function Photo({ img, className }: { img?: { src: string; alt: string }; className: string }) {
  if (!img || !img.src) return null
  return (
    <figure className={className}>
      <img className="rnv-img" src={img.src || "/placeholder.svg"} alt={img.alt} loading="lazy" />
    </figure>
  )
}

function BookButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rnv-ctas">
      <a className="rnv-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        Book online
      </a>
      <a className="rnv-btn rnv-btn--ghost" href={SMS_URL}>
        {compact ? "Text us" : `Text us · ${PHONE_DISPLAY}`}
      </a>
    </div>
  )
}

function ServiceRow({ s }: { s: Service }) {
  const head = (
    <div className="rnv-svc-head">
      <h4>{s.name}</h4>
      {s.desc ? <p className="rnv-desc">{s.desc}</p> : null}
    </div>
  )
  if ("consult" in s.price) {
    return (
      <div className="rnv-svc rnv-svc--consult">
        {head}
        <div className="rnv-pill">{s.price.consult}</div>
      </div>
    )
  }
  if ("one" in s.price) {
    return (
      <div className="rnv-svc rnv-svc--one">
        {head}
        <div className="rnv-one">{s.price.one}</div>
      </div>
    )
  }
  const prices = s.price
  return (
    <div className="rnv-svc">
      {head}
      <dl className="rnv-tiers">
        {TIERS.map((t, i) => (
          <div key={t.key} data-t={t.key}>
            <dt>{t.label}</dt>
            <dd>
              <span className="rnv-from">From </span>${prices[i]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function ServicesPage() {
  const [view, setView] = useState<"all" | TierKey>("all")
  const hasHero = Boolean(IMAGES.hero.src)
  const gallery = IMAGES.experience.filter((im) => im.src)

  return (
    <main className="rnv-services" data-view={view}>
      <style>{RNV_CSS}</style>

      {/* Hero */}
      <header className={`rnv-wrap rnv-hero${hasHero ? " rnv-hero--img" : ""}`}>
        <div className="rnv-hero-text">
          <p className="rnv-eyebrow">Services &amp; Investment</p>
          <h1>Find your service. Choose your artist.</h1>
          <p className="rnv-lede">
            Every visit at Renovaré is personalized, unhurried, and thoughtfully hosted. Starting prices are listed
            below, and your artist will share your estimated total investment before your service begins.
          </p>
          <BookButtons />
          <p className="rnv-small">
            Book online any time, or text our team.{" "}
            <JumpLink to="rnv-new" className="rnv-inline">
              New guest? Start here
            </JumpLink>
          </p>
        </div>
        <Photo img={IMAGES.hero} className="rnv-hero-img" />
      </header>

      {/* Goals */}
      <section className="rnv-wrap rnv-goals-wrap" aria-labelledby="rnv-goal-h">
        <p className="rnv-eyebrow">Start With You</p>
        <h2 id="rnv-goal-h" className="rnv-h2">
          What are you hoping for?
        </h2>
        <p className="rnv-intro">You never need the &ldquo;right&rdquo; words. Choose what feels closest, and we&rsquo;ll guide you from there.</p>
        <nav className="rnv-goals" aria-label="Find your service">
          {GOALS.map((g) =>
            g.target === "sms" ? (
              <a key={g.title} className="rnv-goal" href={SMS_URL}>
                <strong>{g.title}</strong>
                <span>{g.desc}</span>
              </a>
            ) : (
              <JumpLink key={g.title} to={`rnv-${g.target}`} className="rnv-goal">
                <strong>{g.title}</strong>
                <span>{g.desc}</span>
              </JumpLink>
            ),
          )}
        </nav>
      </section>

      {/* New guests */}
      <section className="rnv-band rnv-band--paper" id="rnv-new" aria-labelledby="rnv-new-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">New to Renovaré</p>
          <h2 id="rnv-new-h" className="rnv-h2">
            Reserving your first visit is simple.
          </h2>
          <ol className="rnv-steps">
            <li>
              <strong>Book online or text us</strong>
              <span>
                Reserve a time that works for you online, any time. Prefer to talk it through first? Text our team a
                photo of your hair today and a look you love.
              </span>
            </li>
            <li>
              <strong>Enjoy a virtual consultation</strong>
              <span>
                An optional, complimentary 15-minute consultation from home. We&rsquo;ll also learn how you&rsquo;d like to spend
                your visit: quiet, conversation, or working remotely.
              </span>
            </li>
            <li>
              <strong>Arrive and unwind</strong>
              <span>
                Your artist guides the conversation, so you never need the &ldquo;right&rdquo; words. We take care of the rest.
              </span>
            </li>
          </ol>
          <div className="rnv-gap" />
          <BookButtons />
        </div>
      </section>

      {/* Experience */}
      <section className="rnv-band" aria-labelledby="rnv-exp-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">The Renovaré Experience</p>
          <h2 id="rnv-exp-h" className="rnv-h2">
            Included with every visit.
          </h2>
          {gallery.length > 0 && (
            <div className="rnv-gallery">
              {gallery.map((im) => (
                <Photo key={im.src} img={im} className="rnv-gallery-item" />
              ))}
            </div>
          )}
          <ul className="rnv-amen">
            {AMENITIES.map((a) => (
              <li key={a.title}>
                <strong>{a.title}</strong>
                <span>{a.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Levels */}
      <section className="rnv-band rnv-band--paper" aria-labelledby="rnv-lvl-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">Choose Your Artist</p>
          <h2 id="rnv-lvl-h" className="rnv-h2">
            Four artist levels, one standard of care.
          </h2>
          <p className="rnv-intro">
            Every Renovaré artist completes advanced education through our in-house training pathway. Pricing reflects
            each artist&rsquo;s experience, demand, and availability. Every guest enjoys the same amenities and hospitality,
            whichever artist you choose.
          </p>
          <div className="rnv-levels">
            {LEVELS.map((l) => (
              <article key={l.key} className="rnv-level">
                <div className="rnv-level-top">
                  <h3>{l.name}</h3>
                  {l.tag ? <span className="rnv-tag">{l.tag}</span> : null}
                </div>
                <p>{l.desc}</p>
                <button
                  type="button"
                  className="rnv-link"
                  onClick={() => {
                    setView(l.key)
                    scrollToId("rnv-menu")
                  }}
                >
                  View {l.name} prices
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="rnv-wrap rnv-menu" id="rnv-menu" aria-labelledby="rnv-menu-h">
        <p className="rnv-eyebrow">The Menu</p>
        <h2 id="rnv-menu-h" className="rnv-h2">
          Starting prices
        </h2>
        <div className="rnv-controls">
          <div>
            <span className="rnv-label">Show prices for</span>
            <div className="rnv-toggle" role="radiogroup" aria-label="Show prices for">
              {[{ key: "all" as const, label: "All artists" }, ...TIERS].map((t) => (
                <label key={t.key}>
                  <input
                    type="radio"
                    name="rnv-view"
                    id={`rnv-view-${t.key}`}
                    value={t.key}
                    checked={view === t.key}
                    onChange={() => setView(t.key)}
                  />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="rnv-minw0">
            <span className="rnv-label">Jump to</span>
            <nav className="rnv-chips" aria-label="Service categories">
              {MENU.map((m) => (
                <JumpLink key={m.id} to={`rnv-${m.id}`}>
                  {m.chip}
                </JumpLink>
              ))}
            </nav>
          </div>
        </div>
        <p className="rnv-note">
          <strong>Brunette, red, blonde, or silver,</strong> every color service is custom-formulated for your shade.
        </p>
        <p className="rnv-note">
          <strong>Every coloring and highlighting experience includes</strong> a personalized consultation, toning or
          gloss as needed, and a Signature Blowout &amp; Finish. Prefer a haircut instead of the blowout? Add a
          Signature Haircut: Initiate +$30 · Signature +$30 · Artisan +$55 · Founder +$110. Prices reflect Artist
          Labor. A separate Professional Materials Investment applies to color and chemical services.
        </p>

        {MENU.map((m) => (
          <section key={m.id} className="rnv-cat" id={`rnv-${m.id}`} aria-labelledby={`rnv-${m.id}-h`}>
            <h3 id={`rnv-${m.id}-h`}>{m.title}</h3>
            <p className="rnv-catsub">{m.sub}</p>
            <Photo img={IMAGES.sections[m.id]} className="rnv-cat-img" />
            {m.items.map((s) => (
              <ServiceRow key={s.name} s={s} />
            ))}
            {m.nudge ? (
              <div className="rnv-nudge">
                <p>{m.nudge}</p>
                <div className="rnv-nudge-links">
                  <a className="rnv-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Book online
                  </a>
                  <a className="rnv-link" href={SMS_URL}>
                    Text {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            ) : null}
          </section>
        ))}
      </section>

      {/* Good to know */}
      <section className="rnv-band rnv-band--paper" aria-labelledby="rnv-know-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">Good to Know</p>
          <h2 id="rnv-know-h" className="rnv-h2">
            Before your appointment.
          </h2>
          <div className="rnv-know">
            <div>
              <h3>Your consultation</h3>
              <ul>
                <li>Every appointment begins with a personalized consultation.</li>
                <li>
                  Corrective color, platinum transformations, and extensions (coming soon) require a consultation before
                  booking.
                </li>
                <li>
                  Final investment varies according to the time, techniques, and professional materials required to
                  achieve your desired result.
                </li>
              </ul>
            </div>
            <div>
              <h3>Professional Materials Investment</h3>
              <p className="rnv-gap-sm">
                Prices shown reflect Artist Labor. A separate Professional Materials Investment applies to customized
                color and chemical services. Whenever possible, we&rsquo;ll provide an estimated total investment before
                your service begins.
              </p>
              <details>
                <summary>What does it include?</summary>
                <p>
                  It reflects the professional color, lighteners, developers, toners, treatments, disposables, and other
                  materials used throughout your appointment, and supports the curated guest amenities that are part of
                  every Renovaré experience. Because every guest&rsquo;s hair is unique, it varies with hair length, hair
                  density, previous color history, product usage, and service complexity.
                </p>
              </details>
            </div>
          </div>
          <div className="rnv-soon">
            <span className="rnv-tag">Coming soon</span>
            <h3>Private Room Upgrade</h3>
            <p>Guests may optionally upgrade to a private room for a little added quiet and privacy during their experience.</p>
          </div>
        </div>
      </section>

      {/* Close */}
      <footer className="rnv-close" aria-labelledby="rnv-close-h">
        <div className="rnv-wrap rnv-close-grid">
          <div>
            <p className="rnv-eyebrow">Reserve Your Experience</p>
            <h2 id="rnv-close-h">We&rsquo;d love to welcome you.</h2>
            <p className="rnv-close-lede">
              Book online any time, or text our team to ask a question or schedule your complimentary virtual
              consultation.
            </p>
            <p className="rnv-phone">{PHONE_DISPLAY}</p>
            <BookButtons compact />
          </div>
          <div>
            <p className="rnv-eyebrow">Our Hours</p>
            <dl className="rnv-hours">
              <div>
                <dt>Thursday – Saturday</dt>
                <dd>In-salon services and guest messages</dd>
              </div>
              <div>
                <dt>Tuesday &amp; Wednesday</dt>
                <dd>Booking and inquiries</dd>
              </div>
              <div>
                <dt>Sunday &amp; Monday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
            <p className="rnv-close-note">Messages received while we&rsquo;re closed will be answered when we return.</p>
          </div>
        </div>
      </footer>

      {/* Mobile booking bar */}
      <div className="rnv-bar">
        <a className="rnv-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Book online
        </a>
        <a className="rnv-btn rnv-btn--ghost" href={SMS_URL}>
          Text us
        </a>
      </div>
    </main>
  )
}

const RNV_CSS = String.raw`@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500&display=swap");
/* Layout: a menu card on cream paper. Value and the new-guest path come before price; one level selector shortens the menu. */
.rnv-services{
  --cream:#F5F1EB; --paper:#FBF8F3; --line:#E2D9CD; --ink:#1F1B17; --text:#4A423B; --muted:#7A6E62;
  --taupe:#7B5E45; --taupe-deep:#5E4634; --night:#1C1815; --nightText:#EDE6DC;
  --display:"Playfair Display", Georgia, "Times New Roman", serif;
  --body:"Jost", "Helvetica Neue", Arial, sans-serif;
  background:var(--cream); color:var(--text); font-family:var(--body); font-size:16px; line-height:1.65;
  -webkit-font-smoothing:antialiased; text-align:left;
}
.rnv-services *{box-sizing:border-box}
.rnv-services h1,.rnv-services h2,.rnv-services h3,.rnv-services h4{font-family:var(--display);color:var(--ink);font-weight:400;margin:0;text-wrap:balance;letter-spacing:0}
.rnv-services p{margin:0}
.rnv-services a{color:inherit}
.rnv-services .rnv-wrap{max-width:960px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
.rnv-services .rnv-eyebrow{font-family:var(--display);font-style:italic;font-size:.82rem;letter-spacing:.32em;text-transform:uppercase;color:var(--taupe)}
.rnv-services section,.rnv-services header,.rnv-services footer{display:block}

/* Hero */
.rnv-services .rnv-hero{padding-block:56px 44px;display:grid;gap:18px}
.rnv-services .rnv-hero h1{font-size:clamp(2.1rem,6vw,3.4rem);line-height:1.1;max-width:15ch}
.rnv-services .rnv-hero p.rnv-lede{font-size:1.08rem;max-width:58ch}
.rnv-services .rnv-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px}
.rnv-services .rnv-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--body);font-weight:500;font-size:.82rem;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;padding:16px 26px;border:1px solid var(--taupe);background:var(--taupe);color:#FBF8F3;cursor:pointer;transition:background .2s}
.rnv-services .rnv-btn:hover{background:var(--taupe-deep)}
.rnv-services .rnv-btn--ghost{background:transparent;color:var(--ink);border-color:var(--ink)}
.rnv-services .rnv-btn--ghost:hover{background:var(--ink);color:#FBF8F3}
.rnv-services .rnv-small{font-size:.85rem;color:var(--muted)}

/* Goals */
.rnv-services .rnv-goals{display:grid;gap:10px;margin-top:24px;grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:760px){.rnv-services .rnv-goals{grid-template-columns:repeat(4,minmax(0,1fr))}}
.rnv-services .rnv-goal{display:flex;flex-direction:column;gap:6px;padding:18px 16px;background:var(--paper);border:1px solid var(--line);text-decoration:none;transition:border-color .2s,transform .2s;min-width:0}
.rnv-services .rnv-goal:hover{border-color:var(--taupe);transform:translateY(-2px)}
.rnv-services .rnv-goal strong{font-family:var(--display);font-weight:400;font-size:1.12rem;line-height:1.25;color:var(--ink)}
.rnv-services .rnv-goal strong::after{content:" \2192";color:var(--taupe)}
.rnv-services .rnv-goal span{font-size:.86rem;color:var(--muted);line-height:1.45}
.rnv-services .rnv-catsub{font-family:var(--display);font-style:italic;font-size:1.05rem;color:var(--text);margin-top:12px}

/* Bands */
.rnv-services .rnv-band{padding-block:48px}
.rnv-services .rnv-band--paper{background:#EDE7DE}
.rnv-services .rnv-band h2{font-size:clamp(1.6rem,4vw,2.2rem);line-height:1.2;margin-top:8px}
.rnv-services .rnv-intro{max-width:60ch;margin-top:12px}

/* New guest steps */
.rnv-services .rnv-steps{list-style:none;margin:28px 0 0;padding:0;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));counter-reset:step}
.rnv-services .rnv-steps li{background:var(--paper);border:1px solid var(--line);padding:22px;display:grid;gap:8px;counter-increment:step}
.rnv-services .rnv-steps li::before{content:"0" counter(step);font-family:var(--display);font-size:1.5rem;color:var(--taupe);line-height:1}
.rnv-services .rnv-steps strong{font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--ink)}

/* Amenities */
.rnv-services .rnv-amen{list-style:none;margin:26px 0 0;padding:0;display:grid;gap:0 36px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.rnv-services .rnv-amen li{display:grid;gap:2px;padding:16px 0;border-top:1px solid #D9CFC2}
.rnv-services .rnv-amen strong{font-family:var(--display);font-weight:400;font-size:1.1rem;color:var(--ink)}
.rnv-services .rnv-amen span{font-size:.95rem}

/* Levels */
.rnv-services .rnv-levels{display:grid;gap:14px;margin-top:26px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}
.rnv-services .rnv-level{border:1px solid var(--line);background:var(--paper);padding:22px;display:flex;flex-direction:column;gap:10px}
.rnv-services .rnv-level-top{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 10px}
.rnv-services .rnv-level h3{font-size:1.45rem}
.rnv-services .rnv-level p{font-size:.95rem;flex:1}
.rnv-services .rnv-tag{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--taupe);border:1px solid var(--line);padding:3px 8px}
.rnv-services .rnv-link{font-family:var(--body);font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;color:var(--ink);background:none;border:0;border-bottom:1px solid var(--ink);padding:0 0 3px;cursor:pointer;text-decoration:none;align-self:flex-start}
.rnv-services .rnv-link:hover{color:var(--taupe);border-color:var(--taupe)}

/* Menu controls */
.rnv-services .rnv-menu{padding-block:52px 24px}
.rnv-services .rnv-controls{display:grid;gap:18px;margin-top:22px;padding:20px;background:var(--paper);border:1px solid var(--line)}
.rnv-services .rnv-controls .rnv-label{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.rnv-services .rnv-toggle{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.rnv-services .rnv-toggle label{cursor:pointer}
.rnv-services .rnv-toggle input{position:absolute;opacity:0;width:1px;height:1px}
.rnv-services .rnv-toggle span{display:inline-block;padding:9px 16px;border:1px solid var(--line);font-size:.86rem;background:#fff;color:var(--text);transition:all .15s}
.rnv-services .rnv-toggle input:checked + span{background:var(--ink);border-color:var(--ink);color:#FBF8F3}
.rnv-services .rnv-toggle input:focus-visible + span{outline:2px solid var(--taupe);outline-offset:2px}
.rnv-services .rnv-chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-top:8px;scrollbar-width:thin}
.rnv-services .rnv-chips a{flex:none;text-decoration:none;font-size:.86rem;padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:#fff;white-space:nowrap}
.rnv-services .rnv-chips a:hover{border-color:var(--taupe);color:var(--taupe)}
.rnv-services .rnv-note{font-size:.92rem;margin-top:18px;max-width:70ch}
.rnv-services .rnv-note strong{color:var(--ink);font-weight:500}

/* Categories and service rows */
.rnv-services .rnv-cat{margin-top:44px;scroll-margin-top:90px}
.rnv-services .rnv-catsub + .rnv-svc{border-top:0}
.rnv-services .rnv-cat > h3{font-family:var(--display);font-style:italic;font-size:.9rem;letter-spacing:.3em;text-transform:uppercase;color:var(--taupe);padding-bottom:12px;border-bottom:1px solid var(--ink)}
.rnv-services .rnv-svc{display:grid;gap:10px;padding:18px 0;border-bottom:1px solid var(--line)}
.rnv-services .rnv-svc-head{min-width:0}
.rnv-services .rnv-svc h4{font-size:1.18rem;line-height:1.3}
.rnv-services .rnv-desc{font-size:.9rem;color:var(--muted);margin-top:4px;max-width:52ch}
.rnv-services .rnv-tiers{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:0}
.rnv-services .rnv-tiers > div{background:var(--paper);border:1px solid var(--line);padding:8px 10px;min-width:0}
.rnv-services .rnv-tiers dt{font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.rnv-services .rnv-tiers dd{margin:2px 0 0;font-family:var(--display);font-size:1.08rem;color:var(--ink);font-variant-numeric:tabular-nums}
.rnv-services .rnv-from{display:none}
.rnv-services .rnv-pill{justify-self:start;font-size:.88rem;color:var(--taupe);border:1px solid #CDBFAE;border-radius:999px;padding:7px 14px}
.rnv-services .rnv-one{font-family:var(--display);font-size:1.08rem;color:var(--ink);white-space:nowrap}
.rnv-services .rnv-svc--one{grid-template-columns:minmax(0,1fr) auto;align-items:baseline}
.rnv-services .rnv-nudge{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;justify-content:space-between;margin-top:16px;padding:16px 18px;background:#EDE7DE}
.rnv-services .rnv-nudge p{font-size:.92rem;color:var(--ink);max-width:56ch}

/* Single-level view */
.rnv-services[data-view="i"] .rnv-tiers > div:not([data-t="i"]),
.rnv-services[data-view="s"] .rnv-tiers > div:not([data-t="s"]),
.rnv-services[data-view="a"] .rnv-tiers > div:not([data-t="a"]),
.rnv-services[data-view="f"] .rnv-tiers > div:not([data-t="f"]){display:none}
.rnv-services:not([data-view="all"]) .rnv-svc:not(.rnv-svc--consult):not(.rnv-svc--one){grid-template-columns:minmax(0,1fr) auto;align-items:baseline}
.rnv-services:not([data-view="all"]) .rnv-tiers{grid-template-columns:1fr}
.rnv-services:not([data-view="all"]) .rnv-tiers > div{background:none;border:0;padding:0;text-align:right}
.rnv-services:not([data-view="all"]) .rnv-tiers dt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.rnv-services:not([data-view="all"]) .rnv-from{display:inline;font-family:var(--body);font-size:.8rem;color:var(--muted)}

@media (min-width:760px){
  .rnv-services[data-view="all"] .rnv-svc:not(.rnv-svc--consult):not(.rnv-svc--one){grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);align-items:center;gap:24px}
  .rnv-services .rnv-svc--consult{grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:24px}
  .rnv-services .rnv-controls{grid-template-columns:auto minmax(0,1fr);align-items:end;gap:28px}
}

/* Good to know */
.rnv-services .rnv-know{display:grid;gap:28px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-top:24px}
.rnv-services .rnv-know ul{margin:10px 0 0;padding-left:18px;display:grid;gap:8px}
.rnv-services .rnv-know h3{font-size:1.25rem}
.rnv-services details{margin-top:12px;border-top:1px solid var(--line);padding-top:12px}
.rnv-services summary{cursor:pointer;color:var(--ink);font-weight:500}
.rnv-services details p{margin-top:8px;font-size:.95rem}
.rnv-services .rnv-soon{margin-top:28px;border:1px solid var(--line);background:var(--paper);padding:20px 22px;display:grid;gap:6px}
.rnv-services .rnv-soon .rnv-tag{justify-self:start}

/* Hours */
.rnv-services .rnv-hours{margin:16px 0 0;display:grid;gap:0}
.rnv-services .rnv-hours > div{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;padding:10px 0;border-bottom:1px solid currentColor;border-color:rgba(127,110,98,.35)}
.rnv-services .rnv-hours dt{font-weight:500}
.rnv-services .rnv-hours dd{margin:0;opacity:.85}

/* Closing band */
.rnv-services .rnv-close{background:var(--night);color:var(--nightText);padding-block:56px 64px}
.rnv-services .rnv-close h2{color:#FBF8F3;font-size:clamp(1.8rem,5vw,2.6rem)}
.rnv-services .rnv-close .rnv-eyebrow{color:#C9B49C}
.rnv-services .rnv-close-grid{display:grid;gap:32px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));align-items:start;margin-top:10px}
.rnv-services .rnv-close .rnv-btn{background:#FBF8F3;color:var(--night);border-color:#FBF8F3;margin-top:22px}
.rnv-services .rnv-close .rnv-btn:hover{background:#E9DFD2}
.rnv-services .rnv-phone{font-family:var(--display);font-size:1.5rem;color:#FBF8F3;margin-top:14px;user-select:all}

/* Mobile text bar */
.rnv-services .rnv-bar{display:none}
@media (max-width:759px){
  .rnv-services{padding-bottom:76px}
  .rnv-services .rnv-bar{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:50;padding:10px max(16px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:rgba(251,248,243,.97);border-top:1px solid var(--line);gap:10px;align-items:center}
  .rnv-services .rnv-bar .rnv-btn{flex:1;padding:14px 12px}
  .rnv-services .rnv-btn{letter-spacing:.12em;font-size:.76rem;padding:15px 18px}
  .rnv-services .rnv-tiers dd{font-size:1rem}
  .rnv-services .rnv-tiers > div{padding:7px 7px}
  .rnv-services .rnv-tiers dt{font-size:.58rem;letter-spacing:.08em}
}
@media (prefers-reduced-motion:reduce){.rnv-services *{transition:none!important;scroll-behavior:auto!important}}
.rnv-services a:focus-visible,.rnv-services button:focus-visible,.rnv-services summary:focus-visible{outline:2px solid var(--taupe);outline-offset:3px}
/* Additions for the component version */
.rnv-services{display:block;width:100%}
.rnv-services .rnv-h2{font-size:clamp(1.6rem,4vw,2.2rem);line-height:1.2;margin-top:8px}
.rnv-services .rnv-goals-wrap{padding-bottom:52px}
.rnv-services .rnv-gap{height:22px}
.rnv-services .rnv-gap-sm{margin-top:12px}
.rnv-services .rnv-minw0{min-width:0}
.rnv-services .rnv-inline{color:var(--ink);text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
.rnv-services .rnv-hero-text{display:grid;gap:18px;min-width:0}
.rnv-services .rnv-hero{grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.rnv-services .rnv-hero--img{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:center;gap:48px}}
.rnv-services figure{margin:0}
.rnv-services .rnv-img{width:100%;height:100%;object-fit:cover;display:block}
.rnv-services .rnv-hero-img{aspect-ratio:4/5;max-height:560px;max-width:100%;overflow:hidden;background:#EDE7DE}
.rnv-services .rnv-gallery{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:24px}
.rnv-services .rnv-gallery-item{aspect-ratio:4/3;max-width:100%;overflow:hidden;background:#EDE7DE}
.rnv-services .rnv-cat-img{margin-top:16px;aspect-ratio:16/7;max-width:100%;overflow:hidden;background:#EDE7DE}
.rnv-services .rnv-nudge-links{display:flex;flex-wrap:wrap;gap:12px 22px}
.rnv-services .rnv-soon h3{font-size:1.25rem}
.rnv-services .rnv-close h2{margin-top:10px}
.rnv-services .rnv-close-lede{margin-top:14px;max-width:44ch}
.rnv-services .rnv-close-note{margin-top:14px;font-size:.92rem;opacity:.85}
.rnv-services .rnv-close .rnv-btn--ghost{background:transparent;color:#FBF8F3;border-color:#FBF8F3}
.rnv-services .rnv-close .rnv-btn--ghost:hover{background:#FBF8F3;color:var(--night)}
.rnv-services .rnv-close .rnv-ctas{margin-top:22px}
.rnv-services .rnv-close .rnv-ctas .rnv-btn{margin-top:0}
@media (max-width:759px){.rnv-services .rnv-bar .rnv-btn--ghost{flex:0 0 auto;background:#fff}}
`
