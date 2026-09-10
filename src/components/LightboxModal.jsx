"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/seo.config";

export function LightboxModal({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onIndexChange,
  whatsappNumber = null,
}) {
  const currentImage = images[currentIndex] || null;

  const next = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const prev = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, next, prev, onClose]);

  if (!isOpen || !currentImage) return null;

  const targetWhatsApp = whatsappNumber || siteConfig.whatsapp;
  const whatsappInquiryUrl = `https://wa.me/${targetWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Swasthika Floral Decor, I am interested in this decoration: "${currentImage.title}" (${currentImage.place || "Event Decor"}). Can you provide more details and availability?`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar with counter & close button */}
      <div
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-light tracking-widest text-stone-300">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close Preview"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md active:scale-90 transition-all"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div
        className="relative max-h-[82vh] max-w-[92vw] sm:max-w-4xl w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[65vh] sm:h-[75vh] w-full">
          <Image
            src={currentImage.image_url}
            alt={currentImage.title || "Decoration Photo"}
            fill
            sizes="(max-width: 1024px) 95vw, 1200px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Left / Right Nav Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous Image"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 active:scale-90 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next Image"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 active:scale-90 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Bottom Info & Inquiry Bar */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-white tracking-wide">
              {currentImage.title}
            </h3>
            {currentImage.place && (
              <div className="flex items-center gap-1.5 text-xs text-stone-300 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                <span>{currentImage.place}</span>
              </div>
            )}
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-600 px-5 py-2 text-xs font-medium uppercase tracking-wider text-white shadow-md hover:bg-gold-700 active:scale-95 transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Inquire About This Design</span>
          </a>
        </div>
      </div>
    </div>
  );
}
