// Flotte et prix. ⚠️ PROVISOIRE : prix d'exemple, à remplacer par la grille du client.
// Les photos sont dans /public/images/vehicules/<slug>-1.jpg … -<photos>.jpg.
// mercedes-classe-s et mercedes-classe-v sont fournies ; les autres véhicules sont encore à fournir.

export type Vehicle = {
  slug: string;
  name: string;
  category: "Berlines" | "Vans" | "SUV" | "Électriques";
  label: string;
  passengers: number;
  bags: number;
  onboard: string;
  engine: string;
  interior: string;
  idealFor: string;
  /** Prix du transfert de référence Aéroport Nice → Monaco */
  basePrice: number;
  /** Prix de la mise à disposition, par heure */
  hourly: number;
  photos: number;
};

export const vehicles: Vehicle[] = [
  {
    slug: "mercedes-classe-e",
    name: "Mercedes Classe E",
    category: "Berlines",
    label: "Berline affaires",
    passengers: 3,
    bags: 3,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "Hybride",
    interior: "Cuir",
    idealFor: "Les transferts du quotidien et les rendez-vous d'affaires.",
    basePrice: 120,
    hourly: 75,
    photos: 5,
  },
  {
    slug: "mercedes-eqs",
    name: "Mercedes EQS",
    category: "Électriques",
    label: "Berline électrique",
    passengers: 3,
    bags: 2,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "100 % électrique",
    interior: "Cuir, éclairage d'ambiance",
    idealFor: "Un trajet silencieux et sans émission sur la Riviera.",
    basePrice: 140,
    hourly: 85,
    photos: 5,
  },
  {
    slug: "mercedes-classe-v",
    name: "Mercedes Classe V",
    category: "Vans",
    label: "Van",
    passengers: 7,
    bags: 7,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "Diesel",
    interior: "Sièges face à face",
    idealFor: "Les familles, les groupes et les bagages volumineux.",
    basePrice: 150,
    hourly: 90,
    photos: 2,
  },
  {
    slug: "mercedes-classe-s",
    name: "Mercedes Classe S",
    category: "Berlines",
    label: "Berline luxe",
    passengers: 3,
    bags: 3,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "Hybride",
    interior: "Cuir, sièges massants",
    idealFor:
      "Les transferts d'affaires et les arrivées à l'hôtel. Silencieuse, spacieuse à l'arrière, c'est la berline la plus demandée pour l'aéroport de Nice.",
    basePrice: 160,
    hourly: 95,
    photos: 8,
  },
  {
    slug: "bmw-serie-7",
    name: "BMW Série 7",
    category: "Berlines",
    label: "Berline luxe",
    passengers: 3,
    bags: 3,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "Hybride",
    interior: "Cuir, toit panoramique",
    idealFor: "Les soirées et les rendez-vous où chaque détail compte.",
    basePrice: 160,
    hourly: 95,
    photos: 5,
  },
  {
    slug: "range-rover-vogue",
    name: "Range Rover Vogue",
    category: "SUV",
    label: "SUV",
    passengers: 4,
    bags: 4,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "Hybride",
    interior: "Cuir, position haute",
    idealFor: "Les arrière-pays, les villas et les escapades à la montagne.",
    basePrice: 180,
    hourly: 100,
    photos: 5,
  },
];

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);

/** Coefficient de prix d'un véhicule par rapport à la Classe E (base 1). */
export const ratio = (v: Vehicle) => v.basePrice / 120;
