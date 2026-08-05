import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from "react";
import {
  experienceReducer,
  initialExperienceState,
} from "../reducers/experience.reducer";
import type {
  ExperienceAction,
  ExperienceState,
} from "../types/experience.types";

interface ExperienceContextValue {
  state: ExperienceState;
  dispatch: Dispatch<ExperienceAction>;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    experienceReducer,
    initialExperienceState,
  );
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

// El hook vive junto al provider para mantener una única API de contexto.
// eslint-disable-next-line react-refresh/only-export-components
export function useExperience(): ExperienceContextValue {
  const value = useContext(ExperienceContext);
  if (!value) {
    throw new Error("useExperience debe usarse dentro de ExperienceProvider");
  }
  return value;
}
