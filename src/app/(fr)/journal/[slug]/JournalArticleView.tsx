import Link from "@/i18n/LocalizedLink";
import type { Article } from "@/data/content";
import { articles } from "@/data/content";
import { ArticleCard, ArticleImage } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

export default function JournalArticleView({ a, locale }: { a: Article; locale: Locale }) {
  const t = getDictionary(locale).journal;
  return (
    <>
      <article>
        <header className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
          <div className="prose" style={{ gap: 16 }}>
            <span className="caption muted"><Link href="/journal/">{t.title}</Link>  /  {a.category}</span>
            <h1 className="display-xl">{a.title}</h1>
            <span className="kicker">{a.category} · {a.readTime} {t.readTimeSuffix}</span>
          </div>
        </header>
        <div className="container"><ArticleImage slug={a.slug} image={a.image} ratio="21/9" linkedCredit /></div>
        <div className="container section" style={{ paddingTop: 64 }}>
          <div className="prose">
            {a.body.map((b, i) =>
              b.type === "h" ? <h2 key={i} className="display-m">{b.text}</h2>
              : b.type === "quote" ? <blockquote key={i}>{b.text}</blockquote>
              : <p key={i}>{b.text}</p>
            )}
            <div className="card card--pad" style={{ background: "var(--sea)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span className="display-s">{t.ctaTitle}</span>
              <Link href="/reserver/" className="btn btn--primary">{t.ctaButton}</Link>
            </div>
          </div>
        </div>
      </article>
      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 32 }}>{t.readMore}</h2>
          <div className="grid grid-3">{articles.filter((x) => x.slug !== a.slug).slice(0, 3).map((x) => <ArticleCard key={x.slug} {...x} />)}</div>
        </div>
      </section>
    </>
  );
}
