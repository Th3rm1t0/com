import {
	Canvas,
	type ThreeElements,
	useFrame,
	useThree,
} from "@react-three/fiber";
import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/app/providers/theme/ThemeProvider";
import { MeshBasicMaterial, type Mesh } from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";

const ASCII_CHAR_SET = " .:-=+*#%@";

const THEME_COLORS = {
	dark: {
		ascii: "#94a3b8",
		background: "#020617",
		faces: ["#f8fafc", "#e2e8f0", "#cbd5e1", "#b8c4d7", "#dce5f0", "#aebcd2"],
		invert: true,
	},
	light: {
		ascii: "#0f172a",
		background: "#f8fafc",
		faces: ["#0f172a", "#1e293b", "#334155", "#475569", "#111827", "#243244"],
		invert: false,
	},
} as const;

const DEFAULT_BOX_X = -0.6;
const DEFAULT_BOX_SCALE = 2.5;

type BoxParams = {
	x: number;
	scale: number;
};

const getBoxParams = (width: number): BoxParams => {
	if (width <= 480) {
		return { x: -0.05, scale: 1.9 };
	}
	if (width <= 768) {
		return { x: -0.15, scale: 2.0 };
	}
	if (width <= 1024) {
		return { x: -0.35, scale: 2.3 };
	}
	return { x: DEFAULT_BOX_X, scale: DEFAULT_BOX_SCALE };
};

const useResponsiveBoxParams = () => {
	const [params, setParams] = useState<BoxParams>(() => {
		if (typeof window === "undefined") {
			return { x: DEFAULT_BOX_X, scale: DEFAULT_BOX_SCALE };
		}
		return getBoxParams(window.innerWidth);
	});

	useEffect(() => {
		if (typeof window === "undefined") return;
		const handleResize = () => setParams(getBoxParams(window.innerWidth));
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return params;
};

const RotatingBox: FC<ThreeElements["mesh"]> = (props) => {
	const { faceColors, ...meshProps } = props as ThreeElements["mesh"] & {
		faceColors: readonly string[];
	};
	const meshRef = useRef<Mesh>(null);
	const materials = useMemo(
		() => faceColors.map((faceColor) => new MeshBasicMaterial({ color: faceColor })),
		[faceColors],
	);

	useEffect(() => {
		return () => {
			for (const material of materials) {
				material.dispose();
			}
		};
	}, [materials]);

	useFrame((_state, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.x += delta * 0.5;
		meshRef.current.rotation.y += delta * 0.7;
		meshRef.current.rotation.z += delta * 0.3;
	});

	return (
		<mesh {...meshProps} ref={meshRef} material={materials}>
			<boxGeometry args={[1, 1, 1]} />
		</mesh>
	);
};

const AsciiRenderer: FC<{ asciiColor: string; invert: boolean }> = ({
	asciiColor,
	invert,
}) => {
	const { gl, size, scene, camera } = useThree();
	const effectRef = useRef<AsciiEffect | null>(null);

	useEffect(() => {
		const effect = new AsciiEffect(gl, ASCII_CHAR_SET, {
			invert,
			resolution: 0.11,
		});
		effect.domElement.style.position = "absolute";
		effect.domElement.style.top = "0";
		effect.domElement.style.left = "0";
		effect.domElement.style.pointerEvents = "none";
		effect.domElement.style.color = asciiColor;
		effect.domElement.style.backgroundColor = "transparent";
		effect.domElement.style.filter = "contrast(1.14)";
		effectRef.current = effect;

		const parent = gl.domElement.parentNode;
		parent?.appendChild(effect.domElement);
		gl.domElement.style.display = "none";

		return () => {
			effect.domElement.remove();
			gl.domElement.style.display = "";
		};
	}, [gl, asciiColor, invert]);

	useEffect(() => {
		if (effectRef.current) {
			effectRef.current.domElement.style.color = asciiColor;
		}
	}, [asciiColor]);

	useEffect(() => {
		effectRef.current?.setSize(size.width, size.height);
	}, [size]);

	useFrame(() => {
		effectRef.current?.render(scene, camera);
	}, 1);

	return null;
};

export const BoxRotate: FC = () => {
	const { x, scale } = useResponsiveBoxParams();
	const { resolvedTheme } = useTheme();
	const palette = THEME_COLORS[resolvedTheme];

	return (
		<Canvas
			gl={{ alpha: true }}
			style={{ position: "absolute", inset: 0 }}
			camera={{ position: [0, 0, 4] }}
		>
			{palette.background && <color attach="background" args={[palette.background]} />}
			<RotatingBox faceColors={palette.faces} position={[x, 0, 0]} scale={scale} />
			<AsciiRenderer asciiColor={palette.ascii} invert={palette.invert} />
		</Canvas>
	);
};
