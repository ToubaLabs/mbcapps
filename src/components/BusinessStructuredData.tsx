import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export default function BusinessStructuredData() {
  const businessId = `${site.url}/#business`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        alternateName: site.businessName,
        url: site.url,
        image: absoluteUrl("/images/partage.jpg"),
        logo: absoluteUrl("/images/logo.png"),
        telephone: site.phoneHref.replace("tel:", ""),
        email: site.email,
        address: { "@type": "PostalAddress", ...site.postalAddress },
        geo: { "@type": "GeoCoordinates", ...site.geo },
        areaServed: ["Monaco", "Nice", "Cannes", "Menton", "Côte d'Azur"],
        openingHours: "Mo-Su 00:00-23:59",
        sameAs: [site.googleBusinessUrl, ...site.socialLinks.map(({ url }) => url)],
        hasMap: site.mapsUrl,
      },
      ...[
        { name: "Transfert aéroport Nice–Monaco", path: "/services/transferts-aeroport/" },
        { name: "Chauffeur pour événements à Monaco", path: "/evenements/" },
        { name: "Mise à disposition avec chauffeur", path: "/services/mise-a-disposition/" },
      ].map(({ name, path }) => ({
        "@type": "Service",
        "@id": `${absoluteUrl(path)}#service`,
        name, url: absoluteUrl(path), provider: { "@id": businessId },
        areaServed: ["Monaco", "Côte d'Azur"],
      })),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
