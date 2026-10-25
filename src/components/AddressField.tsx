"use client";

import { useEffect, useRef, useState } from "react";
import { reverseGeocode, searchAddress } from "@/lib/geo";
import { isNiceAirport, withNiceTerminal } from "@/lib/query";
import { useI18n } from "@/i18n/context";

/**
 * Champ d'adresse avec suggestions (auto-complétion), bouton « Utiliser ma position »
 * optionnel, et sélection du terminal quand l'adresse correspond à l'aéroport de Nice.
 * Rien n'est enregistré : les suggestions viennent d'une API publique, à la volée.
 */
export default function AddressField({
  value,
  onChange,
  placeholder,
  autoComplete,
  geolocate = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  geolocate?: boolean;
}) {
  const { t } = useI18n();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  // Évite de relancer une recherche juste après avoir choisi une suggestion ou la position.
  const skipNext = useRef(false);

  useEffect(() => {
    if (skipNext.current) { skipNext.current = false; return; }
    if (value.trim().length < 3) { setSuggestions([]); setOpen(false); return; }
    const ctrl = new AbortController();
    const timeout = setTimeout(() => {
      searchAddress(value, ctrl.signal)
        .then((r) => { setSuggestions(r); setOpen(r.length > 0); })
        .catch(() => {});
    }, 350);
    return () => { clearTimeout(timeout); ctrl.abort(); };
  }, [value]);

  const pick = (s: string) => {
    skipNext.current = true;
    onChange(s);
    setOpen(false);
  };

  const locate = () => {
    if (!("geolocation" in navigator)) { setGeoError(t.addressField.geoUnavailable); return; }
    setGeoError("");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const address = await reverseGeocode(pos.coords.latitude, pos.coords.longitude).catch(() => null);
        skipNext.current = true;
        onChange(address ?? `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        setLocating(false);
        setOpen(false);
      },
      () => { setGeoError(t.addressField.geoError); setLocating(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const nice = isNiceAirport(value);

  return (
    <div className="address-field">
      <div className="address-field__row">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setOpen(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
        />
        {geolocate && (
          <button type="button" className="address-field__locate" onClick={locate} disabled={locating} aria-label={t.addressField.useMyLocation} title={t.addressField.useMyLocation}>
            {locating ? "…" : "📍"}
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="address-field__list" role="listbox">
          {suggestions.map((s) => (
            <li key={s} role="option" aria-selected={s === value}>
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => pick(s)}>{s}</button>
            </li>
          ))}
          <li className="address-field__attrib caption muted" aria-hidden>{t.addressField.attribution}</li>
        </ul>
      )}

      {geoError && <span className="field-error" role="alert">{geoError}</span>}

      {nice && (
        <div className="chips" aria-label={t.accessibility.terminal} style={{ marginTop: 8 }}>
          {t.niceTerminals.map((term) => (
            <button key={term} type="button" className="chip" aria-pressed={value.endsWith(term)} onClick={() => onChange(withNiceTerminal(value, term))}>
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
