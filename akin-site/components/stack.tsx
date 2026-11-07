import { stack, stackIntro } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading, SectionLabel } from "./ui";

/**
 * The stack as a build pipeline rather than a logo wall. Four stage cards read
 * left to right, each with the tools used at that point, so a client sees
 * process and a developer sees a stack they can slot into.
 *
 * The card styling sits on an inner div, not on the Reveal element: the reveal
 * animation owns the transform on its own node, so a hover lift there would be
 * overridden by it.
 */
export function Stack() {
  return (
    <section id="stack" className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24">
      <Reveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Tools</SectionLabel>
            <SectionHeading className="mt-3 max-w-[16ch]">
              How a build comes together
            </SectionHeading>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-muted">
            {stackIntro}
          </p>
        </div>
      </Reveal>

      <ol className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, index) => (
          <Reveal key={group.stage} as="li" delay={index * 70} className="h-full">
            <div className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_1px_2px_rgba(30,29,27,0.04)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_14px_30px_-18px_rgba(30,29,27,0.4)]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-semibold text-ink">
                  {group.stage}
                </h3>
                <span className="font-mono text-[11px] font-medium text-orange-ink">
                  0{index + 1}
                </span>
              </div>

              <span
                className="mt-3 h-0.5 w-7 rounded-full bg-orange/70 transition-[width] duration-300 group-hover:w-12"
                aria-hidden="true"
              />

              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                {group.note}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-ink/10 bg-cream px-2.5 py-1 font-mono text-[11px] font-medium text-ink/75"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
