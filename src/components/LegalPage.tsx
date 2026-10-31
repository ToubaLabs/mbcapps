import Link from "next/link";

const DOCS = [
  { href: "/mentions-legales/", label: "Mentions légales" },
  { href: "/cgv/", label: "Conditions générales de vente" },
  { href: "/confidentialite/", label: "Politique de confidentialité" },
];

/** Gabarit des pages légales. ⚠️ Textes définitifs à fournir par le client ou son conseil juridique. */
export default function LegalPage({ current, title, sections }: { current: string; title: string; sections: [string, string][] }) {
  return (
    <>
      <section className="page-head"><div className="container"><div className="crumb">Informations légales</div><h1 className="display-l">{title}</h1></div></section>
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container legal-layout">
          <nav className="legal-nav" aria-label="Documents légaux">
            {DOCS.map((d) => <Link key={d.href} href={d.href} aria-current={d.href === current ? "page" : undefined}>{d.label}</Link>)}
          </nav>
          <div className="stack" style={{ gap: 32, maxWidth: 760 }}>
            <p className="notice body-s" style={{ margin: 0 }}>Texte définitif à fournir par le client ou son conseil juridique. Les rubriques ci-dessous sont un plan.</p>
            <span className="caption muted">Dernière mise à jour : à compléter</span>
            {sections.map(([t, d]) => (
              <div key={t} className="stack" style={{ gap: 10 }}><h2 className="display-s">{t}</h2><p className="muted" style={{ margin: 0 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
