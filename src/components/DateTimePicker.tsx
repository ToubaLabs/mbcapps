"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { todayIso } from "@/lib/query";

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** Créneaux de 15 minutes, de 0 h à 23 h 45. */
const SLOTS = Array.from({ length: 96 }, (_, k) => `${String(Math.floor(k / 4)).padStart(2, "0")}:${String((k % 4) * 15).padStart(2, "0")}`);

/**
 * Sélecteur de date et d'heure (composants Figma « Day Cell » et « Time Chip »).
 * Règle : prise en charge au moins 2 h à l'avance → les jours passés sont désactivés,
 * et pour aujourd'hui seuls les créneaux à +2 h sont proposés.
 */
export default function DateTimePicker({ date, time, onClose, onConfirm }: { date: string; time: string; onClose: () => void; onConfirm: (date: string, time: string) => void }) {
  const today = todayIso();
  const start = new Date((date || today) + "T12:00:00");
  const [view, setView] = useState({ y: start.getFullYear(), m: start.getMonth() });
  const [d, setD] = useState(date);
  const [t, setT] = useState(time);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const offset = (first.getDay() + 6) % 7; // lundi = 0
    const count = new Date(view.y, view.m + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: count }, (_, k) => k + 1)];
  }, [view]);

  const minSlot = useMemo(() => {
    if (d !== today) return "00:00";
    const n = new Date(Date.now() + 2 * 3600 * 1000);
    return `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;
  }, [d, today]);
  const slots = SLOTS.filter((s) => s >= minSlot && s >= "05:00");

  const shift = (k: number) => setView(({ y, m }) => { const x = new Date(y, m + k, 1); return { y: x.getFullYear(), m: x.getMonth() }; });
  const isFirstMonth = view.y === Number(today.slice(0, 4)) && view.m === Number(today.slice(5, 7)) - 1;
  const label = d ? new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "Choisir une date";

  // Portail vers <body> : évite que le modal (position: fixed) soit tronqué
  // par un ancêtre en overflow: hidden (ex. la section .hero sur l'accueil).
  return createPortal(
    <div className="picker-backdrop" onClick={onClose}>
      <div className="picker" role="dialog" aria-modal="true" aria-label="Date et heure de prise en charge" onClick={(e) => e.stopPropagation()}>
        <div className="picker__head">
          <button type="button" onClick={() => shift(-1)} disabled={isFirstMonth} aria-label="Mois précédent">‹</button>
          <span className="display-s">{MONTHS[view.m]} {view.y}</span>
          <button type="button" onClick={() => shift(1)} aria-label="Mois suivant">›</button>
        </div>
        <div className="picker__selection body-s">
          <span className="muted">Sélection :</span> <span className="gold">{label}</span>
          {t && <> <span className="muted">à</span> <span className="gold">{t}</span></>}
        </div>
        <div className="picker__grid" role="grid">
          {DAYS.map((x, k) => <span key={k} className="picker__dow">{x}</span>)}
          {cells.map((day, k) => {
            if (!day) return <span key={k} />;
            const v = iso(view.y, view.m, day);
            const past = v < today;
            return (
              <button key={k} type="button" disabled={past} aria-pressed={v === d}
                className={`picker__day ${v === today ? "is-today" : ""}`} onClick={() => { setD(v); if (t && v === today && t < minSlot) setT(""); }}>
                {day}
              </button>
            );
          })}
        </div>
        <div className="label muted">Heure de prise en charge</div>
        <div className="picker__slots chips">
          {(d ? slots : []).map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={s === t} onClick={() => setT(s)}>{s}</button>
          ))}
          {!d && <span className="body-s muted">Choisissez d'abord un jour.</span>}
        </div>
        <div className="picker__actions">
          <button type="button" className="btn btn--primary" disabled={!d || !t} onClick={() => onConfirm(d, t)}>Valider</button>
          <button type="button" className="btn btn--secondary" onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
