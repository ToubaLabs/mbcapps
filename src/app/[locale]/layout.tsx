import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, isLocale, type Locale } from "@/i18n/locales";
import { dictionaries } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import { site } from "@/data/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const ogLocales: Record<Locale, string> = { fr: "fr_FR", en: "en_US", it: "it_IT", ru: "ru_RU" };

// Redéfinit le titre/la description par défaut du layout racine (toujours en français) dans la
// langue de ce segment [locale] : ne s'applique qu'aux pages qui n'ont pas leur propre `metadata`.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = isLocale(locale) ? dictionaries[locale] : dictionaries.fr;
  return {
    title: { absolute: `${site.name} — ${dict.meta.title}`, template: `%s — ${site.name}` },
    description: dict.meta.description,
    openGraph: { title: `${site.name} — ${dict.meta.title}`, description: dict.meta.ogDescription, locale: ogLocales[isLocale(locale) ? locale : "fr"] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") notFound();
  return (
    <LocaleProvider locale={locale} dict={dictionaries[locale]}>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
      <CookieBanner />
    </LocaleProvider>
  );
}
