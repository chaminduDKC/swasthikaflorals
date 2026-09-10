"use client";

import { useState } from "react";
import Image from "next/image";
import { LightboxModal } from "./LightboxModal";
import { MapPin, Loader2, Sparkles } from "lucide-react";

export function GalleryGrid({
  initialImages = [],
  categoryId,
  initialTotal = 0,
  initialTotalPages = 1,
  whatsappNumber = null,
}) {
  const [images, setImages] = useState(initialImages);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [total, setTotal] = useState(initialTotal);
  const [loadingMore, setLoadingMore] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpenLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);

    const nextPage = page + 1;
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiBase}/images?categoryId=${categoryId}&page=${nextPage}&limit=12`);
      if (res.ok) {
        const data = await res.json();
        const newImages = data.images || [];
        setImages((prev) => [...prev, ...newImages]);
        setPage(nextPage);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || total);
      }
    } catch (err) {
      console.error("Failed to load more photos:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-100/60 text-gold-700">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="font-serif-elegant text-xl font-medium text-stone-800">
          No Photos Uploaded Yet
        </h3>
        <p className="text-xs sm:text-sm font-light text-stone-500 max-w-sm mx-auto">
          We are in the process of curating this collection. Please check back soon or inquire directly for custom designs.
        </p>
      </div>
    );
  }

  const hasMore = page < totalPages;

  return (
    <div className="space-y-10">
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {images.map((img, index) => (
          <div
            key={img.id || index}
            onClick={() => handleOpenLightbox(index)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs transition-all active:scale-[0.98]"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
              <Image
                src={img.image_url}
                alt={img.title || "Decoration Image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 overlay-gradient" />
            </div>

            {/* Mobile & Desktop Info Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
              <h4 className="text-sm sm:text-base font-medium leading-tight line-clamp-1 text-white">
                {img.title}
              </h4>
              {img.place && (
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-200 mt-1 font-light">
                  <MapPin className="h-3 w-3 text-gold-400 shrink-0" />
                  <span className="truncate">{img.place}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination: Load More Button */}
      <div className="flex flex-col items-center justify-center pt-4 pb-8 space-y-3">
        {hasMore ? (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-widest text-gold-800 shadow-xs hover:bg-gold-50 active:scale-95 disabled:opacity-50 transition-all"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-gold-600" />
                <span>Loading Photos...</span>
              </>
            ) : (
              <span>Load More Photos</span>
            )}
          </button>
        ) : (
          <p className="text-xs font-light text-stone-500 tracking-wider uppercase">
            Showing all {images.length} of {total || images.length} photos
          </p>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={images}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveImageIndex}
        whatsappNumber={whatsappNumber}
      />
    </div>
  );
}
