import type { MetadataRoute } from "next";
import { articles } from "@/data/content";
import { vehicles } from "@/data/vehicles";
import { allLocales, localeHref } from "@/i18n/locales";
import { absoluteUrl, languageAlternates, translatedPaths } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...translatedPaths, "/journal/", ...articles.map((a) => `/journal/${a.slug}/`), ...vehicles.map((v) => `/flotte/${v.slug}/`)];
  return [
    ...paths.flatMap((path) => allLocales.map((locale) => ({
      url: absoluteUrl(localeHref(locale, path)),
      alternates: { languages: languageAlternates(path) },
    }))),
    ...["/mentions-legales/", "/cgv/", "/confidentialite/",
    ].map((path) => ({ url: absoluteUrl(path) })),
  ];
}
