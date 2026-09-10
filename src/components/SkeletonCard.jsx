export function SkeletonCard({ aspectRatio = "aspect-[4/3]" }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-xs">
      <div className={`w-full ${aspectRatio} animate-shimmer bg-stone-100`} />
      <div className="p-4 space-y-2.5">
        <div className="h-4 w-3/4 animate-shimmer rounded bg-stone-100" />
        <div className="h-3 w-1/2 animate-shimmer rounded bg-stone-100" />
      </div>
    </div>
  );
}

export function SkeletonGalleryGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200/70 bg-white"
        >
          <div className="w-full h-full animate-shimmer bg-stone-100" />
        </div>
      ))}
    </div>
  );
}
