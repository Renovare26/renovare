"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Phone, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation, Footer, IMAGES, InstagramIcon, PhotoFill, type Photo } from "@/components/site-shared"
import { ContactForm } from "@/components/contact-form"

// Hero Section — image fully visible, framed and feathered into the page
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen bg-background overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Text column */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pb-16 pt-8 lg:pt-32 lg:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="editorial-eyebrow text-xs text-primary mb-6"
          >
            Fairfax, VA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="font-serif uppercase text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[0.95] tracking-tight"
          >
            Renovaré
            <br />
            <span className="editorial-accent text-primary">Salon</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="font-serif italic text-xl lg:text-2xl text-muted-foreground mt-6"
          >
            a retreat style salon collective
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="editorial-eyebrow text-xs text-foreground mt-8"
          >
            Elevated Artistry, Genuine Hospitality
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <Link
              href="/reservations"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors group"
            >
              Reserve Your Experience
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#services"
              className="text-xs tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Image column — fully visible, never cropped, edges feathered into background */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center px-6 pt-28 pb-6 lg:p-12">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-md lg:max-w-none aspect-[2/3] lg:h-[82vh] lg:aspect-auto"
          >
            <Image
              src={IMAGES.hairshow}
              alt="Beautiful platinum blonde hair styled at Renovaré Salon"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain fade-edges"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Editorial About Section
function EditorialAbout() {
  return (
    <section id="about" className="py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-foreground leading-tight max-w-5xl">
            A refined, retreat style salon collective for those who value{" "}
            <span className="italic text-primary">artistry</span> and{" "}
            <span className="italic text-primary">genuine care</span>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <Image
                src={IMAGES.relaxationTableWide}
                alt="The relaxation and color table at Renovaré, set with books, colored pencils and greenery"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover fade-edges hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-6 rounded-2xl">
              <p className="font-serif text-5xl">20+</p>
              <p className="text-sm mt-1">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">Our Philosophy</p>
            <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
              Renovaré comes from the Latin word meaning to renew, restore, and revive.
            </h3>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                That meaning lives at the core of everything we do. We are not a high volume salon. We are a retreat style salon collective built around intention, presence, and care.
              </p>
              <p>
                Every element of your experience—from advanced blonding and color artistry to pacing, environment, and amenities—is thoughtfully curated to feel seamless and restorative.
              </p>
              <p>
                Here, you&apos;re invited to slow down, settle in, and trust the process.
              </p>
            </div>
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Experience</p>
                <p className="font-serif text-xl text-foreground mt-1">20+ Years</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Recognized</p>
                <p className="font-serif text-xl text-foreground mt-1">Virginia Living</p>
              </div>
              {/*
                NOTE ON CLAIMS (accuracy):
                - Certifications such as ABCH (American Board Certified Hair Colorist) belong on
                  INDIVIDUAL stylist profiles only — they are not a blanket team claim.
                - "Featured in Nova Magazine" was intentionally removed (referenced a prior salon/team).
              */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Experience Grid
function ExperienceGrid() {
  const features = [
    { title: "Shiatsu Massage Chairs", desc: "Reclining massage shampoo chairs that cradle you while our signature scalp and neck massage melts away tension" },
    { title: "Weighted Blankets", desc: "Lavender scented eye pillows so you can decompress, or nap, during your shampoo" },
    { title: "Heated Neck Wraps", desc: "Softly scented with lavender or eucalyptus, offered throughout your service" },
    { title: "Gourmet Refreshments", desc: "Curated beverages and snacks to savor at any point in your visit" },
    { title: "Creative Mind at Ease", desc: "Elegant coloring books for adults and hand painting smooth Renovaré Rocks" },
    { title: "Tech Friendly Lounge", desc: "Quiet space if you prefer to work remotely during your appointment" },
  ]

  return (
    <section id="experience" className="py-24 lg:py-40 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="editorial-eyebrow text-xs text-primary mb-4">The Renovaré Experience</p>
          {/* Heading intentionally in the gold/brown accent for subtle variation */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mb-6 max-w-4xl mx-auto text-balance leading-tight">
            Where expert artistry and intentional amenities create an experience as restorative as its results.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden relative">
              <Image
                src={IMAGES.stephRelaxation}
                alt="The Renovaré relaxation experience"
                fill
                className="object-cover fade-edges"
              />
            </div>
          </motion.div>

          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-colors duration-300 flex flex-col justify-center"
            >
              <span className="text-xs tracking-[0.2em] text-primary">0{index + 1}</span>
              <h3 className="font-serif text-xl text-foreground mt-4 mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {features.slice(2).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-colors duration-300"
            >
              <span className="text-xs tracking-[0.2em] text-primary">0{index + 3}</span>
              <h3 className="font-serif text-xl text-foreground mt-4 mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Studio detail triptych — the real relaxation + coloring table */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            {
              src: IMAGES.relaxationTable,
              alt: "The relaxation table at Renovaré, set with olive greenery, books and coloring pencils",
              className: "col-span-2 lg:col-span-1 aspect-[4/3] lg:aspect-[3/4]",
            },
            {
              src: IMAGES.coloringPencils,
              alt: "Coloring pencils and coloring books for adults laid out on the Renovaré table",
              className: "col-span-1 aspect-[3/4]",
            },
            {
              src: IMAGES.relaxationTableDetail,
              alt: "The Renovaré table beside the shelved O&M color line",
              className: "col-span-1 aspect-[3/4]",
            },
          ].map((shot, index) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`photo-live relative overflow-hidden ${shot.className}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover fade-edges"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// Gallery Grid
function GallerySection() {
  // Transformations = real client work by the Renovaré team.
  // Spans are arranged so every row fills the 4-column grid completely.
  // To add more work, append entries keeping each row's col-spans summing to 4.
  const images: { photo: Photo; span: string }[] = [
    { photo: { kind: "real", src: IMAGES.workCaramelBalayage, alt: "Caramel balayage on brunette hair by Renovaré" }, span: "col-span-2 row-span-2" },
    { photo: { kind: "real", src: IMAGES.workBrondeWaves, alt: "Lived-in bronde blonde waves by Renovaré" }, span: "col-span-1 row-span-1" },
    { photo: { kind: "real", src: IMAGES.workCopperWaves, alt: "Copper and strawberry blonde waves by Renovaré" }, span: "col-span-1 row-span-1" },
    { photo: { kind: "real", src: IMAGES.workSunkissedBlonde, alt: "Sun-kissed beachy blonde by Renovaré" }, span: "col-span-1 row-span-1" },
    { photo: { kind: "real", src: IMAGES.workPrecisionCut, alt: "Long layered precision cut by Renovaré" }, span: "col-span-1 row-span-1" },

    { photo: { kind: "real", src: IMAGES.workBrunetteWaves, alt: "Rich brunette waves by Renovaré" }, span: "col-span-2 row-span-1" },
    { photo: { kind: "real", src: IMAGES.workSilverBlendBob, alt: "Bob with silver and gray blending by Renovaré" }, span: "col-span-1 row-span-1" },
    { photo: { kind: "real", src: IMAGES.workBalayageDetail, alt: "Dimensional balayage color by Renovaré" }, span: "col-span-1 row-span-1" },

    { photo: { kind: "real", src: IMAGES.workBrunetteWaves2, alt: "Deep brunette waves by Renovaré" }, span: "col-span-4 row-span-1" },

    { photo: { kind: "real", src: IMAGES.workBlasiaBronde, alt: "Curly bronde styling by Renovaré" }, span: "col-span-2 row-span-1" },
    { photo: { kind: "real", src: IMAGES.workBrunetteResult, alt: "Finished brunette waves by Renovaré" }, span: "col-span-2 row-span-1" },
  ]

  return (
    <section id="gallery" className="py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="editorial-eyebrow text-xs text-primary mb-4">Transformations</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-foreground text-balance max-w-4xl mx-auto leading-tight">
            This is your pause, your space, your renewal.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`photo-live relative overflow-hidden group ${image.span}`}
            >
              <PhotoFill photo={image.photo} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
              href="https://instagram.com/renovarefairfax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
              <span className="text-sm tracking-wider uppercase">Follow @renovarefairfax</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Artist Tiers
function ArtistTiers() {
  const tiers = [
    {
      name: "Initiate",
      description: "Licensed artists refining their craft through advanced mentorship while delivering beautiful foundational results.",
    },
    {
      name: "Signature",
      description: "Experienced artists known for polished, consistent work and thoughtful guest care.",
    },
    {
      name: "Artisan",
      description: "Advanced artists specializing in customized color, precision cutting, and elevated transformations.",
    },
    {
      name: "Founder",
      description: "Stephanie personally provides appointments for guests seeking highly customized transformations, advanced color work, and her signature approach to consultation and artistry. Availability is limited.",
    },
  ]

  return (
    <section className="py-24 lg:py-40 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Artist Tiers</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">
            Our Curated Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every artist is rigorously trained to deliver exceptional results with the Renovaré Standard—advanced technical skill, intentional consultation, and emotional presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-colors"
            >
              <span className="text-xs tracking-[0.2em] text-primary">TIER {index + 1}</span>
              <h3 className="font-serif text-xl text-foreground mt-4 mb-3">{tier.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Reviews — real, owner-approved Google reviews in a horizontal scrolling carousel.
// To pin a different "must-lead" review first, move it to the top of REVIEWS.
const REVIEWS: { name: string; text: string }[] = [
  {
    name: "Samantha Corvino",
    text: "This salon is a next level hair and self care experience. It's the most client centric atmosphere I've seen in a very long time with hair artists that take such amazing pride and excitement in making visions a reality. They will make sure to share very realistic and SAFE options, putting the hair's integrity and longevity first and foremost. I've been on a blonde journey for about a year and Allie has been a key success in my incredible outcome. We kept a progressive and steady expectation with our final big push yesterday. It didn't go quite as initially expected and here's where Allie was a rockstar — she kept a focus on the goal and was communicating through the entire process. Most stylists would just accept the B+ results but not Allie!! She was honest and explained how it might take a little longer but to trust the process… and we landed at an A+ with lots of laughs and positivity during what could have been a stressful and frustrating color correction! I am so grateful she was by my side and advocating for my best hair possible!! Thank you to the entire team for supporting an uplifting and calm environment while providing a transformative experience!!!",
  },
  {
    name: "Rebecca Storey",
    text: "Stephanie is hands down the best hairstylist I've ever had the pleasure of working with! I don't even need to explain exactly what I want—she just gets it. I give her a general idea, and she always manages to make it even better than I imagined. I trust her completely, as well as her entire team and the salon itself. Not to mention, she's an inspiring businesswoman and owner, setting an example for all of us to aspire to! If you haven't experienced it yet, do yourself a favor and book an appointment now!",
  },
  {
    name: "Minori Carmichael",
    text: "Allie helped me transition from constantly covering my gray—when it became too difficult to maintain—to a beautifully blended, natural look. The way she uses color and toner is incredible; I honestly cannot tell where my gray ends and my highlights begin. My hair is shiny, healthy, and in the best condition it has ever been. The salon itself is extremely relaxing, and I genuinely look forward to my visits. It is a calm, enjoyable space where I love spending my time. The entire salon team goes above and beyond to provide the absolute best experience for their clients.",
  },
  {
    name: "Kelly Vandersluis Morgan",
    text: "I've followed the owner, Stephanie, to every salon she's worked in. It's a pleasure to see her vision come alive at Renovaré! The salon is always such a positive place, with a friendly staff who care so much. I've gotten compliments on my color for years, and I can't say enough good about Stephanie's artistry. I wouldn't trust anyone else to do my hair.",
  },
  {
    name: "1979afg",
    text: "First time visiting Renovaré Salon after following my amazing stylist Allie there—and wow, what a treat! Stephanie's salon is truly a breath of fresh air. It felt less like a typical salon visit and more like a mini spa escape. They've thought of all the little things that make the experience special—from coloring on smooth rocks while listening to great music, to being offered mimosas (even though I don't drink!) and other beverages. There's even a comfortable space to work from with a charger unit if you need it. But the relaxation perks really take it to another level: a compression blanket, heated neck pad, and even a soothing compression eye cover while your hair is being washed and toned. It was incredibly calming and never felt rushed. Add in some fun girl talk and bonding, and the whole experience felt like the perfect mix of pampering and friendship. Such a zen vibe from start to finish. I'm already looking forward to my next appointment!",
  },
  {
    name: "Cassandra B.",
    text: "A truly transformative experience! I had the absolute pleasure of visiting Renovaré for a balayage, shampoo, and styling session with Stephanie, and it was easily one of the best salon experiences I've ever had. From the moment I walked in, I felt like I had stepped into a peaceful retreat. The salon's serene, self care focused atmosphere is something truly special—nothing like the hustle and bustle of a typical salon. My highlights from a different salon were previously brassy and harsh, but Stephanie worked her magic to transform them into a cool, classy look that I'm absolutely in love with. One of the standout touches was the shampoo experience: lavender infused eye masks and a weighted blanket made it feel more like a spa than a salon. The relaxing vibe continued with unique touches like being able to color or paint rocks while my hair processed—such a fun and grounding way to pass the time. The entire Renovaré staff was warm, friendly, and incredibly attentive. I truly felt at home—only without the stress of everyday life. I wouldn't change a single thing about my visit. I drove an hour and a half from Baltimore to get here, and I would do it again in a heartbeat. If you're in the DMV area and want more than just a hair appointment—if you want an experience—I highly recommend Renovaré.",
  },
  {
    name: "Sarah Heeter",
    text: "10/10 color every single time. I don't know why I bother bringing inspo pics because Stephanie always knows better. I'd trust her with my hair any day!",
  },
  {
    name: "Brenna Pearson",
    text: "One doesn't just go to the same hairstylist for eight years because they are OK. I've been going to see Stephanie for the last eight years because how fantastic she is with my hair, a great person to talk to, and prioritizes my wants and health of my hair. She has built something truly amazing with her new salon and getting to see her vision come to life.",
  },
  {
    name: "Eileen G.",
    text: "The salon is absolutely adorable and so relaxing! They really go above and beyond with little luxury touches, I was offered a warm neck pillow and a mimosa when I sat down, and they even have weighted blankets and eye pillows during the wash. I followed Allie here, and she is simply the best! Her attention to detail is unmatched, she always nails my blonde and knows exactly what I'm going for every time. Couldn't recommend her or this salon more!",
  },
  {
    name: "Bethany Blackwell",
    text: "I cannot recommend Renovaré Salon in Fairfax enough! Stephanie and her team are simply the best. Stephanie is so great with my blonde—she nails the color every time. The studio is adorable and located right in the heart of Fairfax. It is such a relaxing place to go and spend time getting pampered. Highly recommend!",
  },
]

function ReviewsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: -1 | 1) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector<HTMLElement>("[data-review-card]")
    const amount = card ? card.offsetWidth + 24 : scroller.clientWidth * 0.8
    scroller.scrollBy({ left: amount * direction, behavior: "smooth" })
  }

  return (
    <section id="reviews" className="py-24 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <p className="editorial-eyebrow text-xs text-primary mb-4">Guest Reviews</p>
            <h2 className="font-serif text-4xl lg:text-6xl text-foreground text-balance">Kind Words</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous reviews"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next reviews"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 lg:px-12 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* left gutter to align first card with the max-w container on wide screens */}
        <div aria-hidden className="shrink-0 w-0 lg:w-[max(0px,calc((100vw-80rem)/2))]" />
        {REVIEWS.map((review) => (
          <article
            key={review.name}
            data-review-card
            className="snap-start shrink-0 w-[85vw] sm:w-[420px] bg-card rounded-2xl p-8 lg:p-10 flex flex-col"
          >
            <span aria-hidden className="font-serif text-5xl text-primary/25 leading-none mb-4">
              &ldquo;
            </span>
            <p className="text-foreground/85 leading-relaxed text-[15px] flex-1 overflow-y-auto max-h-[19rem] pr-1 [scrollbar-width:thin]">
              {review.text}
            </p>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-serif text-lg text-foreground">{review.name}</p>
              <p className="text-xs tracking-wider uppercase text-muted-foreground mt-1">Google Review</p>
            </div>
          </article>
        ))}
        <div aria-hidden className="shrink-0 w-6 lg:w-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-sm text-muted-foreground mt-4">Swipe or scroll to read more →</p>
      </div>
    </section>
  )
}

// Contact Section
function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-40 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">Get In Touch</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-8">
              Request Your Renovaré Experience
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Ready to experience the Renovaré difference? Complete the form to request your appointment. 
              We&apos;ll be in touch within 24 to 48 hours to confirm.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground">10650 Main St, Suite 201<br />Fairfax, VA 22030</p>
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
                    Thu - Fri: 11am - 8pm<br />
                    Saturday: 10am - 6pm<br />
                    Sun - Wed: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background p-8 lg:p-12 rounded-2xl"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Brand-Story Teaser — brief, sensory invitation linking to Our Story
function BrandStoryTeaser() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="editorial-eyebrow text-xs text-primary mb-6">Welcome to Renovaré</p>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground leading-snug text-balance">
            Step in, and the noise of the day melts away. Soft light, a warm greeting, the quiet hum of
            artistry at work. This is a place to exhale.
          </p>
          <Link
            href="/our-story"
            className="mt-10 inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            Read Our Story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Experience / Credentials callout — accurate accolades only
function CredentialsCallout() {
  // OPTIONAL, owner to confirm: set to true to show the NYFW backstage line.
  const SHOW_NYFW = false

  return (
    <section className="py-24 lg:py-40 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="editorial-eyebrow text-xs text-primary mb-4">Experience & Recognition</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight mb-8 text-balance">
              <span className="text-primary">20+ years</span> of hands on artistry.
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Two decades of color and cutting experience inform every service — a depth of skill you can
                feel from the first consultation to the final mirror.
              </p>
              <p>
                Named one of the{" "}
                <span className="text-foreground font-medium">Best Salons in Northern Virginia</span> by{" "}
                <span className="text-foreground font-medium">Virginia Living Magazine</span>, ranked #3.
              </p>
              {SHOW_NYFW && (
                <p>Backstage experience at New York Fashion Week informs our editorial approach.</p>
              )}
            </div>
            {/*
              ACCURACY NOTE:
              - Virginia Living recognition was a magazine LISTING (ranked #3) — no fabricated quotes/article copy.
              - Individual certifications (e.g. ABCH) live on stylist profiles only, never as a team-wide claim.
            */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {/* Award badge slot — swap for the official Virginia Living seal if provided */}
            <div className="relative w-56 h-56 lg:w-72 lg:h-72">
              <Image
                src="/images/virginia-living-badge.png"
                alt="Best Salons in Northern Virginia, ranked #3, by Virginia Living Magazine"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Membership Feature Block — prominent, elegant, links to Membership page
function MembershipFeature() {
  const perks = ["On demand styling tutorials", "Learn at your own pace", "Optional Hands On lessons"]

  return (
    <section className="py-24 lg:py-40 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <p className="editorial-eyebrow text-xs text-primary-foreground/70">The Styling Edit</p>
              <span className="inline-flex items-center rounded-full border border-primary-foreground/30 px-3 py-1 text-[0.65rem] tracking-[0.25em] uppercase text-primary-foreground/80">
                Coming Soon
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-6xl leading-tight mb-6 text-balance">
              Recreate your look at home.
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md mb-8">
              An online library of DIY styling tutorials that teaches you to restyle your salon look
              between visits — with optional hands on lessons at the salon.{" "}
              <span className="text-primary-foreground">Launching soon.</span>
            </p>
            <Link
              href="/membership"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-foreground text-primary text-xs tracking-[0.25em] uppercase hover:bg-primary-foreground/90 transition-colors group"
            >
              Preview Membership
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {perks.map((perk, i) => (
              <li
                key={perk}
                className="flex items-center gap-4 border-b border-primary-foreground/20 pb-5"
              >
                <span className="font-serif text-2xl text-primary-foreground/50">0{i + 1}</span>
                <span className="font-serif text-xl lg:text-2xl">{perk}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

// Instagram Feed — handle only, links out to the live @renovarefairfax grid
function InstagramFeed() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="editorial-eyebrow text-xs text-primary mb-4">Follow Along</p>
          <a
            href="https://instagram.com/renovarefairfax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-serif text-3xl lg:text-5xl text-foreground hover:text-primary transition-colors"
          >
            <InstagramIcon className="w-7 h-7 lg:w-9 lg:h-9" />
            @renovarefairfax
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page
export default function RenovareHome() {
  return (
    <main className="bg-background">
      <Navigation />
      <Hero />
      {/* 1) Brand-story teaser */}
      <BrandStoryTeaser />
      <EditorialAbout />
      {/* 2) The Renovaré Experience (accent heading) + amenities */}
      <ExperienceGrid />
      {/* 3) Experience / credentials callout */}
      <CredentialsCallout />
      {/* 4) Transformations gallery */}
      <GallerySection />
      <ArtistTiers />
      {/* 5) Membership feature */}
      <MembershipFeature />
      {/* 6) Reviews carousel */}
      <ReviewsCarousel />
      {/* 7) Instagram feed (near footer) */}
      <InstagramFeed />
      <Contact />
      <Footer />
    </main>
  )
}
