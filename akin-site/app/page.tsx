import { Cta } from "@/components/cta";
import { About } from "@/components/about";
import { Availability } from "@/components/availability";
import { Certifications } from "@/components/certifications";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Stack } from "@/components/stack";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { profile, services, siteUrl } from "@/lib/content";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      email: `mailto:${profile.email}`,
      telephone: profile.phoneHref,
      url: siteUrl,
      image: `${siteUrl}/akin.jpg`,
      address: { "@type": "PostalAddress", addressLocality: profile.location },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: `${profile.name} — ${profile.role}`,
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      email: profile.email,
      telephone: profile.phoneHref,
      priceRange: "₦₦",
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressLocality: profile.location },
      founder: { "@id": `${siteUrl}/#person` },
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.body },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} — ${profile.role}`,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static structured data built from lib/content.ts, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Availability />
        <Services />
        <Stack />
        <Projects />
        <About />
        <Stats />
        <Certifications />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
