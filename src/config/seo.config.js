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
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://swasthikaflorals.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+94 77 123 4567",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+94771234567",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@swasthikaflorals.com",
  address: {
    city: "Colombo",
    region: "Western Province",
    country: "Sri Lanka",
  },
  keywords: [
    "Floral Decor Sri Lanka",
    "Wedding Flowers Colombo",
    "Poruwa Decor Sri Lanka",
    "Luxury Wedding Florist",
    "Settee Back Floral Arrangement",
    "Bridal Table Decorations",
    "Swasthika Floral Decor",
    "ස්වස්තික මල් සැරසිලි",
    "Event Styling Sri Lanka",
  ],
  ogImage: "/og-image.jpg",
  locale: "en_US",
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
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
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
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    priceRange: "$$",
    image: `${siteConfig.url}/logo.png`,
    sameAs: [
      "https://facebook.com/swasthikaflorals",
      "https://instagram.com/swasthikaflorals",
    ],
  };
}
