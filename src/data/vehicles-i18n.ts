import type { Vehicle } from "./vehicles";
import type { Locale } from "@/i18n/locales";

type VehicleCopy = Pick<Vehicle, "label" | "onboard" | "engine" | "interior" | "idealFor">;

const translations: Record<Exclude<Locale, "fr">, Record<string, VehicleCopy>> = {
  en: {
    "mercedes-eqs": { label: "Electric saloon", onboard: "Wi-Fi, water, chargers", engine: "100% electric", interior: "Leather, ambient lighting", idealFor: "A quiet, zero-emission journey on the Riviera." },
    "mercedes-classe-s-berline": { label: "Prestige saloon", onboard: "Wi-Fi, water, chargers", engine: "To be confirmed", interior: "Leather", idealFor: "Transfers and appointments on the Riviera in a prestige saloon." },
    "mercedes-classe-v": { label: "Van", onboard: "Wi-Fi, water, chargers", engine: "Diesel", interior: "Face-to-face seating", idealFor: "Families, groups and bulky luggage." },
    "mercedes-classe-s": { label: "Luxury saloon", onboard: "Wi-Fi, water, chargers", engine: "Hybrid", interior: "Leather, massage seats", idealFor: "Business transfers and hotel arrivals. Quiet and spacious in the rear, it is the most requested vehicle for Nice airport." },
    "range-rover-vogue": { label: "SUV", onboard: "Wi-Fi, water, chargers", engine: "Hybrid", interior: "Leather, elevated seating", idealFor: "The hinterland, villas and mountain getaways." },
  },
  it: {
    "mercedes-eqs": { label: "Berlina elettrica", onboard: "Wi-Fi, acqua, caricabatterie", engine: "100% elettrica", interior: "Pelle, illuminazione d'ambiente", idealFor: "Un viaggio silenzioso e senza emissioni sulla Riviera." },
    "mercedes-classe-s-berline": { label: "Berlina di prestigio", onboard: "Wi-Fi, acqua, caricabatterie", engine: "Da confermare", interior: "Pelle", idealFor: "Transfer e appuntamenti sulla Riviera in una berlina di prestigio." },
    "mercedes-classe-v": { label: "Van", onboard: "Wi-Fi, acqua, caricabatterie", engine: "Diesel", interior: "Sedili uno di fronte all'altro", idealFor: "Famiglie, gruppi e bagagli voluminosi." },
    "mercedes-classe-s": { label: "Berlina di lusso", onboard: "Wi-Fi, acqua, caricabatterie", engine: "Ibrida", interior: "Pelle, sedili massaggianti", idealFor: "Transfer d'affari e arrivi in hotel. Silenziosa e spaziosa nella parte posteriore, è il veicolo più richiesto per l'aeroporto di Nizza." },
    "range-rover-vogue": { label: "SUV", onboard: "Wi-Fi, acqua, caricabatterie", engine: "Ibrida", interior: "Pelle, posizione di guida rialzata", idealFor: "Entroterra, ville ed escursioni in montagna." },
  },
  ru: {
    "mercedes-eqs": { label: "Электрический седан", onboard: "Wi-Fi, вода, зарядные устройства", engine: "Полностью электрический", interior: "Кожа, атмосферная подсветка", idealFor: "Тихая поездка по Ривьере без выбросов." },
    "mercedes-classe-s-berline": { label: "Представительский седан", onboard: "Wi-Fi, вода, зарядные устройства", engine: "Уточняется", interior: "Кожа", idealFor: "Трансферы и встречи на Ривьере в представительском седане." },
    "mercedes-classe-v": { label: "Минивэн", onboard: "Wi-Fi, вода, зарядные устройства", engine: "Дизель", interior: "Сиденья лицом друг к другу", idealFor: "Семьи, группы и крупный багаж." },
    "mercedes-classe-s": { label: "Роскошный седан", onboard: "Wi-Fi, вода, зарядные устройства", engine: "Гибрид", interior: "Кожа, массажные сиденья", idealFor: "Деловые трансферы и поездки в отель. Тихий и просторный сзади автомобиль особенно востребован для трансферов из аэропорта Ниццы." },
    "range-rover-vogue": { label: "Внедорожник", onboard: "Wi-Fi, вода, зарядные устройства", engine: "Гибрид", interior: "Кожа, высокая посадка", idealFor: "Поездки во внутренние районы, на виллы и в горы." },
  },
};

export function localizeVehicle(vehicle: Vehicle, locale: Locale): Vehicle {
  if (locale === "fr") return vehicle;
  const copy = translations[locale][vehicle.slug];
  if (!copy) throw new Error(`Traduction du véhicule manquante : ${locale}/${vehicle.slug}`);
  return { ...vehicle, ...copy };
}
