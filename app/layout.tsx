import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yasharya.dev";
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yash Arya — Full Stack Developer (React, Web3, AI/ML)",
    template: "%s — Yash Arya",
  },
  description:
    "Yash Arya — Full stack developer (React + TypeScript, Solidity on Polygon, PyTorch, VS Code extensions). B.Tech CSE, Bennett University. Frontend Engineering Intern at Pelocal Fintech.",
  applicationName: "Yash Arya — Portfolio",
  authors: [{ name: "Yash Arya", url: SITE_URL }],
  creator: "Yash Arya",
  publisher: "Yash Arya",
  keywords: [
    "Yash Arya",
    "Yash Arya portfolio",
    "Yash Arya developer",
    "Full Stack Developer India",
    "React TypeScript developer",
    "Web3 developer Polygon",
    "Solidity developer",
    "AI ML engineer",
    "VS Code extension developer",
    "Bennett University",
    "Pelocal Fintech",
    "Faridabad developer",
    "New Delhi developer",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Yash Arya — Portfolio",
    title: "Yash Arya — Full Stack Developer (React, Web3, AI/ML)",
    description:
      "Production React + TypeScript dashboards, Solidity on Polygon, PyTorch on a 3060, VS Code extensions.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Yash Arya — Full Stack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Arya — Full Stack Developer",
    description:
      "Production React + TypeScript dashboards, Solidity on Polygon, PyTorch, VS Code extensions.",
    creator: "@yasharyaaa",
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yash Arya",
  url: SITE_URL,
  image: `${SITE_URL}/avatar.jpg`,
  jobTitle: "Full Stack Developer",
  description:
    "Full stack developer building production software end to end — React + TypeScript dashboards, Solidity on Polygon, PyTorch, VS Code extensions.",
  email: "mailto:yasharya2601@gmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bennett University",
  },
  worksFor: {
    "@type": "Organization",
    name: "Pelocal Fintech",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faridabad",
    addressRegion: "Delhi NCR",
    addressCountry: "IN",
  },
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Solidity",
    "Polygon",
    "Smart Contracts",
    "PyTorch",
    "Machine Learning",
    "VS Code Extension API",
    "Node.js",
    "PostgreSQL",
  ],
  sameAs: [
    "https://github.com/yasharyas",
    "https://www.linkedin.com/in/yash--arya/",
    "https://twitter.com/yasharyaaa",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yash Arya — Portfolio",
  url: SITE_URL,
  author: { "@type": "Person", name: "Yash Arya" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
      {CLARITY_PROJECT_ID ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>
      ) : null}
    </html>
  );
}
