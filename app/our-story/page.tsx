import type { Metadata } from "next"
import { Navigation, Footer, PhotoFill } from "@/components/site-shared"
import { IMAGES } from "@/lib/site-images"

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The philosophy behind Renovaré — a grounded, retreat style salon collective in Fairfax, VA where expert artistry meets a calm, welcoming space to simply be yourself.",
}

export default function OurStoryPage() {
  return (
    <main className="bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-36 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="editorial-eyebrow text-xs text-primary mb-6">Our Story</p>
          <h1 className="font-serif uppercase text-4xl sm:text-5xl lg:text-7xl text-foreground leading-[0.95] tracking-tight text-balance">
            An oasis for <span className="italic text-primary">renewal</span>
          </h1>
        </div>
      </section>

      {/* Threshold / sensory story */}
      <section className="px-6 lg:px-12 pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="photo-live relative aspect-[16/10] lg:aspect-[16/8] overflow-hidden">
            <PhotoFill
              photo={{ kind: "real", src: IMAGES.storyStephRelaxation, alt: "Steph seated at the relaxation table at Renovaré" }}
              priority
              sizes="(min-width: 1024px) 72rem, 100vw"
            />
          </div>

          <div className="max-w-2xl mx-auto mt-16 lg:mt-20 space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              The door closes behind you and the noise of the day stays outside. Warm light. The low hum of
              a dryer. A trace of something clean and green in the air.
            </p>
            <p>
              Someone knows your name. There is nowhere else you need to be. For the next while, the chair is
              yours — and the space is curated to your needs.
            </p>
            <p>
              This is what we mean by renewal. Not a performance. A pause.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy — grounded elegance, all are welcome */}
      <section className="px-6 lg:px-12 py-20 lg:py-28 bg-secondary">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="editorial-eyebrow text-xs text-primary mb-5">The Philosophy</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground leading-tight text-balance mb-6">
              All are welcome
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Renovaré is an oasis — a place for serious, skilled hair artistry that never asks you to be
                anything other than yourself.
              </p>
              <p>
                You will find artists who are highly skilled and passionate at what they do working at a
                comfortable pace, in a room where you can decompress in your own way and just be. Come as you
                are. Leave feeling like yourself again — now with your dream hair.
              </p>
            </div>
          </div>
          <div className="photo-live relative aspect-[4/5] overflow-hidden">
            <PhotoFill
              photo={{ kind: "real", src: IMAGES.storyRelaxationTable, alt: "Relaxation table with greenery and coloring books at Renovaré" }}
              sizes="(min-width: 1024px) 36rem, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Founder's note — caring for women, postpartum inspiration, handled with dignity */}
      <section className="px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 photo-live relative aspect-[4/5] overflow-hidden">
            <PhotoFill
              photo={{ kind: "real", src: IMAGES.storyColorBar, alt: "The color bar and styling table at Renovaré" }}
              sizes="(min-width: 1024px) 36rem, 100vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="editorial-eyebrow text-xs text-primary mb-5">A Note From Our Founder</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground leading-tight text-balance mb-6">
              Built for the woman who has little time for herself
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Renovaré grew out of a tender season. After having children, our founder moved through
                challenges and the quiet difficulty of returning to work — and to herself.
              </p>
              <p>
                She learned how much an hour of genuine care can hold. How sitting in a chair and being
                looked after can steady a person on a hard day.
              </p>
              <p>
                So we built a place with that in mind — especially for women learning to make room for
                themselves again. Here, that care is offered without judgment, and without a fuss.
              </p>
              <p className="text-foreground/80">
                And it is for everyone. Women, men — anyone who needs a moment to recharge is welcome in this
                salon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 lg:px-12 pb-28 lg:pb-40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground leading-snug text-balance">
            This is your pause, your space, your renewal.
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We would love to have you. Whenever you are ready, the chair is here.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
