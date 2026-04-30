import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const CLARITY_PROJECT_ID = "wjr81kwkca";

export const metadata: Metadata = {
  title: "Yash Arya — Full Stack Developer",
  description:
    "Full stack developer building production software end to end. Admin dashboards, smart contracts, ML pipelines, editor tools.",
  openGraph: {
    title: "Yash Arya — Full Stack Developer",
    description:
      "Production React + TypeScript dashboards, Solidity on Polygon, PyTorch on a 3060, VS Code extensions.",
    type: "website",
  },
  metadataBase: new URL("https://yasharya.dev"),
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
      </head>
      <body>{children}</body>
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
      </Script>
    </html>
  );
}
