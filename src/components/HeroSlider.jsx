"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { LightboxModal } from "./LightboxModal";

export function HeroSlider({ slides = [] }) {
  // Default wedding & floral images if database has fewer than 5 slider images
  const defaultFallbacks = useMemo(
    () => [
      {
        id: "fallback-1",
        title: "Luxury Poruwa Floral Canopy",
        place: "Grand Ballroom, Colombo",
        image_url:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
        category_name: "Poruwa Decor",
      },
      {
        id: "fallback-2",
        title: "Romantic Outdoor Beach Ceremony",
        place: "Bentota Coastal Resort",
        image_url:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
        category_name: "Wedding Arches",
      },
      {
        id: "fallback-3",
        title: "White Lily & Rose Bridal Setup",
        place: "Shangri-La, Colombo",
        image_url:
          "https://images.unsplash.com/photo-1545232979-fbf6c97a5522?q=80&w=1200&auto=format&fit=crop",
        category_name: "Bridal Settee",
      },
      {
        id: "fallback-4",
        title: "Earthy Botanical Table Garland",
        place: "Cinnamon Grand, Colombo",
        image_url:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
        category_name: "Table Decor",
      },
      {
        id: "fallback-5",
        title: "Grand Entrance Floral Walkway",
        place: "Galle Face Hotel, Colombo",
        image_url:
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
        category_name: "Entrance Decor",
      },
    ],
    []
  );

  // Prepare base list with at least 5 images for seamless infinite layout
  const baseSlides = useMemo(() => {
    let list = slides.length > 0 ? [...slides] : defaultFallbacks;
    while (list.length < 5) {
      list = [...list, ...defaultFallbacks.slice(0, 5 - list.length)];
    }
    return list;
  }, [slides, defaultFallbacks]);

  const totalOriginal = baseSlides.length;

  // Clone items [cloneBefore, original, cloneAfter] for seamless infinite looping
  const extendedSlides = useMemo(() => {
    return [...baseSlides, ...baseSlides, ...baseSlides];
  }, [baseSlides]);

  // Start in the middle set (offset by totalOriginal)
  const [currentIndex, setCurrentIndex] = useState(totalOriginal);
  const [enableTransition, setEnableTransition] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isSlidingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Measure visible items according to screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setVisibleCount(5); // 5 portrait cards visible side-by-side on desktop (matches screenshot)
      } else if (width >= 1024) {
        setVisibleCount(4); // 4 cards on standard desktop
      } else if (width >= 640) {
        setVisibleCount(2.5); // 2.5 cards on tablets
      } else {
        setVisibleCount(1); // 1 full card on mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When transition is disabled to reset the clone position, re-enable it on the next animation frame
  useEffect(() => {
    if (!enableTransition) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setEnableTransition(true);
          isSlidingRef.current = false;
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [enableTransition]);

  const nextSlide = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setEnableTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setEnableTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handle infinite loop snap once the slide transition finishes
  const handleTransitionEnd = () => {
    isSlidingRef.current = false;

    // If we have slid past the end of the second set, seamlessly snap back to the first set without animation
    if (currentIndex >= totalOriginal * 2) {
      setEnableTransition(false);
      setCurrentIndex((prev) => prev - totalOriginal);
    }
    // If we have slid before the beginning of the second set, seamlessly snap forward to the second set
    else if (currentIndex < totalOriginal) {
      setEnableTransition(false);
      setCurrentIndex((prev) => prev + totalOriginal);
    }
  };

  // Autoplay (pauses when touched/hovered)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (touchEndX.current !== 0) {
      if (diff > 45) {
        nextSlide();
      } else if (diff < -45) {
        prevSlide();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    setTimeout(() => setIsPaused(false), 2000);
  };

  const openLightbox = (index) => {
    // Map cloned index back to original slide index
    const realIndex = index % totalOriginal;
    setActiveImageIndex(realIndex);
    setLightboxOpen(true);
  };

  return (
    <section
      id="slider-showcase"
      className="relative w-full py-3 sm:py-6 overflow-hidden bg-[#FAF8F5]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Floral Designs Slider"
    >
      <div className="relative mx-auto w-full px-2 sm:px-4 md:px-6">
        {/* Carousel Viewport */}
        <div className="overflow-hidden">
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: enableTransition ? "transform 500ms ease-out" : "none",
            }}
          >
            {extendedSlides.map((slide, index) => {
              return (
                <div
                  key={`${slide.id || "slide"}-${index}`}
                  style={{ flex: `0 0 ${100 / visibleCount}%` }}
                  className="px-1 sm:px-1.5 md:px-2"
                >
                  {/* Portrait Orientation Card */}
                  <div
                    onClick={() => {}}
                    className="group relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] max-h-[500px] w-full cursor-pointer overflow-hidden bg-stone-100 shadow-xs transition-all duration-300 active:scale-[0.98]"
                  >
                    <Image
                      src={slide.image_url}
                      alt={slide.title || "Floral Decoration"}
                      fill
                      priority={index >= totalOriginal && index < totalOriginal + 5}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 20vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badge */}
                    {slide.category_name && (
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-stone-800 shadow-xs border border-white/40">
                          <Sparkles className="h-2.5 w-2.5 text-gold-600" />
                          <span>{slide.category_name}</span>
                        </span>
                      </div>
                    )}

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                      <h3 className="font-serif-elegant text-sm sm:text-base md:text-lg font-medium leading-tight line-clamp-1 text-white drop-shadow-xs">
                        {slide.title}
                      </h3>
                      {slide.place && (
                        <div className="flex items-center gap-1 text-[11px] sm:text-xs text-stone-200 mt-0.5 font-light">
                          <MapPin className="h-3 w-3 text-gold-400 shrink-0" />
                          <span className="truncate">{slide.place}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Circular Left / Right Arrow Navigation (Matches Screenshot) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 hover:bg-white text-stone-700 shadow-md active:scale-90 transition-all border border-stone-200/80"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 hover:bg-white text-stone-700 shadow-md active:scale-90 transition-all border border-stone-200/80"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Lightbox Modal on Image Click */}
      <LightboxModal
        images={baseSlides}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveImageIndex}
      />
    </section>
  );
}
