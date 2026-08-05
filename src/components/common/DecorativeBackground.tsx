import { useExperience } from "../../context/ExperienceContext";

export function DecorativeBackground({ dense = false }: { dense?: boolean }) {
  const { state } = useExperience();
  const count = dense ? 22 : 12;

  if (!state.animationsEnabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          className="decorative-star"
          key={index}
          style={{
            left: `${(index * 37 + 11) % 97}%`,
            top: `${(index * 53 + 7) % 92}%`,
            animationDelay: `${(index % 7) * 0.7}s`,
            animationDuration: `${4 + (index % 5)}s`,
          }}
        />
      ))}
      <div className="ambient-orb ambient-orb--one" />
      <div className="ambient-orb ambient-orb--two" />
    </div>
  );
}
