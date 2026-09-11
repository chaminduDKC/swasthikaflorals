/**
 * SEO Configuration for ස්වස්තික Floral Decor (Swasthika Floral Decor)
 * Production-ready: easily update URLs, contact info, and meta descriptions
 * via environment variables or directly in this file.
 */

export const siteConfig = {
  name: "ස්වස්තික Floral Decor",
  englishName: "Swasthika Floral Decor",
  tagline: "Bespoke Wedding & Event Floral Styling",
  description:
    "Exquisite wedding decorations, luxury poruwa florals, settee backs, and event styling in Sri Lanka. Crafting timeless floral art for your unforgettable day.",
  url: "https://swasthikaflorals.vercel.app", // TODO: switch to custom domain when available (.lk or .com) — helps trust + SEO
  phone: "+94767681119", // FIXED: removed stray space, E.164 format — verify this is actually correct, "+9476" read oddly
  phoneDisplay: "+94 76 768 1119", // human-readable version for UI display, separate from schema-safe version above
  whatsapp: "+94705588209",
  email: "swasthikaflorals@gmail.com",
  address: {
    streetAddress: "Swasthika Florals", // TODO: add real street/business address if you have one (even by-appointment helps local SEO)
    city: "Matara",
    region: "Southern Province",
    postalCode: "81000", // TODO: add postal code
    country: "Sri Lanka",
  },
 geo: {
  latitude: "5.94499",
  longitude: "80.54910",
},
  openingHours: "By appointment", // TODO: replace with real hours if you have fixed ones, e.g. "Mo-Sa 09:00-18:00"
  keywords: [
    "Floral Decoration Sri Lanka",
    "වෙඩින් ඩෙකරේශන්",
    "Floral Decoration Matara",
    "Wedding Decoration Sri Lanka",
    "Wedding Decoration Matara",
    "Kandyan Style Wedding",
    "Wedding Flowers Colombo",
    "Poruwa Decor Sri Lanka",
    "Luxury Wedding Florist",
    "Settee Back Floral Arrangement",
    "Bridal Table Decorations",
    "Bridal Bouquet Decorations",
    "Swasthika Floral Decor",
    "ස්වස්තික මල් සැරසිලි",
    "Event Styling Sri Lanka",
  ],
  ogImage: "/og-image.jpg",
  logo: "/logo.png", // TODO: confirm this file actually exists in /public — schema breaks silently if not
  locale: "en_LK", // FIXED: was en_US, but content targets Sri Lanka and mixes Sinhala
  sameAs: [
    "https://www.facebook.com/share/1FASBfNvAB/", // TODO: verify this URL actually resolves — mismatched naming vs Instagram below
    "https://instagram.com/swasthikaflorals",
  ],
};

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.englishName }],
  creator: siteConfig.englishName,
icons: {
  icon: [
    { url: "/logo.png", type: "image/png", sizes: "32x32" },
  ],
  apple: "/apple-icon.png",
},
  alternates: {
    // FIXED: was completely missing — without this Next.js won't emit <link rel="canonical">
    canonical: siteConfig.url,
    // If you have real Sinhala-language pages, uncomment and point to them:
    // languages: {
    //   en: siteConfig.url,
    //   si: `${siteConfig.url}/si`,
    // },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    // FIXED: removed hardcoded `url` here — it made every page report the homepage URL to
    // social crawlers. Set `openGraph.url` per-page instead, in each route's own metadata export.
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Luxury Wedding Florals`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
};

/**
 * Generates JSON-LD Structured Data Schema for LocalBusiness / Florist
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: siteConfig.name,
    alternateName: siteConfig.englishName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone, // now E.164-safe
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress || undefined,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode || undefined,
      addressCountry: siteConfig.address.country,
    },
    // FIXED: was missing entirely — meaningful boost for local/"near me" search
    geo: siteConfig.geo.latitude
      ? {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        }
      : undefined,
    openingHours: siteConfig.openingHours,
    priceRange: "$$",
    image: `${siteConfig.url}${siteConfig.logo}`,
    sameAs: siteConfig.sameAs,
  };
}