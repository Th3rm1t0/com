import { type ThreeElements, useFrame } from "@react-three/fiber";
import { type FC, useEffect, useMemo, useRef } from "react";
import { MeshBasicMaterial, type Mesh } from "three";

type RotatingBoxProps = Omit<ThreeElements["mesh"], "material"> & {
	faceColors: readonly string[];
};

export const RotatingBox: FC<RotatingBoxProps> = ({ faceColors, ...meshProps }) => {
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
		if (!meshRef.current) {
			return;
		}
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
