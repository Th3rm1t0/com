import { useEffect, useState } from "react";
import type { Group } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export const useHeroModel = (url: string): Group | null => {
	const [model, setModel] = useState<Group | null>(null);

	useEffect(() => {
		let cancelled = false;

		loader.load(
			url,
			(gltf) => {
				if (!cancelled) {
					setModel(gltf.scene);
				}
			},
			undefined,
			(error) => {
				console.error(`Failed to load hero model: ${url}`, error);
			},
		);

		return () => {
			cancelled = true;
		};
	}, [url]);

	return model;
};
