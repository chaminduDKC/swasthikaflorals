"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/seo.config";

export function WhatsAppButton({ settings = null }) {
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Swasthika Floral Decor, I would like to inquire about your wedding & event decorations."
  )}`;

  return (
    <aside aria-label="Quick contact" className="fixed bottom-5 right-5 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-lg hover:shadow-xl hover:bg-[#20bd5a] active:scale-95 transition-all font-medium text-xs sm:text-sm"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
        <span className="hidden sm:inline font-sans">Quick Inquiry</span>
      </a>
    </aside>
  );
}
