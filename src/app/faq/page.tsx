import type { Metadata } from "next";
import { FaqItem, PageHead } from "@/components/ui";
import { faq } from "@/data/content";

export const metadata: Metadata = { title: "Questions fréquentes" };

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\W+/g, "-");

export default function Page() {
  return (
    <>
      <PageHead crumb="Accueil  /  FAQ" title="Questions fréquentes">
        Tout ce qu'il faut savoir avant de réserver. Une autre question ? Écrivez-nous sur WhatsApp, 24h/24.
      </PageHead>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container legal-layout">
          <nav className="legal-nav" aria-label="Rubriques">
            {Object.keys(faq).map((c) => <a key={c} href={`#${slug(c)}`}>{c}</a>)}
          </nav>
          <div className="stack" style={{ gap: 48 }}>
            {Object.entries(faq).map(([cat, items]) => (
              <div key={cat} id={slug(cat)} style={{ scrollMarginTop: 100 }}>
                <h2 className="display-m">{cat}</h2>
                {items.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
