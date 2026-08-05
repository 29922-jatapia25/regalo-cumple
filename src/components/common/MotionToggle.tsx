import { Pause, Sparkles } from "lucide-react";
import { useExperience } from "../../context/ExperienceContext";

export function MotionToggle() {
  const { state, dispatch } = useExperience();
  const label = state.animationsEnabled
    ? "Detener animaciones decorativas"
    : "Activar animaciones decorativas";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => dispatch({ type: "TOGGLE_ANIMATIONS" })}
      className="fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 grid size-11 place-items-center rounded-full border border-white/10 bg-background/75 text-muted shadow-lg backdrop-blur-xl transition hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-5 sm:top-5"
    >
      {state.animationsEnabled ? <Pause size={17} /> : <Sparkles size={17} />}
    </button>
  );
}
