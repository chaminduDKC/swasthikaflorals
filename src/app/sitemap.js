import { siteConfig } from "@/config/seo.config";
import { fetchCategories } from "@/lib/api";

export default async function sitemap() {
  const categories = await fetchCategories();

  const categoryEntries = categories.map((cat) => ({
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
