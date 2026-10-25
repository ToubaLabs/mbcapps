// Flotte et prix de référence Aéroport Nice → Monaco.
// Les photos sont dans /public/images/vehicules/<photoPrefix ou slug>-1.jpg … -<photos>.jpg.
// Les photos de la flotte sont fournies, y compris les 11 photos de la Classe S (mercedes-classe-s-berline).

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
  photoPrefix?: string;
};

export const vehicles: Vehicle[] = [
  {
    slug: "mercedes-eqs", // Identifiant historique conservé pour les liens existants.
    photoPrefix: "mercedes-eqe",
    name: "Classe E/EQE/Tesla",
    category: "Électriques",
    label: "Berline électrique",
    passengers: 3,
    bags: 2,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "100 % électrique",
    interior: "Cuir, éclairage d'ambiance",
    idealFor: "Un trajet silencieux et sans émission sur la Riviera.",
    basePrice: 150,
    hourly: 100,
    photos: 9,
  },
  {
    slug: "mercedes-classe-s-berline",
    name: "Mercedes Classe S",
    category: "Berlines",
    label: "Berline prestige",
    passengers: 3,
    bags: 2,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "À confirmer",
    interior: "Cuir",
    idealFor: "Les transferts et les rendez-vous sur la Riviera en berline de prestige.",
    basePrice: 220,
    hourly: 130,
    photos: 11,
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
    basePrice: 220,
    hourly: 120,
    photos: 2,
  },
  {
    slug: "mercedes-classe-s",
    name: "Mercedes Maybach",
    category: "Berlines",
    label: "Berline luxe",
    passengers: 3,
    bags: 3,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "Hybride",
    interior: "Cuir, sièges massants",
    idealFor:
      "Les transferts d'affaires et les arrivées à l'hôtel. Silencieuse, spacieuse à l'arrière, c'est la berline la plus demandée pour l'aéroport de Nice.",
    basePrice: 450,
    hourly: 300,
    photos: 8,
  },
  {
    slug: "range-rover-vogue",
    name: "Range Rover Vogue / LWB",
    category: "SUV",
    label: "SUV",
    passengers: 4,
    bags: 4,
    onboard: "Wi-Fi, eau, chargeurs",
    engine: "Hybride",
    interior: "Cuir, position haute",
    idealFor: "Les arrière-pays, les villas et les escapades à la montagne.",
    basePrice: 350,
    hourly: 250,
    photos: 7,
  },
];

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);
