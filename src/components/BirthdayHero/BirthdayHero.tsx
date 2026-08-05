import { ArrowDown, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { experienceConfig } from "../../config/experience.config";
import { useExperience } from "../../context/ExperienceContext";
import { publicAsset } from "../../utils/publicAsset";
import { Button } from "../common/Button";

export function BirthdayHero() {
  const { state, dispatch } = useExperience();

  return (
    <main className="min-h-dvh overflow-hidden bg-background p-3 sm:p-5 lg:p-7">
      <section className="relative isolate min-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[1.7rem] border border-white/10 sm:min-h-[calc(100dvh-2.5rem)] sm:rounded-[2.4rem]">
        <motion.img
          src={publicAsset("images/gallery/caminata.webp")}
          alt="Pareja caminando junta durante una tarde especial"
          className="absolute inset-0 h-full w-full object-cover object-center"
          initial={{ scale: 1.03 }}
          animate={{ scale: state.animationsEnabled ? 1.1 : 1.03 }}
          transition={{ duration: 22, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,18,.18),rgba(8,9,18,.2)_34%,rgba(8,9,18,.94)_91%),linear-gradient(90deg,rgba(8,9,18,.38),transparent_70%)]" />

        <div className="relative flex min-h-[calc(100dvh-1.5rem)] flex-col justify-end p-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:min-h-[calc(100dvh-2.5rem)] sm:p-10 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/70">
              <span className="h-px w-10 bg-gold" />
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-gold" /> Nuestro lugar favorito
              </span>
            </div>
            <p className="font-display text-3xl italic text-dusty-rose sm:text-4xl">
              Para ti,
            </p>
            <h1 className="mt-1 font-display text-[clamp(3.5rem,13vw,8.5rem)] leading-[0.86] tracking-[-0.045em] text-cream">
              {experienceConfig.girlfriendName}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-cream/78 sm:text-base">
              {experienceConfig.romanticSubtitle} Esta es una pequeña colección
              de todo lo que hace tan bonito caminar contigo.
            </p>
            <Button
              onClick={() => dispatch({ type: "GO_TO", scene: "STORY" })}
              className="mt-7 w-full sm:w-auto"
            >
              Recorrer nuestra historia <ArrowDown size={17} />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
