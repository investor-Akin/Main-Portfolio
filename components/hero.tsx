import Image from "next/image";
import { hero, profile } from "@/lib/content";
import { Reveal } from "./reveal";
import { CvLink, GhostLink, PrimaryLink } from "./ui";

function SquiggleArrow() {
  return (
    <svg
      viewBox="0 0 40 32"
      aria-hidden="true"
      className="absolute -right-4 -top-4 size-8 rotate-6 text-orange"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 24c6-1 11-5 14-10 2-4 2-8 1-10" />
      <path d="M13 5l6-2 3 6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10">
          <Reveal>
            <span className="relative inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-white/60 py-2 pl-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/70 backdrop-blur">
              <span className="size-1.5 rounded-full bg-orange" />
              {hero.eyebrow}
              <SquiggleArrow />
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6.4vw,4.35rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              {hero.headline[0]}
              <br />
              <span className="text-orange">{hero.headline[1]}</span>{" "}
              {hero.headline[2]}
              <span className="text-orange">.</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              {hero.bio}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <PrimaryLink href={hero.primaryCta.href} label={hero.primaryCta.label} />
              <GhostLink href={hero.secondaryCta.href} label={hero.secondaryCta.label} />
              <CvLink href={profile.cv} />
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={120}
          className="relative mx-auto w-full max-w-[330px] sm:max-w-[400px] lg:max-w-[460px]"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-2 -top-3 aspect-square w-[95%] rounded-full bg-orange sm:-right-4 sm:-top-5"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-full ring-[8px] ring-cream sm:ring-[10px]">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 460px"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-2 left-0 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] sm:bottom-2">
              <span className="font-display text-2xl font-extrabold leading-none text-orange">
                {hero.badge.value}
              </span>
              <span className="max-w-[92px] text-[10px] font-medium leading-tight text-ink/60">
                {hero.badge.label}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
