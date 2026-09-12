import { fetchSliderImages, fetchCategories, fetchBusinessSettings } from "@/lib/api";
import { HeroSlider } from "@/components/HeroSlider";
import { CategorySection } from "@/components/CategorySection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { siteConfig } from "@/config/seo.config";
import { MessageCircle, Phone, Sparkles, Award, HeartHandshake } from "lucide-react";

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export default async function HomePage() {
  const [sliderImages, categories, settings] = await Promise.all([
    fetchSliderImages(),
    fetchCategories(),
    fetchBusinessSettings(),
  ]);

  const primaryCategories = categories.filter((c) => c.type === "primary");
  const secondaryCategories = categories.filter((c) => c.type === "secondary");
  const otherCategories = categories.filter((c) => c.type === "other");

  const phone = settings?.phone || siteConfig.phone;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Swasthika Floral Decor, I would like to inquire about wedding and event decoration packages."
  )}`;

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Hero Intro Header above Slider */}
      <section className="pt-6 sm:pt-10 sm:pb-3 text-center px-2 ">
        <ScrollReveal className="max-w-3xl mx-auto ">
          <span className="font-charm text-2xl sm:text-4xl text-gold-700 block">
            Where Blooms
          </span>
          <h1 className="font-serif-elegant text-3xl sm:text-5xl md:text-6xl font-light text-stone-900 tracking-wide leading-tight">
            Become Magic
          </h1>
         
        </ScrollReveal>
      </section>

      {/* 1. Hero Image Slider (images with show_on_slider = true) */}
      <HeroSlider slides={sliderImages} />

      {/* Brand Value Pillars (Subtle, Light, Mobile-first) */}
      <section className="py-6 border-b border-stone-200/70 bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100/70 text-gold-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Custom Floral Artistry
                </h4>
                <p className="text-[11px] sm:text-xs font-light text-stone-500">
                  Tailored wedding themes & fresh blooms
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100/70 text-gold-700">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Premier Wedding Styling
                </h4>
                <p className="text-[11px] sm:text-xs font-light text-stone-500">
                  Poruwa, settee backs, and church aisles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100/70 text-gold-700">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Dedicated Coordination
                </h4>
                <p className="text-[11px] sm:text-xs font-light text-stone-500">
                  Seamless execution on your special day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Primary Categories Section */}
      <CategorySection
        id="primary-categories"
        scriptTitle="Signature"
        title="Primary Collections"
        description="Our most prominent centerpiece designs: wedding poruwa setups, bridal settee backdrops, and luxury grand entrances."
        categories={primaryCategories}
        priority={true}
      />

      {/* Our Story Section (below Primary Categories) */}
      <section className="py-14 sm:py-20 bg-[#F4ECE1]/45 border-y border-stone-200/70 my-4 sm:my-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal className="space-y-4 sm:space-y-6">
            <div className="space-y-3 text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              <p>
                Swasthika Floral Decor was born from a deep love for the art of flowers and a desire to bring extraordinary beauty to Sri Lanka&apos;s most cherished celebrations. Every arrangement we create tells a story.
              </p>
              
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Secondary Categories Section */}
      <CategorySection
        id="secondary-categories"
        scriptTitle="Elegance in Details"
        title="Secondary Decorations"
        description="Thoughtfully curated accents: banquet table centerpieces, floral walkways, car decorations, and oil lamp styling."
        categories={secondaryCategories}
      />

      {/* 4. Other Categories Section */}
      <CategorySection
        id="other-categories"
        scriptTitle="Special Celebrations"
        title="Other Floral Specialities"
        description="Custom floral arrangements for engagements, birthdays, corporate functions, and intimate gatherings."
        categories={otherCategories}
      />

      {/* Consultation & Booking CTA Banner */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-[#332415] to-[#20150B] p-8 sm:p-12 text-white shadow-xl text-center space-y-5">
            <span className="font-charm text-2xl sm:text-4xl text-gold-300 block">
              Reserve Your Date
            </span>
            <h2 className="font-serif-elegant text-2xl sm:text-4xl font-light text-white max-w-xl mx-auto leading-snug">
              Let&apos;s Create Something Breathtaking For Your Wedding Day
            </h2>
            <p className="text-xs sm:text-sm font-light text-stone-300 max-w-md mx-auto leading-relaxed">
              Dates fill up quickly during peak wedding seasons. Reach out to schedule a consultation
              or discuss your personalized decor package.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 text-stone-950 px-6 py-3 text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-xs font-medium uppercase tracking-wider backdrop-blur-xs active:scale-95 transition-all"
              >
                <Phone className="h-3.5 w-3.5 text-gold-300" />
                <span>Call {phone}</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
