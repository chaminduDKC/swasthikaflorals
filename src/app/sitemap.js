import { siteConfig } from "@/config/seo.config";
import { fetchCategories } from "@/lib/api";

export default async function sitemap() {
  let categories = [];
  try {
    categories = await fetchCategories();
  } catch (err) {
    console.error("Sitemap: failed to fetch categories", err);
  }

  const categoryEntries = categories
    .filter((cat) => cat.id) // guard against malformed rows
    .map((cat) => ({
      url: `${siteConfig.url}/category/${cat.id}`,
      lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
      changeFrequency: "weekly",
      priority: cat.type === "primary" ? 0.9 : 0.7,
    }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...categoryEntries,
  ];
}