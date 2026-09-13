import boxModelUrl from "@/assets/models/box.glb?url";
import tetrahedronModelUrl from "@/assets/models/tetrahedron.glb?url";

export type HeroModelName = "box" | "tetrahedron";

export type HeroModelDefinition = {
	url: string;
	label: string;
};

export const HERO_MODELS: Record<HeroModelName, HeroModelDefinition> = {
	box: { url: boxModelUrl, label: "Box" },
	tetrahedron: { url: tetrahedronModelUrl, label: "Tetrahedron" },
};

export const HERO_MODEL_NAMES = Object.keys(HERO_MODELS) as HeroModelName[];
