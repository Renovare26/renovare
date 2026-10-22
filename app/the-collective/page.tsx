import type { Metadata } from "next"
import { Navigation, Footer, PhotoPlaceholder, PhotoFill } from "@/components/site-shared"
import { IMAGES } from "@/lib/site-images"

export const metadata: Metadata = {
  title: "The Collective",
  description:
    "Meet The Collective — a small, deliberate team of artists behind Renovaré in Fairfax, Virginia, because sometimes less is more. Each stylist brings their own specialties and certifications.",
}

/**
 * Team data — easy to edit.
 * - status "active": renders a full profile (headshot placeholder, bio, certifications).
 * - status "soon":   renders a clearly-labeled empty slot for a member being added.
 *
 * CERTIFICATIONS ACCURACY:
 * List certifications PER PERSON only. Never copy one artist's credentials onto another.
 * Where a real credential isn't confirmed yet, a clearly-labeled placeholder is shown so
 * the owner can drop in the accurate ones later (e.g. "ABCH — American Board Certified
 * Hair Colorist" for the specific artists who actually hold it).
 */
type Member = {
  status: "active" | "soon"
  name: string
  role: string
  bio?: string
  certifications?: string[]
  headshotCaption: string
  // When a real headshot is available, set this to its path (see IMAGES). Otherwise a
  // clearly-labeled placeholder is shown.
  headshot?: string
}

const members: Member[] = [
  {
    status: "active",
    name: "Stephanie",
    role: "Founder & Artist",
    bio: `Stephanie is the visionary behind Renovaré Salon, a retreat style concept born from two decades of behind the chair mastery, a degree in Sociology from George Mason University, and a calling to raise the standard in beauty culture. Known for her signature blend of high performance color correction, blonding, personalized transformation, and leadership, she built Renovaré to feel like a sanctuary, with standards. Her career has taken her backstage at New York Fashion Week, and in 2013 she became an American Board Certified Haircolorist, alongside multiple additional advanced certifications. Her ability to read people, solve problems, and deliver both beautiful hair and genuine connection has cultivated a fiercely loyal guest following — whether you're in her chair or a guest of another team member, you'll experience her care.

Most importantly, Stephanie is a mother to two young children, a role that has profoundly influenced both the evolution of Renovaré and the way she thinks about caring for people. Motherhood continually inspires her ideas for an environment where guests feel genuinely cared for and Artists can build meaningful careers without sacrificing the parts of life that matter most. Outside the salon her creativity rarely switches off: a lifelong lover of arts and crafts, she especially enjoys drawing charcoal portraits, being outdoors with her family, and — perhaps slightly less consistent with the whole "sanctuary" thing — scary movies.`,
    certifications: [
      "ABCH — American Board Certified Haircolorist (2013)",
      "B.A. Sociology, George Mason University",
      "Advanced color & correction certifications",
    ],
    headshotCaption: "REAL PORTRAIT — STEPHANIE, FOUNDER — from @renovarefairfax",
    headshot: IMAGES.alliePortrait,
  },
  {
    status: "active",
    name: "Allie",
    role: "Salon Manager & Renovaré Artisan",
    bio: `With over a decade behind the chair (licensed since 2011), Allie is known for her artistry in balayage, blonding, and lived in dimensional color — looks that turn heads in the moment and grow out seamlessly for months. Her approach is detail oriented yet creative, delivering effortless, low maintenance beauty that feels as good as it looks.

As both a Renovaré Artisan and Salon Manager, she brings that same thoughtful attention to the experience beyond her chair, supporting the team, upholding Renovaré's standards, and helping create the calm, collaborative environment guests feel throughout the salon. Fluent in English and Spanish, Allie makes every guest feel at ease; for her, beautiful hair is never one size fits all. Outside the salon she's a proud dog mom to two doodles and finds joy in her family and gardening — embodying Renovaré's philosophy: hair curated with excellence, heart, and intention.`,
    certifications: [
      "Licensed since 2011",
      "Balayage, blonding & dimensional color",
      "Bilingual — English & Spanish",
    ],
    headshotCaption: "REAL PORTRAIT — ALLIE — from @renovarefairfax",
    headshot: IMAGES.founderPortrait,
  },
  {
    status: "active",
    name: "Emily",
    role: "Salon Assistant & Emerging Initiate Artist",
    bio: `Emily brings a creative spirit, genuine curiosity, and an eagerness to grow to the Renovaré collective. As our Salon Assistant and Emerging Initiate Artist, she works alongside our experienced artists while refining her craft and building the foundation for her own career behind the chair. She is especially drawn to the versatility of hair artistry, with a growing passion for color in all its forms, styling, and extensions — excited to learn, experiment, and discover where her strengths take her rather than limiting herself to one specialty early on.

Warm, artistic, and always ready to learn, Emily fits naturally into Renovaré's elevated approach to both artistry and hospitality. Her creativity extends well beyond hair: she loves to color, has never met a good bedazzling opportunity she didn't appreciate, and can happily discuss reality TV while working on her next project. As she progresses through her education and hands on development, guests will have the chance to watch an emerging artist find her voice and grow into the thoughtful, well rounded Artist she is working to become.`,
    headshotCaption: "REAL PORTRAIT — EMILY — from @renovarefairfax",
    headshot: IMAGES.emilyPortrait,
  },
  {
    status: "active",
    name: "Annika",
    role: "Engagement Coordinator & Social Media Specialist",
    bio: `As Renovaré Salon's Engagement Coordinator and Social Media Specialist, Annika curates the stories, connections, and behind the scenes artistry that bring our salon culture to life. She is passionate about celebrating our Artists and fostering an inviting space where every guest feels seen and valued. Drawing from her background in natural cosmetic formulation and product design, she brings an intuitive appreciation for clean wellness, ingredient integrity, and mindful self care to our community.

Her role extends beyond what guests see online. Annika thoughtfully connects the many details of the Renovaré experience — from the way our story is shared to the ways our community is welcomed, engaged, and kept connected. With a natural eye for creativity and a people first approach, she helps ensure the warmth and intention guests feel within our collective are reflected across every touchpoint of the brand.`,
    certifications: [
      "Natural cosmetic formulation",
      "Product design",
    ],
    headshotCaption: "REAL PORTRAIT — ANNIKA — from @renovarefairfax",
    headshot: IMAGES.annikaPortrait,
  },
]

function ActiveCard({ member }: { member: Member }) {
  return (
    <article className="flex flex-col">
      <div className="photo-live relative aspect-[3/4] overflow-hidden">
        {member.headshot ? (
          <PhotoFill
            photo={{ kind: "real", src: member.headshot, alt: `${member.name}, ${member.role} at Renovaré` }}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ) : (
          <PhotoPlaceholder caption={member.headshotCaption} />
        )}
      </div>
      <h2 className="font-serif text-2xl text-foreground mt-6">{member.name}</h2>
      <p className="editorial-eyebrow text-[11px] text-primary mt-2">{member.role}</p>
      {member.bio && (
        <div className="mt-4 space-y-3">
          {member.bio.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {member.certifications && member.certifications.length > 0 && (
        <div className="mt-6 pt-5 border-t border-border">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Certifications</p>
          <ul className="flex flex-wrap gap-2">
            {member.certifications.map((cert) => (
              <li
                key={cert}
                className="text-[11px] tracking-wide text-foreground bg-secondary px-3 py-1.5 rounded-full"
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

function SoonCard({ member }: { member: Member }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden border border-dashed border-border">
        <PhotoPlaceholder caption={member.headshotCaption} />
      </div>
      <h2 className="font-serif text-2xl text-muted-foreground mt-6 text-balance">{member.name}</h2>
      <p className="editorial-eyebrow text-[11px] text-primary mt-2">{member.role}</p>
      <p className="text-sm text-muted-foreground/70 italic leading-relaxed mt-4">
        Bio and certifications coming soon.
      </p>
    </article>
  )
}

export default function TheCollectivePage() {
  return (
    <main className="bg-background">
      <Navigation />

      <section className="pt-36 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="editorial-eyebrow text-xs text-primary mb-6">The Collective</p>
          <h1 className="font-serif uppercase text-4xl sm:text-5xl lg:text-7xl text-foreground leading-[0.95] tracking-tight text-balance">
…because sometimes less is <span className="italic text-primary">more</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            A small, deliberate team of artists — each with their own specialties and credentials, each
            committed to hair health and an unhurried guest experience.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="photo-live relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7] overflow-hidden">
            <PhotoFill
              photo={{ kind: "real", src: IMAGES.teamGroup, alt: "The Renovaré collective — the team together in Fairfax, Virginia" }}
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-36">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {members.map((member, i) =>
            member.status === "active" ? (
              <ActiveCard key={i} member={member} />
            ) : (
              <SoonCard key={i} member={member} />
            ),
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
