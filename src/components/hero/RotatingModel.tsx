import { type ThreeElements, useFrame } from "@react-three/fiber";
import { type FC, type RefObject, useEffect, useMemo, useRef } from "react";
import { type Group, Mesh, MeshStandardMaterial } from "three";

type RotatingModelProps = Omit<ThreeElements["group"], "children"> & {
	model: Group;
	color: string;
	/** When provided, driven every frame instead of always fully opaque (used for cross-fades). */
	opacityRef?: RefObject<number>;
};

type RotationState = {
	target: { x: number; y: number; z: number };
	velocity: { x: number; y: number; z: number };
	nextKickAt: number;
};

const BEAT_INTERVAL_SECONDS = 2.5;
const SPRING_STIFFNESS = 50;
const SPRING_DAMPING = 7;
const KICK_MIN_ANGLE = Math.PI * 0.65;
const KICK_MAX_ANGLE = Math.PI * 1.05;
const FULL_ROTATION = Math.PI * 2;
const MAX_DELTA_SECONDS = 1 / 30;
const RESUME_SYNC_GAP_SECONDS = BEAT_INTERVAL_SECONDS * 2;

const randomBetween = (min: number, max: number): number =>
	min + Math.random() * (max - min);

const createRandomKick = (): { x: number; y: number; z: number } => {
	let x = randomBetween(-1, 1);
	let y = randomBetween(-1, 1);
	let z = randomBetween(-1, 1);
	const length = Math.hypot(x, y, z) || 1;
	x /= length;
	y /= length;
	z /= length;

	const magnitude = randomBetween(KICK_MIN_ANGLE, KICK_MAX_ANGLE);
	return { x: x * magnitude, y: y * magnitude, z: z * magnitude };
};

const createRandomInitialRotation = (): {
	x: number;
	y: number;
	z: number;
} => ({
	x: randomBetween(0, FULL_ROTATION),
	y: randomBetween(0, FULL_ROTATION),
	z: randomBetween(0, FULL_ROTATION),
});

const forEachStandardMaterial = (
	model: Group,
	fn: (material: MeshStandardMaterial) => void,
): void => {
	model.traverse((child) => {
		if (
			child instanceof Mesh &&
			child.material instanceof MeshStandardMaterial
		) {
			fn(child.material);
		}
	});
};

/** Tints every standard-material mesh in the model to a single theme accent color. */
const applyAccentColor = (model: Group, color: string): void => {
	forEachStandardMaterial(model, (material) => {
		material.color.set(color);
		material.transparent = true;
	});
};

const disposeModel = (model: Group): void => {
	model.traverse((child) => {
		if (child instanceof Mesh) {
			child.geometry.dispose();
			for (const material of Array.isArray(child.material)
				? child.material
				: [child.material]) {
				material.dispose();
			}
		}
	});
};

export const RotatingModel: FC<RotatingModelProps> = ({
	model,
	color,
	opacityRef,
	...groupProps
}) => {
	const initialRotation = useMemo(() => createRandomInitialRotation(), []);
	const groupRef = useRef<Group>(null);
	const rotationStateRef = useRef<RotationState>({
		target: { ...initialRotation },
		velocity: { x: 0, y: 0, z: 0 },
		nextKickAt: 0,
	});

	useEffect(() => {
		applyAccentColor(model, color);
	}, [model, color]);

	useEffect(() => {
		return () => {
			disposeModel(model);
		};
	}, [model]);

	useFrame((_state, delta) => {
		if (opacityRef) {
			const opacity = opacityRef.current;
			forEachStandardMaterial(model, (material) => {
				material.opacity = opacity;
			});
		}

		if (!groupRef.current) {
			return;
		}

		const { clock } = _state;
		const elapsed = clock.getElapsedTime();
		const dt = Math.min(delta, MAX_DELTA_SECONDS);
		const rotationState = rotationStateRef.current;

		if (rotationState.nextKickAt === 0) {
			rotationState.nextKickAt = elapsed + BEAT_INTERVAL_SECONDS;
		}

		const lagSeconds = elapsed - rotationState.nextKickAt;
		if (lagSeconds >= 0) {
			// If the tab was inactive for a while, skip backlogged kicks and restart the beat schedule.
			if (lagSeconds > RESUME_SYNC_GAP_SECONDS) {
				rotationState.nextKickAt = elapsed + BEAT_INTERVAL_SECONDS;
			} else {
				const kick = createRandomKick();
				rotationState.target.x += kick.x;
				rotationState.target.y += kick.y;
				rotationState.target.z += kick.z;
				rotationState.nextKickAt += BEAT_INTERVAL_SECONDS;
			}
		}

		const springX = rotationState.target.x - groupRef.current.rotation.x;
		rotationState.velocity.x +=
			(springX * SPRING_STIFFNESS - rotationState.velocity.x * SPRING_DAMPING) *
			dt;
		groupRef.current.rotation.x += rotationState.velocity.x * dt;

		const springY = rotationState.target.y - groupRef.current.rotation.y;
		rotationState.velocity.y +=
			(springY * SPRING_STIFFNESS - rotationState.velocity.y * SPRING_DAMPING) *
			dt;
		groupRef.current.rotation.y += rotationState.velocity.y * dt;

		const springZ = rotationState.target.z - groupRef.current.rotation.z;
		rotationState.velocity.z +=
			(springZ * SPRING_STIFFNESS - rotationState.velocity.z * SPRING_DAMPING) *
			dt;
		groupRef.current.rotation.z += rotationState.velocity.z * dt;
	});

	return (
		<group
			{...groupProps}
			ref={groupRef}
			rotation={[initialRotation.x, initialRotation.y, initialRotation.z]}
		>
			<primitive object={model} />
		</group>
	);
};
