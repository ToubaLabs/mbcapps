"use client";

import { FaqItem, PageHead } from "@/components/ui";
import { routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import { useI18n } from "@/i18n/context";

const cols = [
  ...vehicles.filter((v) => v.slug !== "mercedes-eqs"),
  ...vehicles.filter((v) => v.slug === "mercedes-eqs"),
];

export default function Page() {
  const { t } = useI18n();
  return (
    <>
      <PageHead crumb={`${t.nav.home}  /  ${t.nav.pricing}`} title={t.pricing.pageTitle}>
        {t.pricing.pageDescription}
      </PageHead>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="display-m" style={{ marginBottom: 24 }}>{t.pricing.frequentTripsHeading}</h2>
          <div className="price-table-wrap">
            <table className="price-table">
              <thead><tr><th>{t.common.trip}</th>{cols.map((v) => <th key={v.slug}>{v.name.replace("Mercedes ", "")}</th>)}</tr></thead>
              <tbody>
                {routes.map((r, i) => (
                  <tr key={r.id}>
                    <td>{t.pricing.routeLabels[0]} {i === 0 ? "→" : "↔"} {t.pricing.routeLabels[i]}</td>
                    {cols.map((v) => <td key={v.slug}>{r.prices[v.slug] === undefined ? t.pricing.onRequest : `${r.prices[v.slug]} €`}</td>)}
                  </tr>
                ))}
                <tr><td>{t.pricing.hourlyRow}</td>{cols.map((v) => <td key={v.slug}>{v.hourly}&nbsp;€</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="stack">
            <h2 className="display-l">{t.pricing.goodToKnowHeading}</h2>
            <ul className="dot-list">{t.pricing.extras.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
          <div>{t.pricing.faq.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} open={i === 1} />)}</div>
        </div>
      </section>
    </>
  );
}
