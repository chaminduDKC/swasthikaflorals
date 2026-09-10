import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCategoryById, fetchCategoryImages, fetchBusinessSettings } from "@/lib/api";
import { GalleryGrid } from "@/components/GalleryGrid";
import { siteConfig } from "@/config/seo.config";
import { ChevronRight, ArrowLeft, Images } from "lucide-react";

/**
 * Dynamic SEO Generation for Category Gallery Page
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const category = await fetchCategoryById(id);

  if (!category) {
    return {
      title: `Gallery | ${siteConfig.name}`,
      description: siteConfig.description,
    };
  }

  const title = `${category.name} Gallery | ${siteConfig.name}`;
  const description = category.subtitle || `Browse exquisite ${category.name} wedding decorations and event styling by ${siteConfig.englishName}.`;
  const url = `${siteConfig.url}/category/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: category.thumbnail_url,
          width: 1200,
          height: 800,
          alt: `${category.name} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category.thumbnail_url],
    },
  };
}

export default async function CategoryGalleryPage({ params }) {
  const { id } = await params;
  const category = await fetchCategoryById(id);

  if (!category) {
    notFound();
  }

  // Fetch first page of 12 images for this category and business settings
  const [imagesData, settings] = await Promise.all([
    fetchCategoryImages(id, 1, 12),
    fetchBusinessSettings(),
  ]);

  // JSON-LD BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${siteConfig.url}/category/${id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-light text-stone-500">
            <Link href="/" className="hover:text-gold-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <Link href="/#primary-categories" className="hover:text-gold-700 transition-colors">
              Collections
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <span className="text-stone-800 font-normal truncate">{category.name}</span>
          </nav>

          {/* Back to Home Button */}
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-gold-700 hover:text-gold-800 active:scale-95 transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all collections</span>
            </Link>
          </div>

          {/* Category Header */}
          <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
            <span className="font-charm text-2xl sm:text-3xl text-gold-700 block">
              Floral Gallery
            </span>
            <h1 className="font-serif-elegant text-3xl sm:text-5xl font-light text-stone-900 tracking-wide">
              {category.name}
            </h1>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto my-3" />
            {category.subtitle && (
              <p className="text-xs sm:text-sm font-light text-stone-600 leading-relaxed max-w-xl mx-auto">
                {category.subtitle}
              </p>
            )}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100/70 px-3.5 py-1 text-xs font-medium text-gold-800 border border-gold-200">
                <Images className="h-3.5 w-3.5 text-gold-700" />
                <span>{imagesData.total || category.image_count || 0} Photos in Collection</span>
              </span>
            </div>
          </div>

          {/* Gallery Grid with Load More Pagination */}
          <GalleryGrid
            initialImages={imagesData.images || []}
            categoryId={id}
            initialTotal={imagesData.total || 0}
            initialTotalPages={imagesData.totalPages || 1}
            whatsappNumber={settings?.whatsapp}
          />
        </div>
      </div>
    </>
  );
}
