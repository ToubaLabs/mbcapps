"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/context";

export type HeroSlide = { src: string; caption: string };

/**
 * État partagé du fond vidéo du hero : enchaîne les clips automatiquement (chacun
 * joue une fois puis passe au suivant). Utilisé par HeroSliderVideo (plein cadre,
 * derrière le texte) et HeroSliderBar (légende + progression + pause, placée juste
 * au-dessus de la barre de recherche, dans le flux normal du hero).
 */
export function useHeroSlider(slides: HeroSlide[]) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    setProgress(0);
    const onTime = () => { if (v.duration) setProgress(v.currentTime / v.duration); };
    const onEnded = () => setIndex((i) => (i + 1) % slides.length);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    if (playing) v.play().catch(() => {});
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slides.length]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {}); else v.pause();
  }, [playing]);

  return { slides, index, setIndex, playing, setPlaying, progress, videoRef };
}

type Slider = ReturnType<typeof useHeroSlider>;

/** Vidéo plein cadre, positionnée en fond du hero (recadrage centré, même traitement pour tous les clips). */
export function HeroSliderVideo({ slides, index, videoRef }: Pick<Slider, "slides" | "index" | "videoRef">) {
  return (
    <video
      key={slides[index].src}
      ref={videoRef}
      className="hero-slider__media"
      src={slides[index].src}
      muted
      playsInline
      preload="auto"
    />
  );
}

/** Légende, barres de progression cliquables et bouton lecture/pause. */
export function HeroSliderBar({ slides, index, setIndex, playing, setPlaying, progress }: Slider) {
  const { t } = useI18n();
  return (
    <div className="hero-slider__bar">
      <span className="hero-slider__caption">{slides[index].caption}</span>
      <div className="hero-slider__segments" role="tablist" aria-label={t.accessibility.videos}>
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className="hero-slider__segment"
            role="tab"
            aria-selected={i === index}
            aria-label={s.caption}
            onClick={() => setIndex(i)}
          >
            <span className="hero-slider__segment-fill" style={{ width: `${i < index ? 100 : i === index ? progress * 100 : 0}%` }} />
          </button>
        ))}
      </div>
      <button type="button" className="hero-slider__playbtn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? t.accessibility.pause : t.accessibility.play}>
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12" /><rect x="8.5" y="1" width="3.5" height="12" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5-9-5.5Z" /></svg>
        )}
      </button>
    </div>
  );
}
