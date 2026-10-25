import type { Booking } from "./whatsapp";

/** Utilitaires sans React : utilisables côté serveur et côté navigateur. */
export function bookingQuery(b: Partial<Booking>) {
  const q = new URLSearchParams();
  Object.entries(b).forEach(([k, v]) => {
    if (v === undefined || v === "") return;
    q.set(k === "passengers" ? "pax" : k, String(v));
  });
  return q.toString();
}

/** Date du jour au format AAAA-MM-JJ (fuseau du navigateur). */
export function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/** Terminaux proposés quand l'adresse saisie correspond à l'aéroport de Nice Côte d'Azur. */
export const niceAirportTerminals = ["Terminal 1", "Terminal 2", "Terminal Affaires"];

const NICE_AIRPORT_RE = /a[eé]roport.*nice|nice.*a[eé]roport|nice c[oô]te d'azur/i;

/** Détecte si une adresse saisie correspond à l'aéroport de Nice, pour proposer un terminal. */
export function isNiceAirport(value: string) {
  return NICE_AIRPORT_RE.test(value);
}

/** Ajoute (ou remplace) la mention du terminal à la fin d'une adresse d'aéroport. */
export function withNiceTerminal(value: string, terminal: string) {
  const base = value.replace(/,?\s*Terminal\s+(1|2|Affaires)\s*$/i, "").trim();
  return `${base}, ${terminal}`;
}
