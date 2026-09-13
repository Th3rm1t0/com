import { useEffect, useState } from "react";

const DEFAULT_OBJECT_X = -0.6;
const DEFAULT_OBJECT_SCALE = 2.74;

export type ObjectParams = {
	x: number;
	scale: number;
};

const getObjectParams = (width: number): ObjectParams => {
	if (width <= 480) {
		return { x: 0, scale: 1.75 };
	}
	if (width <= 768) {
		return { x: -0.05, scale: 1.95 };
	}
	if (width <= 1024) {
		return { x: -0.24, scale: 2.18 };
	}
	if (width <= 1400) {
		return { x: -0.4, scale: 2.56 };
	}
	return { x: DEFAULT_OBJECT_X, scale: DEFAULT_OBJECT_SCALE };
};

export const useResponsiveObjectParams = (): ObjectParams => {
	const [params, setParams] = useState<ObjectParams>(() =>
		getObjectParams(window.innerWidth),
	);

	useEffect(() => {
		const handleResize = () => {
			setParams(getObjectParams(window.innerWidth));
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return params;
};
