import { DEFAULT_SEO, localBusinessJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Permanent_Marker,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

// ─── Fonts ───────────────────────────────────────────────────────────────────

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-logo",
  weight: "400",
  subsets: ["latin"],
});

// ─── Root metadata (inherited by all pages unless overridden) ─────────────────
export const metadata: Metadata = DEFAULT_SEO;

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "scroll-smooth",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        playfairDisplay.variable,
        permanentMarker.variable,
        "font-sans"
      )}
    >
      <head>
        {/* ── JSON-LD Structured Data ─────────────────────────────────────── */}
        <script
          type="application/ld+json"
          // Next.js will HTML-escape this automatically
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
