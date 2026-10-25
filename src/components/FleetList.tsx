"use client";

import { useMemo, useState } from "react";
import { vehicles, type Vehicle } from "@/data/vehicles";
import { whatsappLink } from "@/lib/whatsapp";
import { useI18n } from "@/i18n/context";
import { VehicleTile } from "./Vehicle";

const CATEGORIES: Vehicle["category"][] = ["Berlines", "Vans", "SUV", "Électriques"];
// Libellés canoniques (toujours en français : réutilisés tels quels dans le message WhatsApp).
const GROUPS = [
  { label: "1 à 3", min: 1 },
  { label: "4", min: 4 },
  { label: "5 à 7", min: 5 },
];

/** Page Flotte : filtres, tri et état vide « Aucun véhicule ne correspond ». */
export default function FleetList() {
  const { t } = useI18n();
  const [cats, setCats] = useState<string[]>([]);
  const [group, setGroup] = useState<number | null>(null);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    const l = vehicles.filter((v) => (cats.length === 0 || cats.includes(v.category)) && (group === null || v.passengers >= GROUPS[group].min));
    return l.sort((a, b) => (sort === "asc" ? a.basePrice - b.basePrice : b.basePrice - a.basePrice));
  }, [cats, group, sort]);

  const toggle = (c: string) => setCats((x) => (x.includes(c) ? x.filter((y) => y !== c) : [...x, c]));
  const clear = () => { setCats([]); setGroup(null); };

  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <div className="container fleet-layout">
        <button className="btn btn--secondary fleet-filters-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {t.fleet.filtersBtn}{cats.length + (group !== null ? 1 : 0) ? ` (${cats.length + (group !== null ? 1 : 0)})` : ""}
        </button>
        <aside className="card filters" data-open={open}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="display-s">{t.fleet.filtersHeading}</span>
            <button className="link" style={{ background: "none", border: 0, cursor: "pointer" }} onClick={clear}>{t.fleet.clear}</button>
          </div>
          <fieldset>
            <legend>{t.fleet.categoryLegend}</legend>
            {CATEGORIES.map((c) => (
              <label key={c} className="check"><input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(c)} />{t.fleet.categories[c]}</label>
            ))}
          </fieldset>
          <fieldset>
            <legend>{t.fleet.passengersLegend}</legend>
            <div className="chips">
              {GROUPS.map((g, i) => (
                <button key={g.label} type="button" className="chip" aria-pressed={group === i} onClick={() => setGroup(group === i ? null : i)}>{t.fleet.groups[i]}</button>
              ))}
            </div>
          </fieldset>
        </aside>

        <div className="stack" style={{ gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span className="muted" aria-live="polite">
              {list.length ? `${list.length} ${t.fleet.resultsCountSuffix}` : t.fleet.noResultsForFilters}
            </span>
            <label className="field" style={{ padding: "8px 14px", minWidth: 220 }}>
              <span className="field-label">{t.fleet.sortLabel}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as "asc" | "desc")}>
                <option value="asc">{t.fleet.sortAsc}</option>
                <option value="desc">{t.fleet.sortDesc}</option>
              </select>
            </label>
          </div>

          {list.length ? (
            <div className="grid grid-2">{list.map((v) => <VehicleTile key={v.slug} v={v} />)}</div>
          ) : (
            <div className="empty">
              <h2 className="display-s">{t.fleet.emptyTitle}</h2>
              <p className="muted">{t.fleet.emptyText}</p>
              <div className="empty__actions">
                <button className="btn btn--primary" onClick={clear}>{t.fleet.clearFilters}</button>
                <a className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer"
                  href={whatsappLink(`Bonjour, je cherche un véhicule : ${cats.join(", ") || "toutes catégories"}${group !== null ? `, ${GROUPS[group].label} passagers` : ""}. Avez-vous une solution ?`)}>
                  {t.fleet.askWhatsapp}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
