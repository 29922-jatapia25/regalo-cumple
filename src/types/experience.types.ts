export type ExperienceScene =
  | "ACCESS"
  | "LOADING"
  | "SERENADE"
  | "WELCOME"
  | "STORY"
  | "FINALE";

export interface ExperienceState {
  scene: ExperienceScene;
  animationsEnabled: boolean;
}

export type ExperienceAction =
  | { type: "GO_TO"; scene: ExperienceScene }
  | { type: "TOGGLE_ANIMATIONS" };

export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  location?: string;
}

export interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  rotation: number;
}

export interface LoveReason {
  id: number;
  title: string;
  message: string;
  icon?: string;
}
