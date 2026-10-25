import type { Metadata } from "next";
import Link from "@/i18n/LocalizedLink";
import { Media } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { serviceImages } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale ?? "fr";
  return pageMetadata(locale, "/services/", getDictionary(locale).services);
}

const services = [
  { href: "/services/transferts-aeroport/" },
  { href: "/evenements/" },
  { href: "/services/mise-a-disposition/" },
] as const;

export default async function Page({ params }: Props) {
  const t = getDictionary((await params).locale).services;
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">{t.title}</span>
          <h1 className="display-xl">{t.heroTitle}</h1>
          <p className="body-l">{t.heroText}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="container stack" style={{ gap: 24 }}>
          {t.cards.map((s, i) => (
            <figure key={services[i].href} style={{ margin: 0 }}>
            <Link href={services[i].href} className="card service-row">
              <Media src={serviceImages[i].src} alt={s.title} ratio="16/10" />
              <div className="stack" style={{ gap: 14 }}>
                <span className="kicker">0{i + 1}</span>
                <h2 className="display-l">{s.title}</h2>
                <p className="muted" style={{ margin: 0 }}>{s.text}</p>
                <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="price">{s.price}</span>
                  <span className="btn btn--secondary btn--sm">{s.cta}</span>
                </div>
              </div>
            </Link>
            {serviceImages[i].credit && (
              <figcaption className="caption muted" style={{ marginTop: 8 }}>
                © <a href={serviceImages[i].credit.source} target="_blank" rel="noopener noreferrer">{serviceImages[i].credit.author}</a>
                {" · "}
                <a href={serviceImages[i].credit.licenseUrl} target="_blank" rel="noopener noreferrer">{serviceImages[i].credit.license}</a>
                {" · "}{t.imageChanges}
              </figcaption>
            )}
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
