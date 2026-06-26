import type { Metadata } from "next";
// @ts-ignore - CSS import handled by Next.js
import "./globals.css";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#172B36",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dataflow.ai"),
  title: "DataFlow — AI-Driven Data Automation Platform",
  description:
    "Connect, transform, and automate every data pipeline across your stack. DataFlow gives engineering teams AI-powered automation that scales from startup to enterprise.",
  keywords: [
    "data automation",
    "data pipeline",
    "ETL platform",
    "AI data integration",
    "workflow automation",
    "data engineering",
  ],
  authors: [{ name: "DataFlow, Inc." }],
  creator: "DataFlow, Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dataflow.ai",
    siteName: "DataFlow",
    title: "DataFlow — AI-Driven Data Automation Platform",
    description:
      "Connect, transform, and automate every data pipeline. Trusted by 3,000+ engineering teams worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DataFlow — AI-Driven Data Automation Platform hero screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataFlow — AI-Driven Data Automation Platform",
    description:
      "Connect, transform, and automate every data pipeline. Trusted by 3,000+ engineering teams worldwide.",
    images: ["/og-image.png"],
    creator: "@dataflow_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
