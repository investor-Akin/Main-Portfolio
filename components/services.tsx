import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading, SectionLabel } from "./ui";

export function Services() {
  return (
    <section id="services" className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24">
      <Reveal>
        <div className="rounded-[28px] bg-ink-panel px-6 py-9 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Services</SectionLabel>
              <SectionHeading tone="light" className="mt-3">
                What I Do
              </SectionHeading>
            </div>

            <div className="flex max-w-xs items-end gap-4">
              <p className="text-[13px] leading-relaxed text-cream/50">
                The interface, the build and the API behind it, kept simple
                enough to hand over.
              </p>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/70">
                <ArrowUpRight className="size-4" strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex flex-col rounded-2xl bg-ink-card p-5 transition-transform duration-400 hover:-translate-y-1"
                >
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${
                      service.inverted
                        ? "bg-cream text-orange-ink"
                        : "bg-orange text-ink"
                    }`}
                  >
                    <Icon className="size-[18px]" strokeWidth={1.8} />
                  </span>

                  <h3 className="mt-5 text-[15px] font-semibold text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-cream/65">
                    {service.body}
                  </p>

                  <a
                    href="/#contact"
                    aria-label={`Enquire about ${service.title}`}
                    className="mt-7 grid size-9 place-items-center self-end rounded-full bg-cream text-ink transition-colors duration-300 group-hover:bg-orange group-hover:text-ink"
                  >
                    <ArrowUpRight className="size-4" strokeWidth={2.2} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
