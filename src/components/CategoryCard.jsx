import Link from "next/link";
import Image from "next/image";
import { Images, ArrowUpRight } from "lucide-react";

export function CategoryCard({ category, priority = false }) {
  if (!category) return null;

  return (
    <Link
      href={`/category/${category.id}`}
      className="group block overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs transition-all duration-300 active:scale-[0.98]"
      aria-label={`View ${category.name} Gallery`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <Image
          src={category.thumbnail_url}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Bottom Gradient */}
        <div className="absolute inset-0 overlay-gradient" />

        {/* Photo Count Tag */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white border border-white/10">
          <Images className="h-3 w-3 text-gold-300" />
          <span>{category.image_count || 0}</span>
        </div>

        {/* Corner Indicator Arrow */}
        <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-sm transition-transform duration-300 group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Content Container (Clearly readable on mobile, no hover required) */}
      <div className="p-4 sm:p-5">
        <h3 className="font-serif-elegant text-lg sm:text-xl font-medium text-stone-900 leading-snug line-clamp-1">
          {category.name}
        </h3>
        {category.subtitle && (
          <p className="mt-1 text-xs sm:text-sm font-light text-stone-500 line-clamp-2 leading-relaxed">
            {category.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
