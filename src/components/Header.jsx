"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/seo.config";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

export function Header({ settings = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phone = settings?.phone || siteConfig.phone;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const city = settings?.city || siteConfig.address.city;
  const region = settings?.region || siteConfig.address.region;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Primary Collections", href: "/#primary-categories" },
    { label: "Secondary Decor", href: "/#secondary-categories" },
    { label: "Other Specialities", href: "/#other-categories" },
  ];

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Swasthika Floral Decor, I would like to inquire about your wedding & event decorations."
  )}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FAF8F5]/90 backdrop-blur-md transition-all">
      {/* Top micro bar for phone / contact */}
      <div className="hidden sm:block border-b border-stone-100 bg-[#F4ECE1]/60 py-1 text-center text-xs tracking-wider text-stone-600 font-light">
        <span>Luxury Wedding & Event Floral Artistry • {city}, {region} • </span>
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="font-medium text-gold-700 hover:text-gold-800 transition-colors ml-1"
        >
          {phone}
        </a>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform active:scale-95"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full  p-0.5 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt={siteConfig.name}
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-charm text-xl sm:text-2xl leading-tight text-stone-900 tracking-wide">
              ස්වස්තික
            </span>
            <span className="text-[10px] tracking-[0.25em] font-light uppercase text-gold-700 -mt-0.5">
              Floral Decor
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-light text-stone-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gold-700 active:text-gold-800 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold-600 px-4 py-2 text-xs font-medium tracking-wider uppercase text-white shadow-xs hover:bg-gold-700 active:scale-95 transition-all"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Book Consultation</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-gold-700 bg-gold-50 border border-gold-200 active:bg-gold-100 transition-colors"
            aria-label="WhatsApp Inquiry"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-gold-700 active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-light text-stone-800 border-b border-stone-100 active:text-gold-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gold-600 py-3 text-xs font-medium tracking-wider uppercase text-white shadow-xs active:bg-gold-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Inquiry</span>
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 text-xs font-medium text-stone-700 active:bg-stone-50"
            >
              <Phone className="h-3.5 w-3.5 text-gold-600" />
              <span>Call Us: {phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
