import type { Metadata } from "next";
import { Media } from "@/components/ui";
import EventForm from "@/components/EventForm";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale ?? "fr";
  return pageMetadata(locale, "/evenements/", getDictionary(locale).events);
}

const images = ["grand-prix", "yacht-show", "galas", "mariages"] as const;

export default async function Page({ params }: Props) {
  const t = getDictionary((await params).locale).events;
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">{t.title}</span>
          <h1 className="display-xl">{t.heroLines[0]}<br />{t.heroLines[1]}</h1>
          <p className="body-l">{t.heroText}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#devis" className="btn btn--primary">{t.quoteCta}</a>
            <a href={site.phoneHref} className="btn btn--secondary">{t.callCta}</a>
          </div>
          <span className="caption muted">{t.responseTime}</span>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container grid grid-4">
          {t.types.map((type, i) => (
            <a key={images[i]} href="#devis" className="article-card">
              <Media src={`/images/evenements/${images[i]}.jpg`} alt={type.title} ratio="4/3" />
              <span className="display-s">{type.title}</span>
              <span className="body-s muted">{type.text}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>{t.stepsHeading}</h2>
          <ol className="grid steps-5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {t.steps.map((step, i) => (
              <li key={step.title} className="stack" style={{ gap: 8 }}>
                <span className="step-num">{i + 1}</span>
                <h3 className="display-s">{step.title}</h3>
                <p className="body-s muted" style={{ margin: 0 }}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="devis">
        <div className="container"><EventForm /></div>
      </section>
    </>
  );
}
