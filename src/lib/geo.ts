/**
 * Auto-complétion d'adresses et géolocalisation, via l'API publique Nominatim
 * (OpenStreetMap), sans clé ni backend : cohérent avec un site 100 % statique.
 * ⚠️ PROVISOIRE : Nominatim impose un usage raisonnable (≈ 1 requête/seconde, pas
 * d'usage commercial intensif sans auto-hébergement). Pour un trafic important,
 * remplacer par un fournisseur dédié (Google Places, Mapbox…).
 */

const NOMINATIM = "https://nominatim.openstreetmap.org";

type NominatimResult = {
  display_name?: string;
  name?: string;
  address?: {
    house_number?: string;
    road?: string;
    pedestrian?: string;
    footway?: string;
    path?: string;
    cycleway?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    city_district?: string;
    suburb?: string;
    neighbourhood?: string;
    county?: string;
  };
};

function formatAddress(result: NominatimResult): string {
  const address = result.address;
  const streetName = address?.road ?? address?.pedestrian ?? address?.footway ?? address?.path ?? address?.cycleway;
  const street = [address?.house_number, streetName].filter(Boolean).join(" ");
  const locality = address?.city ?? address?.town ?? address?.village ?? address?.municipality
    ?? address?.city_district ?? address?.suburb ?? address?.neighbourhood ?? address?.county;
  const name = result.name?.trim();
  const parts: string[] = [];

  if (name && name.toLowerCase() !== streetName?.toLowerCase()) parts.push(name);
  if (street && !parts.some((part) => part.toLowerCase() === street.toLowerCase())) parts.push(street);
  if (locality && !parts.some((part) => part.toLowerCase() === locality.toLowerCase())) parts.push(locality);

  const fallback = result.display_name?.split(",").map((part) => part.trim()).filter(Boolean).slice(0, 2).join(", ");
  return parts.slice(0, 3).join(", ") || fallback || "";
}

/** Recherche d'adresses, limitée à Monaco, la France et l'Italie (zone de service). */
export async function searchAddress(query: string, signal?: AbortSignal): Promise<string[]> {
  if (query.trim().length < 3) return [];
  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    limit: "5",
    countrycodes: "mc,fr,it",
    q: query,
  });
  const res = await fetch(`${NOMINATIM}/search?${params}`, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data: NominatimResult[] = await res.json();
  return data.map(formatAddress);
}

/** Transforme des coordonnées GPS en adresse lisible. */
export async function reverseGeocode(lat: number, lon: number, signal?: AbortSignal): Promise<string | null> {
  const params = new URLSearchParams({ format: "jsonv2", addressdetails: "1", lat: String(lat), lon: String(lon) });
  const res = await fetch(`${NOMINATIM}/reverse?${params}`, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const data: NominatimResult = await res.json();
  return formatAddress(data) || null;
}
