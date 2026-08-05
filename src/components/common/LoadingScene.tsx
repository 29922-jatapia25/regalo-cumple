import { useEffect } from "react";
import { motion } from "motion/react";
import { experienceConfig } from "../../config/experience.config";
import { useExperience } from "../../context/ExperienceContext";
import { usePreloadMedia } from "../../hooks/usePreloadMedia";
import { publicAsset } from "../../utils/publicAsset";

export function LoadingScene() {
  const { dispatch } = useExperience();
  const { progress, preload } = usePreloadMedia();

  useEffect(() => {
    let active = true;
    const startedAt = Date.now();

    void preload(
      publicAsset(experienceConfig.coverImage),
      publicAsset(experienceConfig.audio.serenade),
    ).then(() => {
      const remaining = Math.max(0, 1800 - (Date.now() - startedAt));
      window.setTimeout(() => {
        if (active) dispatch({ type: "GO_TO", scene: "SERENADE" });
      }, remaining);
    });

    return () => {
      active = false;
    };
  }, [dispatch, preload]);

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#080911] px-6 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-xs"
      >
        <div className="mx-auto mb-8 grid size-16 place-items-center rounded-full border border-gold/25">
          <span className="loading-heart text-2xl text-dusty-rose" aria-hidden="true">
            ♥
          </span>
        </div>
        <p className="font-display text-2xl text-cream">Encendiendo las luces…</p>
        <p className="mt-2 text-sm text-muted">Un momento, esto es solo para ti</p>
        <div className="mt-7 h-1 overflow-hidden rounded-full bg-white/8" aria-label={`Carga ${progress}%`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-wine via-dusty-rose to-gold"
            animate={{ width: `${Math.max(progress, 15)}%` }}
          />
        </div>
      </motion.div>
    </main>
  );
}
