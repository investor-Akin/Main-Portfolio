import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ScrollEffects } from "@/components/scroll-effects";
import { profile, siteUrl } from "@/lib/content";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Front-end and full-stack developer in Oyo State, Nigeria, working remotely. React, Next.js and TypeScript. Open to front-end, back-end and full-stack roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} — ${profile.role}`,
    title,
    description,
    locale: "en_NG",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f6fbf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        {children}
        <ScrollEffects />
        <Analytics />
      </body>
    </html>
  );
}
