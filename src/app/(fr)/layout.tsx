import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import { LocaleProvider } from "@/i18n/context";
import { dictionaries } from "@/i18n/dictionaries";
import { site } from "@/data/site";

// Redéfinit le titre/la description par défaut du layout racine (toujours en français) :
// cette valeur ne s'applique qu'aux pages qui n'ont pas leur propre `metadata` (ex. la home).
export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${dictionaries.fr.meta.title}`, template: `%s — ${site.name}` },
  description: dictionaries.fr.meta.description,
  openGraph: { title: `${site.name} — ${dictionaries.fr.meta.title}`, description: dictionaries.fr.meta.ogDescription, locale: "fr_FR" },
};

/** Groupe de routes françaises (sans préfixe d'URL) : fournit la langue par défaut. */
export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="fr" dict={dictionaries.fr}>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
      <CookieBanner />
    </LocaleProvider>
  );
}
