import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal, profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this portfolio collects, what it does not, and how to have your details removed.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="This site is a portfolio. It does not have an account system, a newsletter or a database of visitors, and it does not sell anything."
      updated={legal.updated}
    >
      <section>
        <h2>What I collect</h2>
        <p className="mt-2">
          Nothing is stored on this site when you use the contact form. The form
          only formats what you typed and hands it to WhatsApp or your email app,
          which then send it to me directly. I receive your name, email address
          and message, and I use them only to reply about your project.
        </p>
      </section>

      <section>
        <h2>Analytics</h2>
        <p className="mt-2">
          I use Vercel Analytics to see how many people visit and which pages
          they read. It reports aggregate numbers, does not use cookies, does not
          build a profile of you and does not track you across other sites.
        </p>
      </section>

      <section>
        <h2>Hosting</h2>
        <p className="mt-2">
          The site is hosted by Vercel, which keeps standard server logs
          (IP address, browser, requested page) to run and protect the service.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <ul>
          <li>
            Ask me to delete any message or email you have sent, and I will.
          </li>
          <li>
            Block analytics with any content blocker. The site works exactly the
            same without it.
          </li>
          <li>
            You can use the site without contacting me at all. Nothing is
            required.
          </li>
        </ul>
      </section>

      <section>
        <h2>Who is responsible</h2>
        <p className="mt-2">
          {profile.name}, based in {profile.location}. Email{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a> for anything
          related to this page.
        </p>
      </section>
    </LegalPage>
  );
}
