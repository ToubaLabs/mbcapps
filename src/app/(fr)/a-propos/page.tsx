import type { Metadata } from "next";
import { Media } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale ?? "fr";
  return pageMetadata(locale, "/a-propos/", getDictionary(locale).about);
}

export default async function Page({ params }: Props) {
  const t = getDictionary((await params).locale).about;
  return (
    <>
      <section className="section">
        <div className="container stack" style={{ gap: 24, maxWidth: 1100 }}>
          <span className="kicker">{t.title}</span>
          <h1 className="display-xl">{t.heroTitle}</h1>
          <p className="body-l muted" style={{ margin: 0, maxWidth: 720 }}>{t.heroText}</p>
        </div>
        <div className="container" style={{ marginTop: 48 }}><Media src="/images/vehicules/mercedes-eqe-5.jpg" alt={t.teamAlt} ratio="16/9" /></div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>{t.commitmentsHeading}</h2>
          <div className="grid grid-3">
            {t.commitments.map((item) => (
              <div key={item.title} className="rule-top stack" style={{ gap: 12 }}><h3 className="display-m">{item.title}</h3><p className="muted" style={{ margin: 0 }}>{item.text}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
