import type { Metadata } from "next";
import "./globals.css";

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
    </html>
  );
}
