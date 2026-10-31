// Trajets fréquents et formules. ⚠️ PROVISOIRE : prix, distances et durées à valider par le client.

export type Route = {
  from: string;
  to: string;
  distance: string;
  duration: string;
  /** Prix Classe E. Les autres véhicules appliquent leur coefficient. */
  price: number;
};

export const routes: Route[] = [
  { from: "Aéroport Nice", to: "Monaco", distance: "30 km", duration: "environ 35 min", price: 120 },
  { from: "Monaco", to: "Nice centre", distance: "20 km", duration: "environ 30 min", price: 110 },
  { from: "Monaco", to: "Cannes", distance: "55 km", duration: "environ 50 min", price: 190 },
  { from: "Monaco", to: "Saint-Tropez", distance: "115 km", duration: "environ 1 h 45", price: 420 },
  { from: "Monaco", to: "Sanremo (Italie)", distance: "40 km", duration: "environ 45 min", price: 150 },
  { from: "Héliport", to: "Hôtel à Monaco", distance: "3 km", duration: "environ 5 min", price: 60 },
];

export const popularRoutes = [routes[0], routes[2], routes[3], routes[5]];

export const packages = [
  { title: "3 heures", detail: "Rendez-vous d'affaires, shopping", price: 285, featured: false },
  { title: "Demi-journée, 5 h", detail: "Escapade à Èze ou Menton", price: 450, featured: true },
  { title: "Journée, 10 h", detail: "Saint-Tropez, Cannes, circuit Riviera", price: 850, featured: false },
];

export const extras = [
  "Supplément de nuit, de 22 h à 6 h : +20 %",
  "Siège enfant offert, à demander à la réservation",
  "Arrêt supplémentaire en route : 20 €",
  "Attente au-delà de 60 min : 1 € par minute",
];

/** Raccourcis proposés à la saisie de la destination. */
export const shortcuts = [
  "Aéroport Nice Côte d'Azur, T1",
  "Héliport de Monaco",
  "Gare de Monaco",
  "Casino de Monte-Carlo",
];

export const shortcutLabels = ["Aéroport Nice", "Héliport Monaco", "Gare de Monaco", "Casino de Monte-Carlo"];
