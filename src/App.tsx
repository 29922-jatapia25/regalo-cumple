import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AccessScreen } from "./components/AccessScreen/AccessScreen";
import { BirthdayHero } from "./components/BirthdayHero/BirthdayHero";
import { LoadingScene } from "./components/common/LoadingScene";
import { MotionToggle } from "./components/common/MotionToggle";
import { StoryScene } from "./components/common/StoryScene";
import { FinalSurprise } from "./components/FinalSurprise/FinalSurprise";
import { SerenadeScene } from "./components/SerenadeScene/SerenadeScene";
import { experienceConfig } from "./config/experience.config";
import { useExperience } from "./context/ExperienceContext";
import { useAudio } from "./hooks/useAudio";
import { publicAsset } from "./utils/publicAsset";

const scenes = {
  ACCESS: AccessScreen,
  LOADING: LoadingScene,
  WELCOME: BirthdayHero,
  STORY: StoryScene,
  FINALE: FinalSurprise,
} as const;

export default function App() {
  const { state } = useExperience();
  const serenadeVideoRef = useRef<HTMLVideoElement>(null);
  const serenade = useAudio(serenadeVideoRef);
  const isSerenade = state.scene === "SERENADE";
  const Scene = state.scene === "SERENADE" ? null : scenes[state.scene];
  const hasSerenadeControl = ["SERENADE", "WELCOME", "STORY", "FINALE"].includes(
    state.scene,
  );

  return (
    <>
      <a href="#main-scene" className="skip-link">Saltar al contenido</a>
      <MotionToggle
        mediaControl={hasSerenadeControl ? {
          isPlaying: serenade.isPlaying,
          onToggle: serenade.isPlaying
            ? serenade.pause
            : () => void serenade.play(),
        } : undefined}
      />

      <div
        className={isSerenade
          ? "relative mx-auto my-2 flex min-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[30rem] flex-col overflow-hidden rounded-[2rem] border border-gold/70 bg-background shadow-[0_0_50px_rgba(198,161,91,.14),inset_0_0_55px_rgba(198,161,91,.06)] sm:my-0 sm:block sm:min-h-0 sm:w-full sm:max-w-none sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none"
          : undefined}
      >
        <div
          aria-hidden={!isSerenade}
          className={isSerenade
            ? "relative order-2 mx-4 mb-5 aspect-video overflow-hidden rounded-[1.5rem] border border-gold/35 bg-black shadow-[0_18px_45px_rgba(0,0,0,.45)] sm:pointer-events-none sm:fixed sm:inset-0 sm:z-0 sm:m-0 sm:aspect-auto sm:rounded-none sm:border-0 sm:shadow-none"
            : "pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0"}
        >
          <video
            ref={serenadeVideoRef}
            src={publicAsset(experienceConfig.serenadeVideo)}
            poster={publicAsset(experienceConfig.coverImage)}
            preload="auto"
            playsInline
            loop
            aria-label="Video de la serenata para Daniela"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            id="main-scene"
            key={state.scene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 order-1"
          >
            {isSerenade ? <SerenadeScene audio={serenade} /> : Scene && <Scene />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
