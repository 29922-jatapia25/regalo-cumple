import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AccessScreen } from "./components/AccessScreen/AccessScreen";
import { BirthdayHero } from "./components/BirthdayHero/BirthdayHero";
import { AudioControls } from "./components/common/AudioControls";
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
  const Scene = state.scene === "SERENADE" ? null : scenes[state.scene];
  const showAudioControls = ["SERENADE", "WELCOME", "STORY", "FINALE"].includes(
    state.scene,
  );

  return (
    <>
      <a href="#main-scene" className="skip-link">Saltar al contenido</a>
      <MotionToggle />

      <video
        ref={serenadeVideoRef}
        src={publicAsset(experienceConfig.serenadeVideo)}
        poster={publicAsset(experienceConfig.coverImage)}
        preload="auto"
        playsInline
        loop
        aria-label="Video de la serenata para Daniela"
        aria-hidden={state.scene !== "SERENADE"}
        className={`pointer-events-none fixed inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-500 ${state.scene === "SERENADE" ? "opacity-100" : "opacity-0"}`}
      />

      <AnimatePresence mode="wait">
        <motion.div
          id="main-scene"
          key={state.scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10"
        >
          {state.scene === "SERENADE" ? <SerenadeScene audio={serenade} /> : Scene && <Scene />}
        </motion.div>
      </AnimatePresence>

      {showAudioControls && (
        <AudioControls
          {...serenade}
          onPlay={() => void serenade.play()}
          onPause={serenade.pause}
          onToggleMute={serenade.toggleMute}
          onVolume={serenade.setVolume}
        />
      )}
    </>
  );
}
