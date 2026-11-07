import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

type Href = { href: string; label: string; className?: string };

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-ink">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className = "",
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <h2
      className={`font-display text-[clamp(2.1rem,5.2vw,3.4rem)] font-extrabold leading-[0.95] tracking-[-0.03em] ${
        tone === "light" ? "text-cream" : "text-ink"
      } ${className}`}
    >
      {children}
      <span className="text-orange">.</span>
    </h2>
  );
}

export function CircleArrow({
  tone = "light",
  size = "md",
}: {
  tone?: "light" | "dark" | "orange";
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "size-8" : "size-9";
  const tones = {
    light: "bg-cream text-ink",
    dark: "bg-ink text-cream",
    orange: "bg-orange text-ink",
  } as const;

  return (
    <span
      className={`grid ${dim} shrink-0 place-items-center rounded-full ${tones[tone]}`}
    >
      <ArrowUpRight className="size-4" strokeWidth={2.2} />
    </span>
  );
}

export function PrimaryLink({ href, label }: Href) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-full bg-orange py-2 pl-6 pr-2 text-sm font-bold text-ink shadow-[0_10px_30px_-10px] shadow-orange/60 transition-transform duration-300 hover:-translate-y-0.5"
    >
      {label}
      <span className="grid size-8 place-items-center rounded-full bg-ink text-cream transition-colors duration-300 group-hover:bg-ink-panel">
        <ArrowUpRight className="size-4" strokeWidth={2.2} aria-hidden="true" />
      </span>
    </Link>
  );
}

export function GhostLink({ href, label }: Href) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange"
    >
      {label}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

/**
 * The CV lives in /public, so this is a plain anchor with `download`: no
 * router navigation, and the browser saves the file with a sensible name.
 */
export function CvLink({ href, label = "Download CV" }: Omit<Href, "label"> & { label?: string }) {
  return (
    <a
      href={href}
      download
      className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange"
    >
      <Download
        className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
        aria-hidden="true"
      />
      {label}
    </a>
  );
}
