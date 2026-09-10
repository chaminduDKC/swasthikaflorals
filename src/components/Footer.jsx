import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/seo.config";
import { Phone, Mail, MapPin, MessageCircle, Heart } from "lucide-react";

export function Footer({ settings = null }) {
  const phone = settings?.phone || siteConfig.phone;
  const phoneSecondary = settings?.phone_secondary || null;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const email = settings?.email || siteConfig.email;
  const address = settings?.address || `${siteConfig.address.city}, ${siteConfig.address.country}`;
  const siteName = settings?.site_name || siteConfig.name;
  const tagline = settings?.tagline || siteConfig.tagline;

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Swasthika Floral Decor, I would like to inquire about your decorations."
  )}`;

  return (
    <footer className="border-t border-stone-200/80 bg-[#F4ECE1]/50 text-stone-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gold-300 bg-white p-0.5 shadow-xs flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={siteName}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-charm text-2xl text-stone-900 block leading-tight">
                  {siteName}
                </span>
                <span className="text-[10px] tracking-[0.25em] font-light uppercase text-gold-700">
                  {tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm font-light text-stone-600 leading-relaxed max-w-md">
              Specialized in crafting breathtaking wedding poruwa designs, elegant floral backdrops,
              table centerpieces, and tailor-made event decor that transform spaces into timeless experiences.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold-600 px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-gold-700 active:scale-95 transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-stone-900">
              Floral Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light text-stone-600">
              <li>
                <Link href="/#primary-categories" className="hover:text-gold-700 transition-colors">
                  Primary Collections
                </Link>
              </li>
              <li>
                <Link href="/#secondary-categories" className="hover:text-gold-700 transition-colors">
                  Secondary Decorations
                </Link>
              </li>
              <li>
                <Link href="/#other-categories" className="hover:text-gold-700 transition-colors">
                  Other Event Florals
                </Link>
              </li>
              <li>
                <Link href="/#slider-showcase" className="hover:text-gold-700 transition-colors">
                  Featured Highlights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-stone-900">
              Contact & Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light text-stone-600">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-600 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="hover:text-gold-700 transition-colors"
                >
                  {phone}
                </a>
              </li>
              {phoneSecondary && (
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-gold-600 shrink-0" />
                  <a
                    href={`tel:${phoneSecondary.replace(/\s+/g, "")}`}
                    className="hover:text-gold-700 transition-colors"
                  >
                    {phoneSecondary}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold-600 shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-gold-700 transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-stone-500">
          <p>© {new Date().getFullYear()} {siteConfig.englishName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="h-3 w-3 text-gold-600 fill-gold-600" /> for unforgettable moments
          </p>
        </div>
      </div>
    </footer>
  );
}
