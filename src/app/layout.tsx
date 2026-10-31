import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./components.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import { THEME, site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://monacoblackcar.mc"),
  title: { default: `${site.name} — Chauffeur privé à Monaco`, template: `%s — ${site.name}` },
  description: "Chauffeur privé à Monaco : transferts aéroport, événements et mise à disposition 24h/24. Prix fixe affiché avant de réserver.",
  openGraph: {
    title: `${site.name} — Chauffeur privé à Monaco`,
    description: "Transferts aéroport, événements et mise à disposition 24h/24. Prix fixe, réservation sur WhatsApp.",
    images: ["/images/partage.jpg"],
    locale: "fr_FR",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
  // Empêche iOS/Safari de transformer automatiquement le numéro de téléphone
  // affiché en texte (FAQ, accueil…) en lien cliquable.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0D0D0D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme={THEME}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <CookieBanner />
      </body>
    </html>
  );
}
