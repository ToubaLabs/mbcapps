import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { allLocales, isLocale, localeHref, type Locale } from "@/i18n/locales";
import type { Vehicle } from "@/data/vehicles";

export const translatedPaths = [
  "/", "/services/", "/services/transferts-aeroport/", "/services/mise-a-disposition/",
  "/flotte/", "/tarifs/", "/evenements/", "/faq/", "/a-propos/", "/contact/",
] as const;

export function absoluteUrl(path: string) {
  return new URL(path, site.url).href;
}

export function languageAlternates(path: string) {
  return Object.fromEntries([
    ...allLocales.map((locale) => [locale, absoluteUrl(localeHref(locale, path))]),
    ["x-default", absoluteUrl(path)],
  ]);
}

export function pageMetadata(
  locale: string,
  path: string,
  copy: { title: string; description: string },
  { translated = true, index = true }: { translated?: boolean; index?: boolean } = {},
): Metadata {
  if (!isLocale(locale)) throw new Error(`Langue non prise en charge : ${locale}`);
  const canonical = absoluteUrl(localeHref(translated ? locale : "fr", path));
  const title = `${copy.title} — ${site.name}`;
  const image = { url: absoluteUrl("/images/partage.jpg"), width: 1200, height: 630, alt: site.name };
  const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_GB", it: "it_IT", ru: "ru_RU" };
  return {
    title: { absolute: title },
    description: copy.description,
    alternates: {
      canonical,
      languages: translated ? languageAlternates(path) : { fr: canonical, "x-default": canonical },
    },
    robots: { index, follow: true },
    openGraph: {
      title, description: copy.description, url: canonical, siteName: site.name,
      type: "website", locale: ogLocale[translated ? locale : "fr"], images: [image],
    },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [image.url] },
  };
}

export function staticPageMetadata(path: string) {
  return async ({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> => {
    const locale = (await params).locale ?? "fr";
    if (!isLocale(locale)) notFound();
    const t = getDictionary(locale);
    const pages: Record<string, { title: string; description: string }> = {
      "/": t.meta,
      "/flotte/": { title: t.fleet.pageTitle, description: t.fleet.pageDescription },
      "/tarifs/": { title: t.pricing.pageTitle, description: t.pricing.pageDescription },
      "/contact/": { title: t.contact.pageTitle, description: t.contact.formSubtitle },
      "/reserver/": { title: t.step1.title, description: t.step1.subtitle },
      "/reserver/vehicule/": { title: t.step2.title, description: t.step2.subtitle },
      "/reserver/whatsapp/": { title: t.step3.title, description: t.step3.subtitle },
    };
    const copy = pages[path];
    if (!copy) throw new Error(`Métadonnées manquantes : ${path}`);
    return pageMetadata(locale, path, copy, { index: !path.startsWith("/reserver/") });
  };
}

export function vehicleMetadata(locale: string, vehicle: Vehicle): Metadata {
  if (!isLocale(locale)) throw new Error(`Langue non prise en charge : ${locale}`);
  const { name, passengers, bags } = vehicle;
  const copy: Record<Locale, { title: string; description: string }> = {
    fr: { title: `${name} avec chauffeur à Monaco`, description: `${name} avec chauffeur privé à Monaco : ${passengers} passagers, ${bags} bagages. Transferts Nice–Monaco, événements et mise à disposition.` },
    en: { title: `${name} with a private driver in Monaco`, description: `${name} with a private driver in Monaco: ${passengers} passengers, ${bags} bags. Nice airport transfers, events and hourly hire.` },
    it: { title: `${name} con autista a Monaco`, description: `${name} con autista privato a Monaco: ${passengers} passeggeri, ${bags} bagagli. Transfer dall'aeroporto di Nizza, eventi e servizio a ore.` },
    ru: { title: `${name} с водителем в Монако`, description: `${name} с персональным водителем в Монако: ${passengers} пассажира, ${bags} места для багажа. Трансферы из аэропорта Ниццы, мероприятия и почасовая аренда.` },
  };
  return pageMetadata(locale, `/flotte/${vehicle.slug}/`, copy[locale]);
}
