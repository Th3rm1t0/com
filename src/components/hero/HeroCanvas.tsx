import { Canvas } from "@react-three/fiber";
import { type FC, useEffect, useState } from "react";
import { AsciiRenderer } from "@/components/hero/AsciiRenderer";
import { HERO_THEME_COLORS } from "@/components/hero/heroTheme";
import { ModelSwitcher } from "@/components/hero/ModelSwitcher";
import { ModelTransition } from "@/components/hero/ModelTransition";
import {
	HERO_MODEL_NAMES,
	HERO_MODELS,
	type HeroModelName,
} from "@/components/hero/models";
import { useResponsiveObjectParams } from "@/components/hero/useResponsiveObjectParams";
import { getCurrentResolvedTheme, type ResolvedTheme } from "@/lib/theme";

type HeroCanvasProps = {
	model?: HeroModelName;
};

export const HeroCanvas: FC<HeroCanvasProps> = ({ model = "box" }) => {
	const { x, scale } = useResponsiveObjectParams();
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
		getCurrentResolvedTheme,
	);
	const [selectedModel, setSelectedModel] = useState<HeroModelName>(model);

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setResolvedTheme(getCurrentResolvedTheme());
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
		return () => observer.disconnect();
	}, []);

	const palette = HERO_THEME_COLORS[resolvedTheme];

	return (
		<>
			<Canvas
				gl={{ alpha: true }}
				style={{ position: "absolute", inset: 0 }}
				camera={{ position: [0, 0, 4] }}
			>
				<color attach="background" args={[palette.background]} />
				<ambientLight intensity={0.65} />
				<directionalLight position={[2.5, 3, 4]} intensity={1.4} />
				<ModelTransition
					url={HERO_MODELS[selectedModel].url}
					color={palette.accent}
					position={[x, 0, 0]}
					scale={scale}
				/>
				<AsciiRenderer asciiColor={palette.ascii} invert={palette.invert} />
			</Canvas>
			<ModelSwitcher
				names={HERO_MODEL_NAMES}
				models={HERO_MODELS}
				selected={selectedModel}
				onSelect={setSelectedModel}
			/>
		</>
	);
};
