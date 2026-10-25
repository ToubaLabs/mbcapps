import type { Metadata } from "next";
import Link from "@/i18n/LocalizedLink";
import { vehicles } from "@/data/vehicles";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale ?? "fr";
  return pageMetadata(locale, "/services/mise-a-disposition/", getDictionary(locale).services.hire);
}

export default async function Page({ params }: Props) {
  const dict = getDictionary((await params).locale);
  const t = dict.services.hire;
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">{dict.services.title}  /  {t.title}</span>
          <h1 className="display-xl">{t.heroTitle}</h1>
          <p className="body-l">{t.heroText}</p>
          <div><Link href="/tarifs/" className="btn btn--primary">{t.pricesCta}</Link></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>{dict.pricing.hourlyRow}</h2>
          <div className="grid grid-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.slug} className="card card--pad stack">
                <h3 className="display-s">{vehicle.name}</h3>
                <span className="display-l gold">{vehicle.hourly}&nbsp;€</span>
                <span className="caption muted">{dict.common.ttc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>{t.ideasHeading}</h2>
          <div className="grid grid-3">
            {t.ideas.map((idea) => (
              <div key={idea.title} className="rule-top stack" style={{ gap: 10 }}><h3 className="display-s">{idea.title}</h3><p className="muted" style={{ margin: 0 }}>{idea.text}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
