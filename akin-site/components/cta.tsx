import { ArrowUpRight, Download, Mail } from "lucide-react";
import { ContactForm } from "./contact-form";
import { contact, profile } from "@/lib/content";
import { Reveal } from "./reveal";

/**
 * Two audiences, two doors. The orange card is the one a hiring manager needs:
 * what is on offer, when you can start, a CV and a direct email. The form on the
 * right is for people buying a project, with the budget bands a freelancer needs
 * and an employer should never be asked for.
 */
export function Cta() {
  return (
    <section id="contact" className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.02fr] lg:items-stretch">
        {/* Every colour pairing here is inked on orange on purpose: white on
            #ff5821 is 3.15:1 and fails AA at these sizes, ink is 5.35:1. */}
        <Reveal className="h-full">
          <div className="flex h-full flex-col justify-between rounded-[24px] bg-orange px-7 py-8 sm:px-9 sm:py-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                {contact.eyebrow}
              </p>
              <h2 className="mt-3 max-w-[17ch] font-display text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink">
                {contact.headline}
              </h2>
              <p className="mt-4 max-w-[42ch] text-[13px] leading-relaxed text-ink/80">
                {contact.body}
              </p>
            </div>

            <div className="mt-8">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  "Front-end role",
                )}`}
                className="group inline-flex w-full items-center justify-between gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
              >
                {contact.cta}
                <span className="grid size-9 place-items-center rounded-full bg-orange text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" strokeWidth={2.4} aria-hidden="true" />
                </span>
              </a>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  <Mail className="size-3.5" aria-hidden="true" />
                  {profile.email}
                </a>
                <a
                  href={profile.cv}
                  download
                  className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  Download CV
                </a>
              </div>

              <p className="mt-4 text-[11px] font-medium text-ink">
                {contact.note}
              </p>

              <p className="mt-5 border-t border-ink/20 pt-4 text-[11.5px] font-medium text-ink/75">
                {contact.clientLine}{" "}
                <a
                  href="#contact-form"
                  className="font-bold text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {contact.clientCta}
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="h-full">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
