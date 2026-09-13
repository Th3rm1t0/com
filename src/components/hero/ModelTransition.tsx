import { useFrame } from "@react-three/fiber";
import { type FC, useEffect, useRef, useState } from "react";
import type { Group } from "three";
import { RotatingModel } from "@/components/hero/RotatingModel";
import { useHeroModel } from "@/components/hero/useHeroModel";

const TRANSITION_SECONDS = 0.5;

type ModelTransitionProps = {
	url: string;
	color: string;
	position: readonly [number, number, number];
	scale: number;
};

/**
 * Cross-fades between the previous and newly-selected hero model instead of
 * popping instantly. Vertex-level morphing isn't attempted here: arbitrary
 * models dropped into src/assets/models/ won't generally share the same
 * topology, so a fade is the transition that keeps working for any of them.
 */
export const ModelTransition: FC<ModelTransitionProps> = ({
	url,
	color,
	position,
	scale,
}) => {
	const loadedModel = useHeroModel(url);
	const [current, setCurrent] = useState<Group | null>(null);
	const [incoming, setIncoming] = useState<Group | null>(null);
	const progressRef = useRef(0);
	const currentOpacityRef = useRef(1);
	const incomingOpacityRef = useRef(0);

	useEffect(() => {
		if (!loadedModel || loadedModel === current || loadedModel === incoming) {
			return;
		}
		if (current === null) {
			currentOpacityRef.current = 1;
			setCurrent(loadedModel);
			return;
		}
		progressRef.current = 0;
		incomingOpacityRef.current = 0;
		setIncoming(loadedModel);
	}, [loadedModel, current, incoming]);

	useFrame((_state, delta) => {
		if (!incoming) {
			return;
		}
		progressRef.current = Math.min(
			1,
			progressRef.current + delta / TRANSITION_SECONDS,
		);
		currentOpacityRef.current = 1 - progressRef.current;
		incomingOpacityRef.current = progressRef.current;

		if (progressRef.current >= 1) {
			currentOpacityRef.current = 1;
			setCurrent(incoming);
			setIncoming(null);
		}
	});

	return (
		<>
			{current ? (
				<RotatingModel
					key={current.uuid}
					model={current}
					color={color}
					position={position}
					scale={scale}
					opacityRef={currentOpacityRef}
				/>
			) : null}
			{incoming ? (
				<RotatingModel
					key={incoming.uuid}
					model={incoming}
					color={color}
					position={position}
					scale={scale}
					opacityRef={incomingOpacityRef}
				/>
			) : null}
		</>
	);
};
