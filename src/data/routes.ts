import type { Vehicle } from "./vehicles";

// Fixed transfer prices provided in the client's tariff grid.
export type Route = {
  id: string;
  from: string;
  to: string;
  distance?: string;
  duration?: string;
  matchTerms: string[];
  prices: Partial<Record<Vehicle["slug"], number>>;
};

export const routes: Route[] = [
  {
    id: "monaco",
    from: "Monaco",
    to: "Monaco",
    matchTerms: ["monaco", "monte carlo"],
    prices: {
      "mercedes-eqs": 90,
      "mercedes-classe-s-berline": 130,
      "mercedes-classe-v": 130,
      "range-rover-vogue": 150,
      "mercedes-classe-s": 250,
    },
  },
  {
    id: "beaulieu-eze-cap-ferrat-villefranche",
    from: "Monaco",
    to: "Beaulieu / Èze / Cap-Ferrat / Villefranche-sur-Mer",
    matchTerms: ["beaulieu", "eze", "cap ferrat", "villefranche sur mer"],
    prices: {
      "mercedes-eqs": 120,
      "mercedes-classe-s-berline": 150,
      "mercedes-classe-v": 150,
      "range-rover-vogue": 200,
      "mercedes-classe-s": 350,
    },
  },
  {
    id: "nice",
    from: "Monaco",
    to: "Nice / Aéroport",
    distance: "20–30 km",
    duration: "environ 30–35 min",
    matchTerms: ["nice", "nizza", "ницца"],
    prices: {
      "mercedes-eqs": 150,
      "mercedes-classe-s-berline": 220,
      "mercedes-classe-v": 220,
      "range-rover-vogue": 350,
      "mercedes-classe-s": 450,
    },
  },
  {
    id: "cap-antibes-cannes",
    from: "Monaco",
    to: "Cannes",
    distance: "55 km",
    duration: "environ 50 min",
    matchTerms: ["cap d antibes", "cannes"],
    prices: {
      "mercedes-eqs": 250,
      "mercedes-classe-s-berline": 350,
      "mercedes-classe-v": 350,
      "range-rover-vogue": 450,
      "mercedes-classe-s": 600,
    },
  },
  {
    id: "saint-tropez",
    from: "Monaco",
    to: "Saint-Tropez",
    distance: "115 km",
    duration: "environ 1 h 45",
    matchTerms: ["saint tropez", "st tropez", "san tropez"],
    prices: {
      "mercedes-eqs": 550,
      "mercedes-classe-s-berline": 780,
      "mercedes-classe-v": 780,
      "range-rover-vogue": 1100,
      "mercedes-classe-s": 1300,
    },
  },
  {
    id: "marseille",
    from: "Monaco",
    to: "Marseille",
    matchTerms: ["marseille", "marsiglia", "марсель"],
    prices: {
      "mercedes-eqs": 700,
      "mercedes-classe-s-berline": 900,
      "mercedes-classe-v": 900,
      "range-rover-vogue": 1600,
      "mercedes-classe-s": 1700,
    },
  },
  {
    id: "megeve-courchevel-saint-moritz",
    from: "Monaco",
    to: "Megève / Courchevel / Saint-Moritz",
    matchTerms: ["megeve", "courchevel", "saint moritz", "st moritz"],
    prices: {
      "mercedes-classe-s-berline": 2300,
      "mercedes-classe-v": 2300,
      "range-rover-vogue": 2900,
      "mercedes-classe-s": 3400,
    },
  },
  {
    id: "geneva",
    from: "Monaco",
    to: "Genève",
    matchTerms: ["geneve", "geneva", "ginevra", "женева"],
    prices: {
      "mercedes-classe-s-berline": 2300,
      "mercedes-classe-v": 2300,
      "range-rover-vogue": 3400,
      "mercedes-classe-s": 3600,
    },
  },
  {
    id: "zurich",
    from: "Monaco",
    to: "Zurich",
    matchTerms: ["zurich", "zurigo", "цюрих"],
    prices: {
      "mercedes-classe-s-berline": 2500,
      "mercedes-classe-v": 2500,
      "range-rover-vogue": 3900,
      "mercedes-classe-s": 4000,
    },
  },
  {
    id: "ventimiglia",
    from: "Monaco",
    to: "Ventimiglia",
    matchTerms: ["ventimiglia"],
    prices: {
      "mercedes-eqs": 150,
      "mercedes-classe-s-berline": 230,
      "mercedes-classe-v": 230,
      "range-rover-vogue": 300,
      "mercedes-classe-s": 350,
    },
  },
  {
    id: "san-remo",
    from: "Monaco",
    to: "San Remo",
    matchTerms: ["san remo", "sanremo"],
    prices: {
      "mercedes-eqs": 250,
      "mercedes-classe-s-berline": 300,
      "mercedes-classe-v": 300,
      "range-rover-vogue": 450,
      "mercedes-classe-s": 550,
    },
  },
  {
    id: "genova-albenga",
    from: "Monaco",
    to: "Genova / Albenga",
    matchTerms: ["genova", "genoa", "genes", "albenga", "albegna", "генуя"],
    prices: {
      "mercedes-eqs": 700,
      "mercedes-classe-s-berline": 850,
      "mercedes-classe-v": 850,
      "range-rover-vogue": 1200,
      "mercedes-classe-s": 1500,
    },
  },
  {
    id: "rapallo-portofino",
    from: "Monaco",
    to: "Rapallo / Portofino",
    matchTerms: ["rapallo", "portofino"],
    prices: {
      "mercedes-eqs": 950,
      "mercedes-classe-s-berline": 1100,
      "mercedes-classe-v": 1100,
      "range-rover-vogue": 1600,
      "mercedes-classe-s": 1800,
    },
  },
  {
    id: "milan",
    from: "Monaco",
    to: "Milano",
    matchTerms: ["milano", "milan", "милан"],
    prices: {
      "mercedes-classe-s-berline": 1200,
      "mercedes-classe-v": 1200,
      "range-rover-vogue": 1800,
      "mercedes-classe-s": 1950,
    },
  },
];

export function routePrice(from: string, to: string, vehicleSlug: Vehicle["slug"]): number | undefined {
  const normalize = (value: string) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const origin = normalize(from);
  const destination = normalize(to);
  const isMonaco = (value: string) => value.includes("monaco") || value.includes("monte carlo");
  const originIsMonaco = isMonaco(origin);
  const destinationIsMonaco = isMonaco(destination);

  if (originIsMonaco && destinationIsMonaco) {
    return routes[0].prices[vehicleSlug];
  }
  if (!originIsMonaco && !destinationIsMonaco) return undefined;

  const target = originIsMonaco ? destination : origin;
  if (target.includes("cannes mandelieu")) return undefined;
  const route = routes.slice(1).find((candidate) =>
    candidate.matchTerms.some((term) => target.includes(normalize(term))),
  );
  return route?.prices[vehicleSlug];
}

export const popularRoutes = [
  { ...routes[2], from: "Aéroport Nice", to: "Monaco", distance: "30 km", duration: "environ 35 min" },
  routes[3],
  routes[4],
  routes[5],
];

/** Raccourcis proposés à la saisie de la destination. */
export const shortcuts = [
  "Aéroport Nice Côte d'Azur",
  "Héliport de Monaco",
  "Gare de Monaco",
  "Casino de Monte-Carlo",
];

export const shortcutLabels = ["Aéroport Nice", "Héliport Monaco", "Gare de Monaco", "Casino de Monte-Carlo"];
