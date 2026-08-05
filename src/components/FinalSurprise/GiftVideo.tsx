import { useState } from "react";
import { experienceConfig } from "../../config/experience.config";
import { publicAsset } from "../../utils/publicAsset";

export default function GiftVideo() {
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-muted">
        Agrega el video en <strong className="text-cream">public/video/sorpresa-final.mp4</strong> para mostrarlo aquí.
      </p>
    );
  }

  return (
    <video
      controls
      playsInline
      preload="metadata"
      onError={() => setUnavailable(true)}
      className="aspect-video w-full rounded-2xl border border-white/10 bg-black/40 shadow-2xl"
    >
      <source src={publicAsset(experienceConfig.finalGift.video)} type="video/mp4" />
      Tu navegador no puede reproducir este video.
    </video>
  );
}
