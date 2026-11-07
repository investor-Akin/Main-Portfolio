import { stats } from "@/lib/content";
import { Reveal } from "./reveal";

/**
 * A spec strip, not a counter strip. The old version showed "100+ projects,
 * 50+ clients" with nothing behind either number, which invites exactly the
 * check a hiring manager runs. These four lines are all verifiable from the
 * page itself or a five-minute conversation.
 */
export function Stats() {
  return (
    <section aria-label="At a glance" className="mx-auto mt-14 max-w-6xl px-5 sm:mt-16">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col bg-cream-warm px-5 py-6"
            >
              <span
                className="h-1 w-6 rounded-full bg-orange"
                aria-hidden="true"
              />
              <p className="mt-3 font-display text-[17px] font-extrabold leading-tight tracking-[-0.01em] text-ink">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-medium text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
