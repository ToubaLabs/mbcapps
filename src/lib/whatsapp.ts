import { site } from "@/data/site";

/**
 * Construit un lien WhatsApp avec un message pré-rempli.
 * Rien n'est envoyé à un serveur : le lien ouvre l'application WhatsApp du visiteur,
 * qui choisit lui-même d'envoyer le message.
 */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type Booking = {
  from: string;
  to: string;
  date: string; // AAAA-MM-JJ
  time: string; // HH:MM
  passengers: number;
  bags: number;
  vehicle?: string;
  price?: number;
  flight?: string;
  /** Un véhicule supplémentaire a été demandé car les bagages dépassent la capacité du véhicule choisi. */
  extraVehicle?: boolean;
};

export function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

export function bookingMessage(b: Booking) {
  const lines = [
    "Bonjour, je souhaite réserver un chauffeur.",
    `Trajet : ${b.from} → ${b.to}`,
    `Date : ${formatDate(b.date)}, ${b.time}`,
    `Passagers : ${b.passengers}, bagages : ${b.bags}`,
  ];
  if (b.vehicle) lines.push(`Véhicule : ${b.vehicle}${b.price ? ` (${b.price} €)` : ""}`);
  if (b.extraVehicle) lines.push("Un véhicule supplémentaire est demandé pour les bagages excédentaires.");
  if (b.flight) lines.push(`Vol : ${b.flight}`);
  return lines.join("\n");
}

export type EventRequest = {
  type: string;
  date: string;
  hours: string;
  place: string;
  guests: number;
  sedans: number;
  vans: number;
  /** Véhicule souhaité, choisi dans le menu déroulant du formulaire de devis. */
  vehicle: string;
  passengers: number;
  bags: number;
  notes: string;
};

export function eventMessage(e: EventRequest) {
  const lines = [
    "Bonjour, je souhaite un devis pour un événement.",
    `Événement : ${e.type}, ${formatDate(e.date)}`,
  ];
  if (e.hours) lines.push(`Horaires : ${e.hours}`);
  lines.push(`Lieu : ${e.place}`);
  lines.push(`Invités : ${e.guests}, véhicules : ${e.sedans} berline(s) et ${e.vans} van(s)`);
  if (e.vehicle) lines.push(`Véhicule souhaité : ${e.vehicle}, ${e.passengers} passager(s), ${e.bags} bagage(s)`);
  if (e.notes) lines.push(`Précisions : ${e.notes}`);
  return lines.join("\n");
}
