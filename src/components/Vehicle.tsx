"use client";

import Link from "@/i18n/LocalizedLink";
import { useState } from "react";
import type { Vehicle } from "@/data/vehicles";
import { useI18n } from "@/i18n/context";
import { localizeVehicle } from "@/data/vehicles-i18n";
import { Media } from "./ui";

const photo = (v: Vehicle, i = 1) => `/images/vehicules/${v.photoPrefix ?? v.slug}-${i}.jpg`;

/** Carte verticale (accueil, flotte, véhicules similaires). Composant Figma « Vehicle Tile ». */
export function VehicleTile({ v, price, priceLabel }: { v: Vehicle; price?: number; priceLabel?: string }) {
  const { locale, t } = useI18n();
  const localized = localizeVehicle(v, locale);
  return (
    <Link href={`/flotte/${v.slug}/`} className="vehicle-tile card">
      <Media src={photo(v)} alt={`Photo ${v.name}`} ratio="16/9" />
      <div className="vehicle-tile__body">
        <span className="kicker">{localized.label}</span>
        <span className="display-s">{v.name}</span>
        <dl className="specs">
          <div><dt>{t.vehicleTile.passengers}</dt><dd>{v.passengers}</dd></div>
          <div><dt>{t.vehicleTile.bags}</dt><dd>{v.bags}</dd></div>
          <div><dt>{t.vehicleTile.onboard}</dt><dd>{localized.onboard}</dd></div>
        </dl>
        <hr className="divider" />
        <div className="vehicle-tile__foot">
          <div>
            <div className="caption muted">{priceLabel ?? `${t.home.popularRoutes[0].from} → ${t.home.popularRoutes[0].to}`}</div>
            <div className="price">{price ?? v.basePrice}&nbsp;€</div>
          </div>
          <span className="btn btn--primary btn--sm">{t.vehicleTile.reserve}</span>
        </div>
      </div>
    </Link>
  );
}

/** Ligne de choix à l'étape 2 de la réservation. Composant Figma « Vehicle Card ». */
export function VehicleOption({ v, price, selected, disabled, onSelect }: { v: Vehicle; price: number | undefined; selected: boolean; disabled?: boolean; onSelect: () => void }) {
  const { locale, t } = useI18n();
  const localized = localizeVehicle(v, locale);
  return (
    <button type="button" className={`vehicle-option ${selected ? "is-selected" : ""}`} aria-pressed={selected} disabled={disabled} onClick={onSelect}>
      <Media src={photo(v)} alt="" ratio="3/2" className="vehicle-option__photo" />
      <span className="vehicle-option__info">
        <span className="vehicle-option__name">{v.name}</span>
        <span className="caption muted">
          {localized.label}, {v.passengers} {t.vehicleOption.passengersWord}, {v.bags} {t.vehicleOption.bagsWord}
          {disabled && ` — ${t.vehicleOption.tooSmall}`}
        </span>
      </span>
      <span className="vehicle-option__price">
        <span className="price">{price === undefined ? t.step2.priceOnRequest : <>{price}&nbsp;€</>}</span>
        {price !== undefined && <span className="caption muted">{t.common.ttc}</span>}
      </span>
    </button>
  );
}

/** Galerie de la fiche véhicule : miniatures sur ordinateur, défilement au doigt sur mobile. */
export function Gallery({ v }: { v: Vehicle }) {
  const { t } = useI18n();
  const [i, setI] = useState(1);
  const n = v.photos;
  return (
    <div className="gallery">
      <button type="button" className="gallery__main" onClick={() => setI((i % n) + 1)} aria-label={t.accessibility.nextPhoto}>
        <Media key={i} src={photo(v, i)} alt={`${v.name}, ${t.accessibility.photoOf.replace("{photo}", String(i)).replace("{total}", String(n))}`} ratio="16/10" />
      </button>
      <div className="gallery__thumbs hide-mobile">
        {Array.from({ length: n }, (_, k) => k + 1).map((k) => (
          <button key={k} type="button" className={k === i ? "is-active" : ""} onClick={() => setI(k)} aria-label={t.accessibility.showPhoto.replace("{photo}", String(k))}>
            <Media src={photo(v, k)} alt="" ratio="3/2" />
          </button>
        ))}
      </div>
      <div className="gallery__dots show-mobile">
        {Array.from({ length: n }, (_, k) => k + 1).map((k) => (
          <button key={k} type="button" className={k === i ? "is-active" : ""} onClick={() => setI(k)} aria-label={t.accessibility.showPhoto.replace("{photo}", String(k))} />
        ))}
      </div>
    </div>
  );
}
