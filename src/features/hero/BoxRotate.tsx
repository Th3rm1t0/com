import { Canvas } from "@react-three/fiber";
import type { FC } from "react";
import { useTheme } from "@/app/providers/theme/ThemeProvider";
import { AsciiRenderer } from "@/features/hero/AsciiRenderer";
import { BOX_THEME_COLORS } from "@/features/hero/boxTheme";
import { RotatingBox } from "@/features/hero/RotatingBox";
import { useResponsiveBoxParams } from "@/features/hero/useResponsiveBoxParams";

export const BoxRotate: FC = () => {
	const { x, scale } = useResponsiveBoxParams();
	const { resolvedTheme } = useTheme();
	const palette = BOX_THEME_COLORS[resolvedTheme];

	return (
		<Canvas
			gl={{ alpha: true }}
			style={{ position: "absolute", inset: 0 }}
			camera={{ position: [0, 0, 4] }}
		>
			<color attach="background" args={[palette.background]} />
			<RotatingBox faceColors={palette.faces} position={[x, 0, 0]} scale={scale} />
			<AsciiRenderer asciiColor={palette.ascii} invert={palette.invert} />
		</Canvas>
	);
};
