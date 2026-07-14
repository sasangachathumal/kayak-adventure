import type { Metadata } from "next";

// ─── Site-wide constants ─────────────────────────────────────────────────────
export const SITE_URL = "https://www.kayakadventure.lk";
export const SITE_NAME = "Kayak Adventure";
export const SITE_LOCALE = "en_US";

export const DEFAULT_SEO: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Titles ──────────────────────────────────────────────────────────────
  title: "KAYAK Adventure",

  // ── Descriptions ────────────────────────────────────────────────────────
  description:
    "Discover guided kayak tours in Sri Lanka's most breathtaking waterways. " +
    "Paddle through serene lagoons, discover hidden mangrove forests, and create " +
    "unforgettable memories with Kayak Adventure Sri Lanka.",

  // ── Keywords ────────────────────────────────────────────────────────────
  keywords: [
    "kayak adventure Sri Lanka",
    "kayaking tours Sri Lanka",
    "water sports Sri Lanka",
    "guided kayak tours",
    "adventure tourism Sri Lanka",
    "mangrove kayaking",
    "lagoon kayaking",
    "nature tours Sri Lanka",
    "kayak holiday Sri Lanka",
    "outdoor adventure Sri Lanka",
  ],

  // ── Authors & Copyright ──────────────────────────────────────────────────
  authors: [{ name: "Kayak Adventure", url: SITE_URL }],
  creator: "Kayak Adventure",
  publisher: "Kayak Adventure",

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Kayak Adventure",
    description:
      "Guided kayak tours through Sri Lanka's most stunning waterways. " +
      "Book your unforgettable paddle adventure today.",
    images: [
      {
        url: "/og-image.png",         // place a 1200×630 image in /public
        width: 1200,
        height: 630,
        alt: "Kayak Adventure",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Kayak Adventure",
    description:
      "Guided kayak tours through Sri Lanka's most stunning waterways.",
    images: ["/og-image.png"],
    // creator: "@yourhandle",   // uncomment when you have a Twitter/X handle
  },

  // ── Robots ───────────────────────────────────────────────────────────────
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

  // ── Canonical & Alternate Languages ──────────────────────────────────────
  alternates: {
    canonical: "/",
    // Add more languages when localised pages exist:
    // languages: { "si": "/si", "ta": "/ta" },
  },

  // ── Search-Engine Verification ───────────────────────────────────────────
  verification: {
    // Fill in from each platform's Search Console / Webmaster tools:
    google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
    // yandex: "REPLACE_WITH_YANDEX_CODE",
    // other: { "msvalidate.01": "REPLACE_WITH_BING_CODE" },
  },

  // ── Misc ─────────────────────────────────────────────────────────────────
  category: "travel",
};

// ─── Helper: build per-page metadata ────────────────────────────────────────
/**
 * Merge custom metadata with site-wide defaults.
 * Pass only the fields you need to override per page.
 *
 * @example
 * // In a page file:
 * export const metadata = buildMetadata({
 *   title: "Book a Tour",
 *   description: "Reserve your kayak experience today.",
 *   alternates: { canonical: "/book" },
 * });
 */
export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    ...DEFAULT_SEO,
    ...overrides,
    openGraph: {
      ...(DEFAULT_SEO.openGraph as object),
      ...(overrides.openGraph ?? {}),
    },
    twitter: {
      ...(DEFAULT_SEO.twitter as object),
      ...(overrides.twitter ?? {}),
    },
    alternates: {
      ...(DEFAULT_SEO.alternates as object),
      ...(overrides.alternates ?? {}),
    },
  };
}

// ─── Structured Data (JSON-LD) helpers ───────────────────────────────────────

/** LocalBusiness schema – render in <head> via <script type="application/ld+json"> */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["TouristAttraction", "LocalBusiness"],
  name: SITE_NAME,
  description:
    "Guided kayak tours through Sri Lanka's most breathtaking waterways, " +
    "lagoons, and mangrove forests.",
  url: SITE_URL,
  telephone: "+94-XX-XXX-XXXX",   // replace with real number
  email: "hello@kayakadventure.lk", // replace with real email
  image: `${SITE_URL}/og-image.png`,
  priceRange: "$$",
  currenciesAccepted: "LKR, USD",
  paymentAccepted: "Cash, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rathgama Lake",
    addressLocality: "Rathgama",
    addressRegion: "Southern Province",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "6.0910",   // Rathgama Lake, Southern Province, Sri Lanka
    longitude: "80.1870",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "06:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/YOUR_PAGE",   // replace
    "https://www.instagram.com/YOUR_PAGE",  // replace
    "https://wa.me/94XXXXXXXXX",            // replace
  ],
};

/** TouristTrip schema – reusable for individual tour pages */
export function buildTourJsonLd({
  name,
  description,
  url,
  image,
  price,
  currency = "LKR",
  duration,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  price: number;
  currency?: string;
  duration: string; // ISO 8601, e.g. "PT3H"
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    url: `${SITE_URL}${url}`,
    image: `${SITE_URL}${image}`,
    touristType: { "@type": "Audience", audienceType: "Adventure Travellers" },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${url}`,
    },
    duration,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
