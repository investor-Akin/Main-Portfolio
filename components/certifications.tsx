import { BadgeCheck } from "lucide-react";
import { certifications } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading, SectionLabel } from "./ui";

/**
 * Certifications, read as a record rather than a badge wall: one row per
 * credential, issuer on the right, the same hairline rhythm as the facts block
 * in About. Only what was issued is listed, no invented course descriptions.
 */
export function Certifications() {
  return (
    <section
      id="certifications"
      className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24"
    >
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Certifications</SectionLabel>
            <SectionHeading className="mt-3 max-w-[16ch]">
              Trained, and certified
            </SectionHeading>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-muted">
            Formal training alongside the degree, in the order it was earned.
          </p>
        </div>
      </Reveal>

      <Reveal delay={70}>
        <ol className="mt-9 overflow-hidden rounded-2xl border border-ink/10 bg-white">
          {certifications.map((cert, index) => (
            <li
              key={`${cert.issuer}-${cert.title}`}
              className="flex flex-col gap-1 border-b border-ink/10 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-0.5 font-mono text-[11px] font-medium text-orange-ink"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[14.5px] font-semibold leading-snug text-ink">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] text-muted">{cert.issuer}</p>
                </div>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-cream-warm px-2.5 py-1 text-[10.5px] font-semibold text-ink/70 sm:self-center">
                <BadgeCheck
                  className="size-3.5 text-orange-ink"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Certified
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
