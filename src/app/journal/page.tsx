import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard, Media, PageHead } from "@/components/ui";
import { articles, pressArticles } from "@/data/content";
import { PressCard } from "@/components/Press";

export const metadata: Metadata = { title: "Journal", description: "Guides, adresses et conseils pour se déplacer à Monaco et sur la Riviera." };

export default function Page() {
  const [feat, ...rest] = articles;
  return (
    <>
      <PageHead crumb="Accueil  /  Journal" title="Journal">
        Guides, adresses et conseils pour se déplacer à Monaco et sur la Riviera.
      </PageHead>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container stack" style={{ gap: 64 }}>
          <Link href={`/journal/${feat.slug}/`} className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <Media src={`/images/journal/${feat.slug}.jpg`} alt="Photo de l'article" ratio="16/10" />
            <div className="stack">
              <span className="kicker">À la une · {feat.category}</span>
              <h2 className="display-l">{feat.title}</h2>
              <p className="muted" style={{ margin: 0 }}>{feat.excerpt}</p>
              <span className="btn btn--secondary" style={{ justifySelf: "start" }}>Lire l'article</span>
            </div>
          </Link>
          <div className="grid grid-3" style={{ rowGap: 48 }}>{rest.map((a) => <ArticleCard key={a.slug} {...a} />)}</div>

          {/* Articles publiés par d'autres sites : lien vers l'article d'origine, ouvert dans un nouvel onglet */}
          {pressArticles.length > 0 && (
            <div className="stack" style={{ gap: 24 }} id="presse">
              <div className="stack" style={{ gap: 8 }}>
                <span className="kicker">Presse</span>
                <h2 className="display-l">Ils parlent de nous</h2>
                <p className="body-s muted" style={{ margin: 0 }}>Articles publiés par d'autres médias. Le lien ouvre l'article d'origine.</p>
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
