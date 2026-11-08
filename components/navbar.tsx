"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  // Solid bar once the page moves.
  //
  // The reading-progress hairline is NOT tracked here: it is animated by GSAP
  // in components/scroll-effects.tsx. Driving it from React state re-rendered
  // the whole navbar on every scroll tick, and React would then re-apply the
  // inline transform, which is both wasteful and fights the animation.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.hash.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("header")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-cream shadow-[0_18px_40px_-30px_rgba(30,29,27,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-[74px] md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Wordmark */}
        <a href="/#home" className="group flex items-baseline gap-2.5 md:justify-self-start">
          <span className="font-display text-[22px] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[24px]">
            {profile.brand}
            <span className="text-orange">.</span>
          </span>
          <span className="hidden text-[9.5px] font-semibold uppercase leading-none tracking-[0.2em] text-ink/65 transition-colors group-hover:text-ink sm:block">
            Portfolio
          </span>
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((link) => {
            const isActive = active === link.hash;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative py-2 text-[13px] font-medium transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-ink/65 hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:justify-self-end">
          <a
            href="/#contact"
            className="group hidden items-center gap-3 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-[13px] font-medium text-cream shadow-[0_14px_30px_-18px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-0.5 sm:flex"
          >
            Let&apos;s Talk
            <span className="grid size-8 place-items-center rounded-full bg-orange text-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-ink/12 text-ink transition-colors hover:border-ink/25 hover:bg-ink/[0.04] md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Reading progress hairline */}
      <div
        aria-hidden="true"
        className={`h-[2px] w-full overflow-hidden transition-colors duration-300 ${
          scrolled ? "bg-ink/10" : "bg-ink/[0.05]"
        }`}
      >
        <div
          data-progress-bar
          className="scroll-progress h-full origin-left bg-orange"
        />
      </div>

      {/* Mobile panel */}
      {/* Mobile panel. `inert` while closed keeps the four links out of the tab
          order; opacity alone leaves them focusable and invisible. */}
      <div
        id="mobile-menu"
        data-open={open}
        inert={!open}
        className="pointer-events-none absolute inset-x-0 top-full origin-top border-b border-ink/10 bg-cream px-5 pb-6 pt-1 opacity-0 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((link, i) => {
            const isActive = active === link.hash;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-4 border-b border-ink/8 py-3.5 last:border-0"
              >
                <span
                  className={`text-[10px] font-semibold tabular-nums tracking-[0.1em] ${
                    isActive ? "text-orange-ink" : "text-ink/55"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-[19px] font-bold tracking-[-0.02em] transition-colors ${
                    isActive ? "text-ink" : "text-ink/70 group-hover:text-ink"
                  }`}
                >
                  {link.label}
                </span>
                <ArrowUpRight
                  className={`ml-auto size-4 transition-all duration-300 ${
                    isActive
                      ? "text-orange opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-40"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <a
          href="/#contact"
          onClick={() => setOpen(false)}
          className="mt-5 flex items-center justify-between rounded-full bg-ink py-2 pl-5 pr-2 text-sm font-medium text-cream"
        >
          Let&apos;s Talk
          <span className="grid size-9 place-items-center rounded-full bg-orange text-ink">
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </span>
        </a>
      </div>
    </header>
  );
}
