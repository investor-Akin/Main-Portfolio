import { availability } from "@/lib/content";
import { Reveal } from "./reveal";

/**
 * The fact strip under the hero: where he is, what time it is there, what he is
 * open to and how long he has been doing it. These are the four questions a
 * recruiter answers before reading anything else, so they come first and stay
 * short. No numbers that cannot be defended.
 */
export function Availability() {
  return (
    <section
      aria-label="Availability"
      className="mx-auto mt-14 max-w-6xl px-5 sm:mt-20"
    >
      <Reveal>
        <dl className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {availability.map((item) => (
            <div key={item.label} className="bg-cream-warm px-5 py-4">
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-ink">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-[13.5px] font-semibold leading-snug text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
