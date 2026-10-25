import type { Metadata } from "next";
import Link from "@/i18n/LocalizedLink";
import { FaqItem } from "@/components/ui";
import { site } from "@/data/site";
import { routePrice } from "@/data/routes";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale ?? "fr";
  return pageMetadata(locale, "/services/transferts-aeroport/", getDictionary(locale).services.transfers);
}

const prices = [
  routePrice("Aéroport Nice Côte d'Azur", "Monaco", "mercedes-eqs"),
  undefined,
  undefined,
  routePrice("Héliport de Monaco", "Hôtel à Monaco", "mercedes-eqs"),
] as const;

export default async function Page({ params }: Props) {
  const dict = getDictionary((await params).locale);
  const t = dict.services.transfers;
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">{dict.services.title}  /  {t.title}</span>
          <h1 className="display-xl">{t.heroTitle}</h1>
          <p className="body-l">{t.heroText}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/reserver/?to=A%C3%A9roport+Nice+C%C3%B4te+d%27Azur%2C+T1" className="btn btn--primary">{t.pricesCta}</Link>
            <a href={site.phoneHref} className="btn btn--secondary">{t.callPrefix} {site.phoneDisplay}</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>{t.includedHeading}</h2>
          <div className="grid grid-3">
            {t.benefits.map((benefit) => (
              <div key={benefit.title} className="rule-top stack" style={{ gap: 10 }}><h3 className="display-s">{benefit.title}</h3><p className="muted" style={{ margin: 0 }}>{benefit.text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 24 }}>{t.tripsHeading}</h2>
          {t.trips.map((trip, i) => (
            <div key={trip} className="row-line body-l">
              <span>{trip}</span>
              <span className="price">{prices[i] === undefined ? dict.step2.priceOnRequest : `${t.startingFrom} ${prices[i]} €`}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 24 }}>{t.faqHeading}</h2>
          {t.faq.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} open={i === 0} />)}
        </div>
      </section>
    </>
  );
}
