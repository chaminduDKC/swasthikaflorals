import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-700 mb-4">
        <Sparkles className="h-6 w-6" />
      </div>
      <span className="font-charm text-2xl text-gold-700 block mb-1">Page Not Found</span>
      <h1 className="font-serif-elegant text-3xl sm:text-4xl font-light text-stone-900 mb-3">
        Collection or Design Not Available
      </h1>
      <p className="text-xs sm:text-sm font-light text-stone-500 max-w-sm mb-6 leading-relaxed">
        The category or gallery you are searching for might have been moved or updated.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-gold-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-xs hover:bg-gold-700 active:scale-95 transition-all"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
