"use client";

import Link from "next/link";
import { useState } from "react";
import type { Vehicle } from "@/data/vehicles";
import { Media } from "./ui";

const photo = (v: Vehicle, i = 1) => `/images/vehicules/${v.slug}-${i}.jpg`;

/** Carte verticale (accueil, flotte, véhicules similaires). Composant Figma « Vehicle Tile ». */
export function VehicleTile({ v, price, priceLabel = "Nice aéroport → Monaco" }: { v: Vehicle; price?: number; priceLabel?: string }) {
  return (
    <Link href={`/flotte/${v.slug}/`} className="vehicle-tile card">
      <Media src={photo(v)} alt={`Photo ${v.name}`} ratio="16/9" />
      <div className="vehicle-tile__body">
        <span className="kicker">{v.label}</span>
        <span className="display-s">{v.name}</span>
        <dl className="specs">
          <div><dt>Passagers</dt><dd>{v.passengers}</dd></div>
          <div><dt>Bagages</dt><dd>{v.bags}</dd></div>
          <div><dt>À bord</dt><dd>{v.onboard}</dd></div>
        </dl>
        <hr className="divider" />
        <div className="vehicle-tile__foot">
          <div>
            <div className="caption muted">{priceLabel}</div>
            <div className="price">{price ?? v.basePrice}&nbsp;€</div>
          </div>
          <span className="btn btn--primary btn--sm">Réserver</span>
        </div>
      </div>
    </Link>
  );
}

/** Ligne de choix à l'étape 2 de la réservation. Composant Figma « Vehicle Card ». */
export function VehicleOption({ v, price, selected, disabled, onSelect }: { v: Vehicle; price: number; selected: boolean; disabled?: boolean; onSelect: () => void }) {
  return (
    <button type="button" className={`vehicle-option ${selected ? "is-selected" : ""}`} aria-pressed={selected} disabled={disabled} onClick={onSelect}>
      <Media src={photo(v)} alt="" ratio="3/2" className="vehicle-option__photo" />
      <span className="vehicle-option__info">
        <span className="vehicle-option__name">{v.name}</span>
        <span className="caption muted">
          {v.label}, {v.passengers} passagers, {v.bags} bagages
          {disabled && " — trop petit pour votre groupe"}
        </span>
      </span>
      <span className="vehicle-option__price">
        <span className="price">{price}&nbsp;€</span>
        <span className="caption muted">TTC</span>
      </span>
    </button>
  );
}

/** Galerie de la fiche véhicule : miniatures sur ordinateur, défilement au doigt sur mobile. */
export function Gallery({ v }: { v: Vehicle }) {
  const [i, setI] = useState(1);
  const n = v.photos;
  return (
    <div className="gallery">
      <button type="button" className="gallery__main" onClick={() => setI((i % n) + 1)} aria-label="Photo suivante">
        <Media key={i} src={photo(v, i)} alt={`${v.name}, photo ${i} sur ${n}`} ratio="16/10" />
      </button>
      <div className="gallery__thumbs hide-mobile">
        {Array.from({ length: n }, (_, k) => k + 1).map((k) => (
          <button key={k} type="button" className={k === i ? "is-active" : ""} onClick={() => setI(k)} aria-label={`Afficher la photo ${k}`}>
            <Media src={photo(v, k)} alt="" ratio="3/2" />
          </button>
        ))}
      </div>
      <div className="gallery__dots show-mobile">
        {Array.from({ length: n }, (_, k) => k + 1).map((k) => (
          <button key={k} type="button" className={k === i ? "is-active" : ""} onClick={() => setI(k)} aria-label={`Photo ${k}`} />
        ))}
      </div>
    </div>
  );
}
