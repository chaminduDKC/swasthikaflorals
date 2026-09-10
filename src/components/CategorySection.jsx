'use client'
import { CategoryCard } from "./CategoryCard";
import { ScrollReveal } from "./ScrollReveal";

export function CategorySection({
  id,
  scriptTitle = "Signature",
  title = "Primary Collections",
  description = "Our most cherished and prominent floral arrangements for unforgettable weddings.",
  categories = [],
  priority = false,
}) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section id={id} className="py-12 sm:py-16 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Charm Script & Serif */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5">
          <span className="font-charm text-2xl sm:text-3xl text-gold-700 block -mb-1">
            {scriptTitle}
          </span>
          <h2 className="font-serif-elegant text-2xl sm:text-4xl font-light text-stone-900 tracking-wide">
            {title}
          </h2>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
          {description && (
            <p className="text-xs sm:text-sm font-light text-stone-600 leading-relaxed">
              {description}
            </p>
          )}
        </ScrollReveal>

        {/* Categories Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {categories.map((cat, idx) => (
            <ScrollReveal key={cat.id} delay={idx * 100}>
              <CategoryCard category={cat} priority={priority && idx < 3} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
