import { Charm, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { defaultMetadata, getLocalBusinessSchema } from "@/config/seo.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const charm = Charm({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-charm",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});


import { fetchBusinessSettings } from "@/lib/api";

export const metadata = defaultMetadata;

export default async function RootLayout({ children }) {
  const settings = await fetchBusinessSettings();
  const jsonLd = getLocalBusinessSchema();

  if (settings) {
    if (settings.phone) jsonLd.telephone = settings.phone;
    if (settings.address) jsonLd.address.streetAddress = settings.address;
    if (settings.city) jsonLd.address.addressLocality = settings.city;
    if (settings.region) jsonLd.address.addressRegion = settings.region;
  }

  return (
    <html
      lang="en"
      className={`${charm.variable} ${cormorant.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1E1B18] selection:bg-gold-600 selection:text-white">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton settings={settings} />
      </body>
    </html>
  );
}
