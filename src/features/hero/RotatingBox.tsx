import { type ThreeElements, useFrame } from "@react-three/fiber";
import { type FC, useEffect, useMemo, useRef } from "react";
import { MeshBasicMaterial, type Mesh } from "three";

type RotatingBoxProps = Omit<ThreeElements["mesh"], "material"> & {
	faceColors: readonly string[];
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
const MAX_DELTA_SECONDS = 1 / 30;

const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min);

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

export const RotatingBox: FC<RotatingBoxProps> = ({ faceColors, ...meshProps }) => {
	const meshRef = useRef<Mesh>(null);
	const rotationStateRef = useRef<RotationState>({
		target: { x: 0, y: 0, z: 0 },
		velocity: { x: 0, y: 0, z: 0 },
		nextKickAt: 0,
	});
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
		if (!meshRef.current) {
			return;
		}

		const { clock } = _state;
		const elapsed = clock.getElapsedTime();
		const dt = Math.min(delta, MAX_DELTA_SECONDS);
		const rotationState = rotationStateRef.current;

		if (rotationState.nextKickAt === 0) {
			rotationState.nextKickAt = elapsed + BEAT_INTERVAL_SECONDS;
		}

		while (elapsed >= rotationState.nextKickAt) {
			const kick = createRandomKick();
			rotationState.target.x += kick.x;
			rotationState.target.y += kick.y;
			rotationState.target.z += kick.z;
			rotationState.nextKickAt += BEAT_INTERVAL_SECONDS;
		}

		const springX = rotationState.target.x - meshRef.current.rotation.x;
		rotationState.velocity.x +=
			(springX * SPRING_STIFFNESS - rotationState.velocity.x * SPRING_DAMPING) * dt;
		meshRef.current.rotation.x += rotationState.velocity.x * dt;

		const springY = rotationState.target.y - meshRef.current.rotation.y;
		rotationState.velocity.y +=
			(springY * SPRING_STIFFNESS - rotationState.velocity.y * SPRING_DAMPING) * dt;
		meshRef.current.rotation.y += rotationState.velocity.y * dt;

		const springZ = rotationState.target.z - meshRef.current.rotation.z;
		rotationState.velocity.z +=
			(springZ * SPRING_STIFFNESS - rotationState.velocity.z * SPRING_DAMPING) * dt;
		meshRef.current.rotation.z += rotationState.velocity.z * dt;
	});

	return (
		<mesh {...meshProps} ref={meshRef} material={materials}>
			<boxGeometry args={[1, 1, 1]} />
		</mesh>
	);
};
