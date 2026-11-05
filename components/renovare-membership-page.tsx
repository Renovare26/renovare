"use client"

import { useEffect, useState, type MouseEvent, type ReactNode } from "react"

/**
 * Renovaré Salon — The Styling Edit™ Membership & Classes page
 * Drop-in replacement for the existing Membership page (Next.js App Router / v0).
 * Self-contained: all styles are scoped to `.rnv-memb`, no extra packages needed.
 *
 * ─── EDIT THESE SETTINGS ──────────────────────────────────────────────────────
 */
const PHONE_DISPLAY = "(571) 455-9838"
const SMS_URL = "sms:+15714559838"
const TEL_URL = "tel:+15714559838"
const EMAIL = "info@renovaresalon.com"
const MEMBERSHIP_URL = "http://phore.st/1ijQU" // Phorest link to purchase the membership
const CLASS_RESERVE_URL = "" // optional: paste an online class booking link and a "Reserve online" button appears
export const HEADER_OFFSET = 82 // px: height of the site's sticky header
const FOUNDING_DEADLINE_LABEL = "December 12, 2026"
const FOUNDING_DEADLINE = "2026-12-12T23:59:59-05:00" // end of day, Eastern
const FOUNDING_SPOTS = 50

/** This month's masterclass. Update each month. */
const CLASS = {
  month: "November",
  kicker: "Festive Masterclass",
  title: "Effortless Holiday & Special Event Hair",
  desc: "Learn step by step how to prepare, shape, and set long-lasting holiday waves, touchable updos, and special occasion styles that hold through every celebration.",
  sessions: [
    { date: "Tuesday, November 10", time: "5:30 – 7:30 PM", start: "2026-11-10T17:30:00-05:00", end: "2026-11-10T19:30:00-05:00" },
    { date: "Sunday, November 22", time: "3:00 – 5:00 PM", start: "2026-11-22T15:00:00-05:00", end: "2026-11-22T17:00:00-05:00" },
  ],
  price: "$195",
}

/** Optional photos. Leave `src` empty and the space hides itself. Use real, unfiltered photos. */
const IMAGES = {
  hero: { src: "", alt: "Guest practicing a blowout on a professional mannequin head during a hair styling class at Renovaré Salon in Fairfax, VA" },
  class: { src: "", alt: "Holiday waves styled during The Styling Edit hair styling masterclass in Fairfax, Virginia" },
}
/* ──────────────────────────────────────────────────────────────────────────── */

const MAIL_CLASS = `mailto:${EMAIL}?subject=${encodeURIComponent("Reserve my seat: The Styling Edit")}`

const INCLUDED = [
  { title: "Six stations, never more", desc: "An unhurried, personal setting where your educator can guide every step." },
  { title: "Real mannequin practice", desc: "Work hands-on with professional styling tools provided, the same way stylists train." },
  { title: "Your welcome kit", desc: "A curated kit of professional styling essentials, selected for that class, yours to take home and keep using." },
  { title: "A mini consultation first", desc: "Share a photo of your hair in a short pre-class survey, so your welcome kit and techniques are tailored to your hair." },
  { title: "Gourmet refreshments", desc: "Complimentary drinks while you practice each technique until it feels second nature." },
  { title: "Exclusive preferred pricing", desc: "Preferred pricing on our retail and custom-ordered styling tools, the day of your class." },
]

const FAQ = [
  {
    q: "Do you teach hair color or toning?",
    a: "No. The Styling Edit\u2122 is all about styling: blowouts, curls, braids, updos, and how to use your tools. Color, toning, and other chemical services always stay in the hands of our artists.",
  },
  {
    q: "Do I need any styling experience?",
    a: "Not at all. Classes range from foundational blowout skills to more advanced techniques, and every step is taught on a professional mannequin head so you can see and practice each section clearly.",
  },
  {
    q: "How does the Founding Membership work?",
    a: "The regular membership rate is $80 a month after the founding window. Founding members who enroll by December 12, 2026, or before the first 50 spots are filled, join for $65 a month with a three-month minimum. Each month includes one masterclass, and you also receive a welcome kit, blowout swaps up to three times a year, a Birthday Blowout, and preferred pricing anytime you shop.",
  },
  {
    q: "Can I give a styling class as a gift?",
    a: "Yes. Gift cards are available and can be used toward any single class, which makes a thoughtful holiday gift.",
  },
  {
    q: "Where are the classes held?",
    a: "Every class takes place at Renovaré Salon, a retreat-style salon collective in Fairfax, Virginia, with no more than six stations per class.",
  },
]

const SITE = "https://www.renovaresalon.com"
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HairSalon",
      "@id": `${SITE}/#salon`,
      name: "Renovaré Salon",
      url: SITE,
      telephone: "+1-571-455-9838",
      email: EMAIL,
      address: { "@type": "PostalAddress", streetAddress: "10650 Main St, Suite 201", addressLocality: "Fairfax", addressRegion: "VA", postalCode: "22030", addressCountry: "US" },
      areaServed: "Northern Virginia",
      sameAs: ["https://www.instagram.com/renovarefairfax/"],
    },
    ...CLASS.sessions.map((s) => ({
      "@type": "Event",
      name: `The Styling Edit\u2122: ${CLASS.title}`,
      description: CLASS.desc,
      startDate: s.start,
      endDate: s.end,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      maximumAttendeeCapacity: 6,
      location: {
        "@type": "Place",
        name: "Renovaré Salon",
        address: { "@type": "PostalAddress", streetAddress: "10650 Main St, Suite 201", addressLocality: "Fairfax", addressRegion: "VA", postalCode: "22030", addressCountry: "US" },
      },
      organizer: { "@id": `${SITE}/#salon` },
      offers: { "@type": "Offer", price: "195", priceCurrency: "USD", availability: "https://schema.org/InStock", url: SITE },
    })),
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
}

function useDaysLeft() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    const update = () => {
      const ms = new Date(FOUNDING_DEADLINE).getTime() - Date.now()
      setDays(ms > 0 ? Math.ceil(ms / 86400000) : 0)
    }
    update()
    const t = setInterval(update, 60 * 60 * 1000)
    return () => clearInterval(t)
  }, [])
  return days
}

function DeadlineLine() {
  const days = useDaysLeft()
  if (days === 0) return <>Founding enrollment has closed.</>
  return (
    <>
      Founding enrollment closes {FOUNDING_DEADLINE_LABEL}
      {days !== null ? ` (${days} ${days === 1 ? "day" : "days"} left)` : ""}, or when the first {FOUNDING_SPOTS} members
      join, whichever comes first.
    </>
  )
}

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

function Photo({ img, className }: { img: { src: string; alt: string }; className: string }) {
  if (!img.src) return null
  return (
    <figure className={className}>
      <img className="rnv-img" src={img.src || "/placeholder.svg"} alt={img.alt} loading="lazy" />
    </figure>
  )
}

function ReserveButtons({ light = false }: { light?: boolean }) {
  return (
    <div className={`rnv-ctas${light ? " rnv-ctas--light" : ""}`}>
      {CLASS_RESERVE_URL ? (
        <a className="rnv-btn" href={CLASS_RESERVE_URL} target="_blank" rel="noopener noreferrer">
          Reserve online
        </a>
      ) : null}
      <a className={`rnv-btn${CLASS_RESERVE_URL ? " rnv-btn--ghost" : ""}`} href={SMS_URL}>
        Text to reserve · {PHONE_DISPLAY}
      </a>
      <a className="rnv-btn rnv-btn--ghost" href={MAIL_CLASS}>
        Email to reserve
      </a>
    </div>
  )
}

export default function MembershipPage() {
  const hasHero = Boolean(IMAGES.hero.src)
  return (
    <main className="rnv-memb">
      <style>{MEMB_CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* Hero */}
      <header className={`rnv-wrap rnv-hero${hasHero ? " rnv-hero--img" : ""}`}>
        <div className="rnv-hero-text">
          <p className="rnv-badge">Founding Membership · Only {FOUNDING_SPOTS} spots · Closes Dec 12</p>
          <p className="rnv-eyebrow">The Styling Edit&trade; · Hair Styling Classes in Fairfax, Virginia</p>
          <h1>Learn to style your hair the way your stylist does.</h1>
          <p className="rnv-lede">
            Intimate, hands-on hair styling classes at Renovaré Salon in Fairfax, Virginia. Learn to blow dry, curl, braid,
            and set your own hair with the techniques stylists use, and leave with the confidence and tools to do it at
            home.
          </p>
          <div className="rnv-ctas">
            <a className="rnv-btn" href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">
              Become a founding member
            </a>
            <JumpLink to="rnv-class" className="rnv-btn rnv-btn--ghost">
              See this month&rsquo;s class
            </JumpLink>
          </div>
          <p className="rnv-small">
            <DeadlineLine />
          </p>
        </div>
        <Photo img={IMAGES.hero} className="rnv-hero-img" />
      </header>

      {/* Why */}
      <section className="rnv-band rnv-band--paper" aria-labelledby="rnv-why-h">
        <div className="rnv-wrap rnv-narrow">
          <p className="rnv-eyebrow">Why It&rsquo;s Different</p>
          <h2 id="rnv-why-h" className="rnv-h2">
            You leave the salon loving your hair. Then you try to recreate it at home.
          </h2>
          <div className="rnv-prose">
            <p>
              The tutorials move too fast. The angles never match. Your arms tire before the second section. It
              isn&rsquo;t you. Styling is a skill, and no one has ever taught it to you the way it&rsquo;s taught to
              stylists.
            </p>
            <p>
              At The Styling Edit&trade;, you learn on a professional mannequin head, the same way stylists train. You
              can see every section clearly, practice each technique until it clicks, and then take it home to your own
              hair with real confidence.
            </p>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="rnv-band" aria-labelledby="rnv-learn-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">What You&rsquo;ll Learn</p>
          <h2 id="rnv-learn-h" className="rnv-h2">
            A new styling technique every month, made for your own hair.
          </h2>
          <p className="rnv-intro">
            Every class is about styling, taught step by step so it works when you&rsquo;re doing it yourself. Color, toning,
            and other chemical services always stay in the hands of our artists.
          </p>
          <ul className="rnv-moments">
            <li>
              <strong>Foundational blowout skills</strong>
              <span>Sectioning, brush control, and the smooth, voluminous finish you love leaving the salon with.</span>
            </li>
            <li>
              <strong>Trending styles</strong>
              <span>The braids and chignons everyone is wearing right now, perfect for holiday occasions.</span>
            </li>
            <li>
              <strong>The 10-minute curl</strong>
              <span>A beautiful curl for busy mornings when you only have a few minutes to get ready.</span>
            </li>
            <li>
              <strong>The right tools</strong>
              <span>Which tools to use, which to skip, and how to use each one properly for every style.</span>
            </li>
            <li>
              <strong>Dad &amp; Daughter classes</strong>
              <span>
                Dads learn to braid, brush, and style their daughter&rsquo;s hair with confidence, so getting ready together
                feels easy and fun.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Founding membership offer */}
      <section className="rnv-band rnv-band--paper" id="rnv-founding" aria-labelledby="rnv-founding-h">
        <div className="rnv-wrap">
          <div className="rnv-offer">
            <div className="rnv-offer-main">
              <p className="rnv-plan-label">The Founding Membership</p>
              <h2 id="rnv-founding-h" className="rnv-h2">
                Make it a monthly habit, at a fraction of the drop-in price.
              </h2>
              <div className="rnv-anchor" aria-label="Price comparison">
                <div>
                  <span className="rnv-anchor-label">One single class</span>
                  <s>$195</s>
                </div>
                <div>
                  <span className="rnv-anchor-label">Regular rate after Dec 12</span>
                  <s>$80/mo</s>
                </div>
                <div>
                  <span className="rnv-anchor-label">Founding members</span>
                  <strong>
                    $65<span>/month</span>
                  </strong>
                </div>
              </div>
              <p className="rnv-offer-note">
                Your monthly class, your welcome kit, blowout swaps, and preferred pricing that stays with you all year.
              </p>
              <ul className="rnv-offer-list">
                <li>One included masterclass every month</li>
                <li>Your welcome kit of professional styling essentials when you enroll</li>
                <li>Up to three times a year, swap a month&rsquo;s class for a complimentary Signature Blowout</li>
                <li>A complimentary Birthday Blowout during your birthday month, in addition to that month&rsquo;s class</li>
                <li>Exclusive preferred pricing on retail and custom-ordered styling tools anytime you shop, in class or at your regular appointments</li>
              </ul>
              <div className="rnv-ctas">
                <a className="rnv-btn" href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">
                  Become a founding member
                </a>
                <a className="rnv-btn rnv-btn--ghost" href={SMS_URL}>
                  Questions? Text us
                </a>
              </div>
              <p className="rnv-deadline">
                <DeadlineLine />
              </p>
            </div>
            <aside className="rnv-offer-side" aria-label="Why join now">
              <p className="rnv-plan-label">Why join now</p>
              <ul>
                <li>
                  <strong>Only {FOUNDING_SPOTS} founding spots</strong>
                  <span>
                    Founding enrollment closes {FOUNDING_DEADLINE_LABEL}, or as soon as the first {FOUNDING_SPOTS} members
                    join.
                  </span>
                </li>
                <li>
                  <strong>A rare founding rate</strong>
                  <span>The regular rate is $80 a month after the founding window. Founding members join for $65.</span>
                </li>
                <li>
                  <strong>Limited seats</strong>
                  <span>Every class is capped at six stations, so class seats fill quickly.</span>
                </li>
                <li>
                  <strong>First to book</strong>
                  <span>Founding members are welcomed first as each month&rsquo;s class dates are released.</span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* This month */}
      <section className="rnv-band" id="rnv-class" aria-labelledby="rnv-class-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">{CLASS.month} Classes</p>
          <div className="rnv-feature">
            <div className="rnv-feature-text">
              <p className="rnv-kicker">{CLASS.kicker}</p>
              <h2 id="rnv-class-h" className="rnv-h2">
                {CLASS.title}
              </h2>
              <p className="rnv-feature-desc">{CLASS.desc}</p>
              <ul className="rnv-sessions" aria-label="Sessions">
                {CLASS.sessions.map((s) => (
                  <li key={s.date}>
                    <strong>{s.date}</strong>
                    <span>{s.time}</span>
                  </li>
                ))}
              </ul>
              <p className="rnv-facts">
                <span>6 stations</span>
                <span>2 hours</span>
                <span>{CLASS.price} per guest</span>
              </p>
              <ReserveButtons />
              <p className="rnv-small">
                Members: your class is included. Single-class guests: a $25 non-refundable deposit reserves your seat,
                and the balance is due on arrival. When six seats are filled, the session is full.
              </p>
            </div>
            <Photo img={IMAGES.class} className="rnv-feature-img" />
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="rnv-band rnv-band--paper" aria-labelledby="rnv-inc-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">The Masterclass Experience</p>
          <h2 id="rnv-inc-h" className="rnv-h2">
            Included in every class.
          </h2>
          <ul className="rnv-moments">
            {INCLUDED.map((m) => (
              <li key={m.title}>
                <strong>{m.title}</strong>
                <span>{m.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two ways */}
      <section className="rnv-band" id="rnv-join" aria-labelledby="rnv-join-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">Two Ways to Join</p>
          <h2 id="rnv-join-h" className="rnv-h2">
            Come for one class, or make it a monthly habit.
          </h2>
          <div className="rnv-plans">
            <article className="rnv-plan">
              <p className="rnv-plan-label">Single Class</p>
              <p className="rnv-plan-price">
                $195 <span>per class</span>
              </p>
              <p className="rnv-plan-sub">
                Ideal if you already style your own hair and want supplemental guidance, or want to add our more advanced
                techniques to your repertoire. It also makes a thoughtful gift.
              </p>
              <ul>
                <li>One two-hour, hands-on masterclass</li>
                <li>Your welcome kit of professional styling essentials with every class</li>
                <li>Professional tools and mannequin head provided</li>
                <li>Gourmet refreshments</li>
                <li>Exclusive preferred pricing on retail and custom-ordered styling tools, the day of your class</li>
              </ul>
              <p className="rnv-gift">Giving it as a gift? Gift cards are available and can be used toward any single class.</p>
              <div className="rnv-plan-ctas">
                <a className="rnv-btn" href={SMS_URL}>
                  Text to reserve a seat
                </a>
                <a className="rnv-btn rnv-btn--ghost" href={`${SMS_URL}`}>
                  Ask about gift cards
                </a>
              </div>
            </article>

            <article className="rnv-plan rnv-plan--featured">
              <div className="rnv-plan-top">
                <p className="rnv-plan-label">Founding Membership</p>
                <span className="rnv-tag">Best value · {FOUNDING_SPOTS} spots</span>
              </div>
              <p className="rnv-plan-price">
                $65 <span>per month</span>
              </p>
              <p className="rnv-value">
                Regular rate $80/month after the founding window
              </p>
              <p className="rnv-plan-sub">Elevate your styling routine all year long.</p>
              <ul>
                <li>One included masterclass every month</li>
                <li>Your welcome kit when you enroll</li>
                <li>Up to three times a year, swap a class for a Signature Blowout</li>
                <li>A complimentary Birthday Blowout in your birthday month</li>
                <li>Exclusive preferred pricing on retail and styling tools, anytime you shop</li>
              </ul>
              <div className="rnv-plan-ctas">
                <a className="rnv-btn" href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">
                  Become a founding member
                </a>
              </div>
              <p className="rnv-fine">Founding enrollment closes {FOUNDING_DEADLINE_LABEL} or at {FOUNDING_SPOTS} members.</p>
            </article>
          </div>

          <details className="rnv-terms">
            <summary>Membership details</summary>
            <ul>
              <li>The regular membership rate is $80 per month after the founding window closes. The $65 founding rate is available only to members who enroll during the founding window. Memberships have a three-month minimum.</li>
              <li>Each membership month includes one masterclass. Class dates and times change each month, and seats are reserved based on availability.</li>
              <li>Up to three times a year, a month&rsquo;s class may be swapped for a complimentary Signature Blowout.</li>
              <li>Unused monthly classes and blowouts do not roll over.</li>
              <li>Your Birthday Blowout is enjoyed during your birthday month, in addition to that month&rsquo;s class or swap.</li>
              <li>Your welcome kit is provided once, when you enroll.</li>
              <li>Member preferred pricing applies to retail and custom-ordered styling tools anytime while your membership is active.</li>
              <li>
                Founding Membership enrollment closes {FOUNDING_DEADLINE_LABEL} or when the first {FOUNDING_SPOTS} members
                enroll, whichever comes first.
              </li>
            </ul>
          </details>
        </div>
      </section>

      {/* FAQ */}
      <section className="rnv-band rnv-band--paper" aria-labelledby="rnv-faq-h">
        <div className="rnv-wrap rnv-narrow">
          <p className="rnv-eyebrow">Questions</p>
          <h2 id="rnv-faq-h" className="rnv-h2">
            Hair styling classes, answered.
          </h2>
          <div className="rnv-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* How to reserve */}
      <section className="rnv-band" aria-labelledby="rnv-how-h">
        <div className="rnv-wrap">
          <p className="rnv-eyebrow">Reserving Your Seat</p>
          <h2 id="rnv-how-h" className="rnv-h2">
            Three simple steps.
          </h2>
          <ol className="rnv-steps">
            <li>
              <strong>Choose your session</strong>
              <span>Members, book your included class with our team. Single-class guests, text, call, or email us with the date you&rsquo;d like.</span>
            </li>
            <li>
              <strong>Share your hair</strong>
              <span>Complete a short pre-class survey with a photo of your hair, so your welcome kit and techniques are tailored to your hair. Single-class seats are held with a $25 non-refundable deposit.</span>
            </li>
            <li>
              <strong>Arrive and learn</strong>
              <span>Settle in with a refreshment. Your tools and mannequin head are ready for you, and your welcome kit goes home with you.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Close */}
      <footer className="rnv-close" aria-labelledby="rnv-close-h">
        <div className="rnv-wrap rnv-close-grid">
          <div className="rnv-minw0">
            <p className="rnv-eyebrow">Elevated Artistry. Genuine Hospitality.</p>
            <h2 id="rnv-close-h">Give yourself the gift of effortless holiday hair this season.</h2>
            <p className="rnv-close-lede">
              Only {FOUNDING_SPOTS} founding spots, open through {FOUNDING_DEADLINE_LABEL}. Join for $65 a month before
              the regular $80 rate begins, or reserve a single class. Seats are limited to six per session.
            </p>
            <div className="rnv-ctas rnv-ctas--light">
              <a className="rnv-btn" href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">
                Become a founding member
              </a>
              <a className="rnv-btn rnv-btn--ghost" href={SMS_URL}>
                Text to reserve a class
              </a>
            </div>
          </div>
          <div className="rnv-minw0">
            <p className="rnv-eyebrow">Reach Our Team</p>
            <dl className="rnv-hours">
              <div>
                <dt>Text or call</dt>
                <dd>
                  <a href={TEL_URL}>{PHONE_DISPLAY}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt>Replies</dt>
                <dd>Tuesday – Saturday</dd>
              </div>
            </dl>
          </div>
        </div>
      </footer>

      <div className="rnv-bar">
        <a className="rnv-btn" href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">
          Join · $65/mo
        </a>
        <a className="rnv-btn rnv-btn--ghost" href={SMS_URL}>
          Text us
        </a>
      </div>
    </main>
  )
}

const MEMB_CSS = String.raw`
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500&display=swap");
/* Layout: an invitation card. The pain point, this month's class, what's included, then single class vs. membership. */
.rnv-memb{
  --cream:#F5F1EB; --paper:#EDE7DE; --card:#FBF8F3; --line:#E2D9CD; --ink:#1F1B17; --text:#4A423B; --muted:#7A6E62;
  --taupe:#7B5E45; --taupe-deep:#5E4634; --night:#1C1815; --nightText:#EDE6DC;
  --display:"Playfair Display", Georgia, "Times New Roman", serif;
  --body:"Jost", "Helvetica Neue", Arial, sans-serif;
  display:block;width:100%;background:var(--cream);color:var(--text);font-family:var(--body);font-size:16px;line-height:1.7;-webkit-font-smoothing:antialiased;text-align:left
}
.rnv-memb *{box-sizing:border-box}
.rnv-memb h1,.rnv-memb h2,.rnv-memb h3{font-family:var(--display);font-weight:400;color:var(--ink);margin:0;text-wrap:balance;letter-spacing:0}
.rnv-memb p{margin:0}
.rnv-memb figure{margin:0}
.rnv-memb .rnv-wrap{max-width:1040px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
.rnv-memb .rnv-narrow{max-width:760px}
.rnv-memb .rnv-flush{padding:0;margin:0}
.rnv-memb .rnv-minw0{min-width:0}
.rnv-memb .rnv-eyebrow{font-family:var(--display);font-style:italic;font-size:.82rem;letter-spacing:.3em;text-transform:uppercase;color:var(--taupe)}
.rnv-memb .rnv-h2{font-size:clamp(1.7rem,4.4vw,2.5rem);line-height:1.2;margin-top:10px}
.rnv-memb .rnv-intro{margin-top:14px;max-width:60ch;font-size:1.05rem}

/* Hero */
.rnv-memb .rnv-hero{padding-block:72px 64px;display:grid;gap:36px;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.rnv-memb .rnv-hero--img{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center;gap:56px}}
.rnv-memb .rnv-hero-text{display:grid;gap:20px;min-width:0}
.rnv-memb .rnv-hero h1{font-size:clamp(2.4rem,7vw,4.2rem);line-height:1.06;max-width:14ch}
.rnv-memb .rnv-lede{font-size:1.15rem;max-width:52ch}
.rnv-memb .rnv-lede em{font-family:var(--display);font-style:italic;color:var(--ink)}
.rnv-memb .rnv-hero-links{display:flex;flex-wrap:wrap;gap:14px 28px;margin-top:6px}
.rnv-memb .rnv-hero-img{aspect-ratio:4/5;max-height:600px;max-width:100%;overflow:hidden;background:var(--paper)}
.rnv-memb .rnv-img{width:100%;height:100%;object-fit:cover;display:block}

/* Bands and prose */
.rnv-memb .rnv-band{padding-block:64px}
.rnv-memb .rnv-band--paper{background:var(--paper)}
.rnv-memb .rnv-prose{display:grid;gap:18px;margin-top:22px;font-size:1.06rem;max-width:62ch}
.rnv-memb .rnv-pull{font-family:var(--display);font-style:italic;font-size:clamp(1.35rem,3.4vw,1.75rem);line-height:1.35;color:var(--ink);border-left:2px solid var(--taupe);padding-left:18px;margin-top:6px}

/* Retreat moments */
.rnv-memb .rnv-wide-img{margin-top:28px;aspect-ratio:16/8;max-width:100%;overflow:hidden;background:var(--cream)}
.rnv-memb .rnv-moments{list-style:none;margin:30px 0 0;padding:0;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.rnv-memb .rnv-moments li{background:var(--card);border:1px solid var(--line);padding:22px;display:grid;gap:8px;align-content:start}
.rnv-memb .rnv-moments strong{font-family:var(--display);font-weight:400;font-size:1.2rem;line-height:1.3;color:var(--ink)}
.rnv-memb .rnv-moments span{font-size:.96rem}

/* Story chapters */
.rnv-memb .rnv-chapter + .rnv-chapter{margin-top:0}
.rnv-memb .rnv-quiet{font-family:var(--display);font-style:italic;font-size:clamp(1.2rem,3vw,1.5rem);line-height:1.4;color:var(--ink);margin-top:26px;max-width:40ch}

/* Collective */
.rnv-memb .rnv-split{display:grid;gap:36px;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.rnv-memb .rnv-split:has(.rnv-team-img){grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:center;gap:56px}}
.rnv-memb .rnv-team-img{aspect-ratio:4/5;max-height:560px;max-width:100%;overflow:hidden;background:var(--paper)}

/* Beliefs */
.rnv-memb .rnv-beliefs{display:grid;gap:0 40px;margin-top:28px;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))}
.rnv-memb .rnv-beliefs article{padding:22px 0;border-top:1px solid #D4C8B9;display:grid;gap:8px;align-content:start}
.rnv-memb .rnv-beliefs h3{font-size:1.3rem;line-height:1.3}

/* Buttons and links */
.rnv-memb .rnv-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
.rnv-memb .rnv-btn{display:inline-flex;align-items:center;justify-content:center;font-family:var(--body);font-weight:500;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;padding:16px 26px;border:1px solid var(--taupe);background:var(--taupe);color:#FBF8F3;transition:background .2s}
.rnv-memb .rnv-btn:hover{background:var(--taupe-deep)}
.rnv-memb .rnv-btn--ghost{background:transparent;color:var(--ink);border-color:var(--ink)}
.rnv-memb .rnv-btn--ghost:hover{background:var(--ink);color:#FBF8F3}
.rnv-memb .rnv-ctas--light .rnv-btn{background:#FBF8F3;color:var(--night);border-color:#FBF8F3}
.rnv-memb .rnv-ctas--light .rnv-btn:hover{background:#E9DFD2}
.rnv-memb .rnv-ctas--light .rnv-btn--ghost{background:transparent;color:#FBF8F3}
.rnv-memb .rnv-ctas--light .rnv-btn--ghost:hover{background:#FBF8F3;color:var(--night)}
.rnv-memb .rnv-link{font-family:var(--body);font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);padding-bottom:3px}
.rnv-memb .rnv-link:hover{color:var(--taupe);border-color:var(--taupe)}

/* Close */
.rnv-memb .rnv-close{background:var(--night);color:var(--nightText);padding-block:64px 72px}
.rnv-memb .rnv-close h2{color:#FBF8F3;font-size:clamp(1.9rem,5vw,2.8rem);line-height:1.15;margin-top:12px}
.rnv-memb .rnv-close .rnv-eyebrow{color:#C9B49C}
.rnv-memb .rnv-close-grid{display:grid;gap:40px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));align-items:start}
.rnv-memb .rnv-close-lede{margin-top:16px;max-width:46ch}
.rnv-memb .rnv-close-note{margin-top:18px;font-size:.92rem}
.rnv-memb .rnv-close-note a{color:#FBF8F3;text-underline-offset:3px}
.rnv-memb .rnv-hours{margin:16px 0 0;display:grid}
.rnv-memb .rnv-hours > div{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;padding:10px 0;border-bottom:1px solid rgba(201,180,156,.3)}
.rnv-memb .rnv-hours dt{font-weight:500}
.rnv-memb .rnv-hours dd{margin:0;opacity:.85}

/* Mobile booking bar */
.rnv-memb .rnv-bar{display:none}
@media (max-width:759px){
  .rnv-memb{padding-bottom:76px}
  .rnv-memb .rnv-bar{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:50;gap:10px;padding:10px max(16px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:rgba(251,248,243,.97);border-top:1px solid var(--line)}
  .rnv-memb .rnv-bar .rnv-btn{flex:1;padding:14px 12px;letter-spacing:.12em;font-size:.76rem}
  .rnv-memb .rnv-bar .rnv-btn--ghost{flex:0 0 auto;background:#fff}
  .rnv-memb .rnv-btn{letter-spacing:.12em;font-size:.76rem;padding:15px 18px}
}
.rnv-memb a:focus-visible{outline:2px solid var(--taupe);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.rnv-memb *{transition:none!important}}

/* Membership page additions */
.rnv-memb .rnv-small{font-size:.86rem;color:var(--muted);max-width:60ch}
.rnv-memb .rnv-hero-links .rnv-btn{border-bottom-width:1px}
.rnv-memb .rnv-kicker{font-family:var(--display);font-style:italic;font-size:1.15rem;color:var(--taupe)}
.rnv-memb .rnv-feature{display:grid;gap:36px;grid-template-columns:minmax(0,1fr);margin-top:18px;background:var(--card);border:1px solid var(--line);padding:clamp(22px,4vw,44px)}
@media (min-width:900px){.rnv-memb .rnv-feature:has(.rnv-feature-img){grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);align-items:center}}
.rnv-memb .rnv-feature-text{display:grid;gap:16px;min-width:0}
.rnv-memb .rnv-feature-text .rnv-h2{margin-top:0}
.rnv-memb .rnv-feature-desc{font-size:1.05rem;max-width:58ch}
.rnv-memb .rnv-feature-img{aspect-ratio:4/5;max-height:520px;max-width:100%;overflow:hidden;background:var(--paper)}
.rnv-memb .rnv-sessions{list-style:none;margin:6px 0 0;padding:0;display:grid}
.rnv-memb .rnv-sessions li{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;padding:12px 0;border-bottom:1px solid var(--line)}
.rnv-memb .rnv-sessions li:first-child{border-top:1px solid var(--line)}
.rnv-memb .rnv-sessions strong{font-family:var(--display);font-weight:400;font-size:1.15rem;color:var(--ink)}
.rnv-memb .rnv-sessions span{font-variant-numeric:tabular-nums}
.rnv-memb .rnv-facts{display:flex;flex-wrap:wrap;gap:8px}
.rnv-memb .rnv-facts span{font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ink);border:1px solid var(--line);padding:7px 12px;background:var(--cream)}
.rnv-memb .rnv-feature .rnv-ctas{margin-top:4px}
.rnv-memb .rnv-plans{display:grid;gap:16px;margin-top:28px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));align-items:stretch}
.rnv-memb .rnv-plan{background:var(--card);border:1px solid var(--line);padding:28px;display:flex;flex-direction:column;gap:14px;min-width:0}
.rnv-memb .rnv-plan--featured{background:var(--night);border-color:var(--night);color:var(--nightText)}
.rnv-memb .rnv-plan-top{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:space-between}
.rnv-memb .rnv-plan-label{font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:var(--taupe)}
.rnv-memb .rnv-plan--featured .rnv-plan-label{color:#C9B49C}
.rnv-memb .rnv-tag{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(201,180,156,.6);color:#E9DFD2;padding:4px 9px}
.rnv-memb .rnv-plan-price{font-family:var(--display);font-size:2.6rem;line-height:1;color:var(--ink)}
.rnv-memb .rnv-plan-price span{font-family:var(--body);font-size:.9rem;color:var(--muted)}
.rnv-memb .rnv-plan--featured .rnv-plan-price{color:#FBF8F3}
.rnv-memb .rnv-plan--featured .rnv-plan-price span{color:#C9B49C}
.rnv-memb .rnv-plan-sub{font-family:var(--display);font-style:italic;font-size:1.05rem}
.rnv-memb .rnv-plan--featured .rnv-plan-sub{color:#FBF8F3}
.rnv-memb .rnv-plan ul{margin:0;padding:0;list-style:none;display:grid;gap:0;flex:1;align-content:start}
.rnv-memb .rnv-plan li{padding:10px 0 10px 22px;border-top:1px solid var(--line);position:relative;font-size:.96rem}
.rnv-memb .rnv-plan--featured li{border-color:rgba(201,180,156,.28)}
.rnv-memb .rnv-plan li::before{content:"";position:absolute;left:2px;top:19px;width:8px;height:8px;border-radius:50%;background:var(--taupe)}
.rnv-memb .rnv-plan--featured li::before{background:#C9B49C}
.rnv-memb .rnv-plan > .rnv-btn{align-self:flex-start}
.rnv-memb .rnv-plan-ctas{display:flex;flex-wrap:wrap;gap:10px}
.rnv-memb .rnv-plan--featured .rnv-btn{background:#FBF8F3;color:var(--night);border-color:#FBF8F3}
.rnv-memb .rnv-plan--featured .rnv-btn:hover{background:#E9DFD2}
.rnv-memb .rnv-plan--featured .rnv-btn--ghost{background:transparent;color:#FBF8F3}
.rnv-memb .rnv-plan--featured .rnv-btn--ghost:hover{background:#FBF8F3;color:var(--night)}
.rnv-memb .rnv-fine{font-size:.82rem;opacity:.8}
.rnv-memb .rnv-steps{list-style:none;margin:28px 0 0;padding:0;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));counter-reset:step}
.rnv-memb .rnv-steps li{background:var(--card);border:1px solid var(--line);padding:22px;display:grid;gap:8px;align-content:start;counter-increment:step}
.rnv-memb .rnv-steps li::before{content:"0" counter(step);font-family:var(--display);font-size:1.5rem;color:var(--taupe);line-height:1}
.rnv-memb .rnv-steps strong{font-family:var(--display);font-weight:400;font-size:1.2rem;color:var(--ink)}
.rnv-memb .rnv-hours a{color:#FBF8F3;text-underline-offset:3px;word-break:break-all}

/* Founding offer */
.rnv-memb .rnv-badge{justify-self:start;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;background:var(--ink);color:#FBF8F3;padding:8px 14px}
.rnv-memb .rnv-offer{display:grid;gap:0;grid-template-columns:minmax(0,1fr);border:1px solid var(--line);background:var(--card)}
@media (min-width:900px){.rnv-memb .rnv-offer{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)}}
.rnv-memb .rnv-offer-main{padding:clamp(24px,4vw,44px);display:grid;gap:18px;min-width:0;align-content:start}
.rnv-memb .rnv-offer-main .rnv-h2{margin-top:0}
.rnv-memb .rnv-anchor{display:flex;flex-wrap:wrap;gap:12px 40px;align-items:flex-end;padding:18px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.rnv-memb .rnv-anchor > div{display:grid;gap:4px}
.rnv-memb .rnv-anchor-label{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.rnv-memb .rnv-anchor s{font-family:var(--display);font-size:1.8rem;color:var(--muted);text-decoration-thickness:1px}
.rnv-memb .rnv-anchor strong{font-family:var(--display);font-weight:400;font-size:3rem;line-height:1;color:var(--ink)}
.rnv-memb .rnv-anchor strong span{font-family:var(--body);font-size:.95rem;color:var(--muted)}
.rnv-memb .rnv-offer-note{font-family:var(--display);font-style:italic;font-size:1.1rem;color:var(--ink)}
.rnv-memb .rnv-offer-list{list-style:none;margin:0;padding:0;display:grid}
.rnv-memb .rnv-offer-list li{position:relative;padding:10px 0 10px 24px;border-top:1px solid var(--line)}
.rnv-memb .rnv-offer-list li::before{content:"";position:absolute;left:2px;top:19px;width:8px;height:8px;border-radius:50%;background:var(--taupe)}
.rnv-memb .rnv-offer .rnv-ctas{margin-top:4px}
.rnv-memb .rnv-deadline{font-size:.88rem;color:var(--taupe-deep);font-weight:500}
.rnv-memb .rnv-offer-side{background:var(--night);color:var(--nightText);padding:clamp(24px,4vw,40px);display:grid;gap:16px;align-content:start;min-width:0}
.rnv-memb .rnv-offer-side .rnv-plan-label{color:#C9B49C}
.rnv-memb .rnv-offer-side ul{list-style:none;margin:0;padding:0;display:grid}
.rnv-memb .rnv-offer-side li{display:grid;gap:4px;padding:14px 0;border-top:1px solid rgba(201,180,156,.28)}
.rnv-memb .rnv-offer-side strong{font-family:var(--display);font-weight:400;font-size:1.2rem;color:#FBF8F3}
.rnv-memb .rnv-offer-side span{font-size:.94rem}
.rnv-memb .rnv-terms{margin-top:24px;border-top:1px solid var(--line);padding-top:16px;max-width:760px}
.rnv-memb .rnv-terms summary{cursor:pointer;color:var(--ink);font-weight:500}
.rnv-memb .rnv-terms ul{margin:12px 0 0;padding-left:18px;display:grid;gap:6px;font-size:.94rem}
.rnv-memb .rnv-terms summary:focus-visible{outline:2px solid var(--taupe);outline-offset:3px}
.rnv-memb .rnv-gift{font-family:var(--display);font-style:italic;font-size:1rem;color:var(--taupe-deep)}
.rnv-memb .rnv-faq{margin-top:22px;display:grid}
.rnv-memb .rnv-faq details{border-top:1px solid #D4C8B9;padding:16px 0}
.rnv-memb .rnv-faq details:last-child{border-bottom:1px solid #D4C8B9}
.rnv-memb .rnv-faq summary{cursor:pointer;font-family:var(--display);font-size:1.15rem;color:var(--ink);list-style-position:outside}
.rnv-memb .rnv-faq summary:focus-visible{outline:2px solid var(--taupe);outline-offset:3px}
.rnv-memb .rnv-faq p{margin-top:10px;max-width:62ch}
.rnv-memb .rnv-value{font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;color:#C9B49C;margin-top:-6px}
.rnv-memb .rnv-value s{text-decoration-thickness:1px}
`
