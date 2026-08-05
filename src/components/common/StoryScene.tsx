import { Gift } from "lucide-react";
import { motion } from "motion/react";
import { useExperience } from "../../context/ExperienceContext";
import { LoveLetter } from "../LoveLetter/LoveLetter";
import { LoveReasons } from "../LoveReasons/LoveReasons";
import { LoveTimeline } from "../LoveTimeline/LoveTimeline";
import { PolaroidGallery } from "../PolaroidGallery/PolaroidGallery";
import { Button } from "./Button";
import { StoryNavigation } from "./StoryNavigation";

export function StoryScene() {
  const { dispatch } = useExperience();

  return (
    <main className="min-h-dvh bg-background">
      <StoryNavigation />
      <LoveTimeline />
      <PolaroidGallery />
      <LoveReasons />
      <LoveLetter />

      <section className="relative isolate overflow-hidden px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(111,38,61,.35),transparent_45%)]" />
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative mx-auto max-w-2xl"
        >
          <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <Gift size={21} />
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Todavía falta algo</p>
          <h2 className="mt-3 font-display text-4xl text-cream sm:text-6xl">Una última sorpresa</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted sm:text-base">
            Llegaste hasta aquí, pero guardé un último detalle para cerrar este pequeño viaje.
          </p>
          <Button onClick={() => dispatch({ type: "GO_TO", scene: "FINALE" })} className="mt-7 w-full sm:w-auto">
            Descubrir mi regalo <span aria-hidden="true">→</span>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
