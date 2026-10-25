import type { Metadata } from "next";
import { FaqItem, PageHead } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale ?? "fr";
  return pageMetadata(locale, "/faq/", getDictionary(locale).faqPage);
}

export default async function Page({ params }: Props) {
  const t = getDictionary((await params).locale);
  const groups = [
    { id: "reservation", items: t.faqPage.reservation },
    { id: "prix-et-paiement", items: t.pricing.faq },
    { id: "aeroport-et-vols", items: t.services.transfers.faq },
    { id: "annulation", items: [t.faqPage.cancellation] },
  ];
  return (
    <>
      <PageHead crumb={`${t.nav.home}  /  FAQ`} title={t.faqPage.title}>
        {t.faqPage.description}
      </PageHead>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container legal-layout">
          <nav className="legal-nav" aria-label={t.faqPage.categoriesAria}>
            {groups.map((group, i) => <a key={group.id} href={`#${group.id}`}>{t.faqPage.categories[i]}</a>)}
          </nav>
          <div className="stack" style={{ gap: 48 }}>
            {groups.map((group, i) => (
              <div key={group.id} id={group.id} style={{ scrollMarginTop: 100 }}>
                <h2 className="display-m">{t.faqPage.categories[i]}</h2>
                {group.items.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
