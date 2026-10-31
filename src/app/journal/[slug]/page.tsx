import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/content";
import { ArticleCard, Media } from "@/components/ui";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <>
      <article>
        <header className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
          <div className="prose" style={{ gap: 16 }}>
            <span className="caption muted"><Link href="/journal/">Journal</Link>  /  {a.category}</span>
            <h1 className="display-xl">{a.title}</h1>
            <span className="kicker">{a.category} · {a.readTime} de lecture</span>
          </div>
        </header>
        <div className="container"><Media src={`/images/journal/${a.slug}.jpg`} alt="Photo de l'article" ratio="21/9" /></div>
        <div className="container section" style={{ paddingTop: 64 }}>
          <div className="prose">
            {a.body.map((b, i) =>
              b.type === "h" ? <h2 key={i} className="display-m">{b.text}</h2>
              : b.type === "quote" ? <blockquote key={i}>{b.text}</blockquote>
              : <p key={i}>{b.text}</p>
            )}
            <div className="card card--pad" style={{ background: "var(--sea)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span className="display-s">Un chauffeur pour votre séjour ?</span>
              <Link href="/reserver/" className="btn btn--primary">Réserver un trajet</Link>
            </div>
          </div>
        </div>
      </article>
      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 32 }}>À lire aussi</h2>
          <div className="grid grid-3">{articles.filter((x) => x.slug !== a.slug).slice(0, 3).map((x) => <ArticleCard key={x.slug} {...x} />)}</div>
        </div>
      </section>
    </>
  );
}
