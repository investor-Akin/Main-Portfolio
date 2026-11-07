import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal, profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms that apply to using this portfolio site and the work shown on it.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="Plain terms for a simple site. Read them before you copy anything from it."
      updated={legal.updated}
    >
      <section>
        <h2>The work shown here</h2>
        <p className="mt-2">
          The designs, screenshots, writing and code on this site belong to{" "}
          {profile.name} unless stated otherwise. Client projects shown here
          remain the property of those clients and are published with their
          permission.
        </p>
      </section>

      <section>
        <h2>What you may do</h2>
        <ul>
          <li>Read, link to and quote short extracts with credit.</li>
          <li>Share the links with anyone who might need this work.</li>
        </ul>
      </section>

      <section>
        <h2>What you may not do</h2>
        <ul>
          <li>
            Copy the design, layout or code and present it as your own or as the
            work of another business.
          </li>
          <li>Use the name, portrait or work of a client shown here.</li>
        </ul>
      </section>

      <section>
        <h2>Quotes and bookings</h2>
        <p className="mt-2">
          Nothing on this site is a binding offer. A project starts only when a
          written scope and deposit have been agreed by both sides, and that
          agreement replaces anything written here.
        </p>
      </section>

      <section>
        <h2>No warranty</h2>
        <p className="mt-2">
          The site is provided as it is. It may change, and external links may
          stop working. It is not legal, financial or professional advice.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p className="mt-2">
          These terms are governed by the laws of the Federal Republic of
          Nigeria, and any dispute would be handled by the courts of{" "}
          {profile.location}.
        </p>
      </section>
    </LegalPage>
  );
}
