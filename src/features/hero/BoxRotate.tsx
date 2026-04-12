import {
	Canvas,
	type ThreeElements,
	useFrame,
	useThree,
} from "@react-three/fiber";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";

const ASCII_CHAR_SET = " .:-=+*#%@";
// Corresponds to --color-text-muted token
const ASCII_COLOR = "#727272";
// corresponds to --color-surface-dark
const SURFACE_DARK_COLOR = "#050914";
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
	const meshRef = useRef<Mesh>(null);

	useFrame((_state, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.x += delta * 0.5;
		meshRef.current.rotation.y += delta * 0.7;
		meshRef.current.rotation.z += delta * 0.3;
	});

	return (
		<mesh {...props} ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="#ffffff" />
		</mesh>
	);
};

const AsciiRenderer: FC = () => {
	const { gl, size, scene, camera } = useThree();
	const effectRef = useRef<AsciiEffect | null>(null);

	useEffect(() => {
		const effect = new AsciiEffect(gl, ASCII_CHAR_SET, {
			invert: true,
			resolution: 0.1,
		});
		effect.domElement.style.position = "absolute";
		effect.domElement.style.top = "0";
		effect.domElement.style.left = "0";
		effect.domElement.style.pointerEvents = "none";
		effect.domElement.style.color = ASCII_COLOR;
		effect.domElement.style.backgroundColor = "transparent";
		effectRef.current = effect;

		const parent = gl.domElement.parentNode;
		parent?.appendChild(effect.domElement);
		gl.domElement.style.display = "none";

		return () => {
			effect.domElement.remove();
			gl.domElement.style.display = "";
		};
	}, [gl]);

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

	return (
		<Canvas
			style={{ position: "absolute", inset: 0 }}
			camera={{ position: [0, 0, 4] }}
		>
			<color attach="background" args={[SURFACE_DARK_COLOR]} />
			<ambientLight intensity={0.01} />
			<directionalLight color={ASCII_COLOR} position={[2.5, 4, 6]} />
			<RotatingBox position={[x, 0, 0]} scale={scale} />
			<AsciiRenderer />
		</Canvas>
	);
};
