import { AnimatePresence, motion } from "motion/react";
import { AccessScreen } from "./components/AccessScreen/AccessScreen";
import { BirthdayHero } from "./components/BirthdayHero/BirthdayHero";
import { LoadingScene } from "./components/common/LoadingScene";
import { MotionToggle } from "./components/common/MotionToggle";
import { StoryScene } from "./components/common/StoryScene";
import { FinalSurprise } from "./components/FinalSurprise/FinalSurprise";
import { SerenadeScene } from "./components/SerenadeScene/SerenadeScene";
import { useExperience } from "./context/ExperienceContext";

const scenes = {
  ACCESS: AccessScreen,
  LOADING: LoadingScene,
  SERENADE: SerenadeScene,
  WELCOME: BirthdayHero,
  STORY: StoryScene,
  FINALE: FinalSurprise,
} as const;

export default function App() {
  const { state } = useExperience();
  const Scene = scenes[state.scene];

  return (
    <>
      <a href="#main-scene" className="skip-link">Saltar al contenido</a>
      <MotionToggle />
      <AnimatePresence mode="wait">
        <motion.div
          id="main-scene"
          key={state.scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
