import { about, profile } from "@/lib/content";
import { Reveal } from "./reveal";
import { CvLink, SectionHeading, SectionLabel } from "./ui";

/**
 * The hiring section: who you are, what you build, what you are looking for.
 * Runs after the work rather than before it, so the claims arrive after the
 * proof. The facts column is a definition list because that is what it is.
 */
export function About() {
  return (
    <section id="about" className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <Reveal>
          <div>
            <SectionLabel>{about.eyebrow}</SectionLabel>
            <SectionHeading className="mt-3 max-w-[14ch]">
              {about.heading}
            </SectionHeading>

            <dl className="mt-8">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-0.5 border-t border-ink/10 py-2.5 last:border-b sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-ink">
                    {fact.label}
                  </dt>
                  <dd className="text-[12.5px] font-medium text-ink/80 sm:text-right">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CvLink href={profile.cv} />
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-semibold text-ink transition-colors hover:text-orange"
              >
                Email me
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="justify-prose max-w-[58ch] space-y-4">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-[15.5px] leading-relaxed text-ink/85"
                    : "text-[13.5px] leading-relaxed text-muted"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
