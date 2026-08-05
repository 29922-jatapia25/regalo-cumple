import type {
  ExperienceAction,
  ExperienceState,
} from "../types/experience.types";

export const initialExperienceState: ExperienceState = {
  scene: "ACCESS",
  animationsEnabled: true,
};

export function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction,
): ExperienceState {
  switch (action.type) {
    case "GO_TO":
      return { ...state, scene: action.scene };
    case "TOGGLE_ANIMATIONS":
      return { ...state, animationsEnabled: !state.animationsEnabled };
    default:
      return state;
  }
}
