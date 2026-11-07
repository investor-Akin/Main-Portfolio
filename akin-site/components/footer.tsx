import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { navLinks, profile, services, socials } from "@/lib/content";

const socialIcons: Record<string, typeof Twitter> = {
  X: Twitter,
  Twitter: Twitter,
  Instagram: Instagram,
  LinkedIn: Linkedin,
  GitHub: Github,
};

/** Always-present contact channels, so the row is never empty. */
const channels = [
  { label: "Chat on WhatsApp", href: profile.whatsapp, icon: MessageCircle, external: true },
  { label: `Email ${profile.email}`, href: `mailto:${profile.email}`, icon: Mail, external: false },
  { label: `Call ${profile.phone}`, href: `tel:${profile.phoneHref}`, icon: Phone, external: false },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-ink px-5 pb-8 pt-14 text-cream sm:mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-[-0.03em]">
              {profile.brand}
              <span className="text-orange">.</span>
            </p>
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-cream/60">
              Building bold websites that make ambitious brands impossible to
              ignore.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.label] ?? Twitter;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-orange hover:bg-orange hover:text-ink"
                  >
                    <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  </a>
                );
              })}
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    aria-label={channel.label}
                    className="grid size-9 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-orange hover:bg-orange hover:text-ink"
                  >
                    <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/55">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-cream/75 transition-colors hover:text-orange-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.cv}
                  download
                  className="text-[13px] text-cream/75 transition-colors hover:text-orange-soft"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/55">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="/#services"
                    className="text-[13px] text-cream/75 transition-colors hover:text-orange-soft"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/55">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-[13px] text-cream/75">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-orange-soft"
                >
                  <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="break-all">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-orange-soft"
                >
                  <MessageCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-orange-soft"
                >
                  <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[11px] text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-cream">
              Terms
            </Link>
            <Link href="/#work" className="transition-colors hover:text-cream">
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
