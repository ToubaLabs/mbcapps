import type { Metadata } from "next";
import Link from "@/i18n/LocalizedLink";
import { ArticleCard, ArticleImage, PageHead } from "@/components/ui";
import { articles, pressArticles } from "@/data/content";
import { localizeArticle } from "@/data/articles-i18n";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { PressCard } from "@/components/Press";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale ?? "fr";
  return pageMetadata(locale, "/journal/", getDictionary(locale).journal);
}

export default async function Page({ params }: Props) {
  const locale = (await params).locale ?? "fr";
  if (!isLocale(locale)) throw new Error(`Langue non prise en charge : ${locale}`);
  const t = getDictionary(locale);
  const [first, ...rest] = articles;
  const feat = localizeArticle(first, locale);
  return (
    <>
      <PageHead crumb={`${t.nav.home}  /  ${t.journal.title}`} title={t.journal.title}>
        {t.journal.description}
      </PageHead>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container stack" style={{ gap: 64 }}>
          <Link href={`/journal/${feat.slug}/`} className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <ArticleImage slug={feat.slug} image={feat.image} />
            <div className="stack">
              <span className="kicker">{t.journal.featured} · {feat.category}</span>
              <h2 className="display-l">{feat.title}</h2>
              <p className="muted" style={{ margin: 0 }}>{feat.excerpt}</p>
              <span className="btn btn--secondary" style={{ justifySelf: "start" }}>{t.journal.readArticle}</span>
            </div>
          </Link>
          <div className="grid grid-3" style={{ rowGap: 48 }}>{rest.map((a) => <ArticleCard key={a.slug} {...a} />)}</div>

          {/* Articles publiés par d'autres sites : lien vers l'article d'origine, ouvert dans un nouvel onglet */}
          {pressArticles.length > 0 && (
            <div className="stack" style={{ gap: 24 }} id="presse">
              <div className="stack" style={{ gap: 8 }}>
                <span className="kicker">{t.press.title}</span>
                <h2 className="display-l">{t.journal.pressHeading}</h2>
                <p className="body-s muted" style={{ margin: 0 }}>{t.journal.pressDescription}</p>
              </div>
              <div className="grid grid-3">
                {pressArticles.map((p) => (
                  <PressCard key={p.url} {...p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
