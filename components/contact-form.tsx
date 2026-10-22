"use client"

import { useActionState } from "react"
import { submitContact, type ContactState } from "@/app/actions"

const FIELD_CLASS =
  "w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(submitContact, {
    status: "idle",
    message: "",
  })

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm text-foreground mb-2">
            First Name
          </label>
          <input type="text" id="firstName" name="firstName" required className={FIELD_CLASS} placeholder="Jane" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm text-foreground mb-2">
            Last Name
          </label>
          <input type="text" id="lastName" name="lastName" required className={FIELD_CLASS} placeholder="Smith" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-foreground mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={FIELD_CLASS}
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-foreground mb-2">
          Phone
        </label>
        <input type="tel" id="phone" name="phone" required className={FIELD_CLASS} placeholder="(555) 555-5555" />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm text-foreground mb-2">
          Service Interest
        </label>
        <select
          id="service"
          name="service"
          className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">Select a service...</option>
          <option value="balayage">Balayage & Dimensional Color</option>
          <option value="blonding">Blonding & Lightening</option>
          <option value="global">Global Color</option>
          <option value="cut">Precision Cut & Style</option>
          <option value="keratin">Keratin Treatment</option>
          <option value="extensions">Extensions</option>
          <option value="consultation">Consultation Only</option>
        </select>
      </div>

      <div>
        <label htmlFor="artistTier" className="block text-sm text-foreground mb-2">
          Preferred Artist Tier
        </label>
        <select
          id="artistTier"
          name="artistTier"
          className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">No preference — match me with the right Artist</option>
          <option value="initiate">Initiate Artist</option>
          <option value="signature">Signature Artist</option>
          <option value="artisan">Renovaré Artisan</option>
          <option value="founder">Renovaré Founder (Stephanie)</option>
        </select>
        <p className="mt-2 text-xs text-muted-foreground">
          Not sure which tier is right? Leave this on &ldquo;No preference&rdquo; and we&apos;ll guide you.
        </p>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-foreground mb-2">
          Tell Us About Your Hair Goals
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${FIELD_CLASS} resize-none`}
          placeholder="Share any details about the look you're hoping to achieve..."
        />
      </div>

      {state.status !== "idle" && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm leading-relaxed rounded-lg px-4 py-3 ${
            state.status === "success" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || state.status === "success"}
        className="w-full py-4 bg-primary text-primary-foreground rounded-lg text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : state.status === "success" ? "Request Sent" : "Request Appointment"}
      </button>
    </form>
  )
}
