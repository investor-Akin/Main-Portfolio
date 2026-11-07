import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { profile } from "@/lib/content";

type Props = {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
};

/** Shared frame for the privacy and terms pages. */
export function LegalPage({ title, intro, updated, children }: Props) {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-5 pb-8 pt-28 sm:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink/65 transition-colors hover:text-orange-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to portfolio
        </Link>

        <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          {title}
          <span className="text-orange">.</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{intro}</p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
          Last updated {updated}
        </p>

        <div className="mt-10 space-y-8 border-t border-ink/10 pt-8 [&_a]:font-medium [&_a]:text-orange-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_li]:text-[15px] [&_li]:leading-relaxed [&_li]:text-ink/80 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-ink/80 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>

        <p className="mt-10 rounded-2xl bg-cream-warm p-5 text-[13px] leading-relaxed text-ink/80">
          Questions about any of this? Email{" "}
          <a
            href={`mailto:${profile.email}`}
            className="font-medium text-orange-ink underline underline-offset-4"
          >
            {profile.email}
          </a>{" "}
          or message me on{" "}
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-orange-ink underline underline-offset-4"
          >
            WhatsApp
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
