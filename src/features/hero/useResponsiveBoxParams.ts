import { useEffect, useState } from "react";

const DEFAULT_BOX_X = -0.6;
const DEFAULT_BOX_SCALE = 2.5;

export type BoxParams = {
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

export const useResponsiveBoxParams = (): BoxParams => {
	const [params, setParams] = useState<BoxParams>(() => {
		if (typeof window === "undefined") {
			return { x: DEFAULT_BOX_X, scale: DEFAULT_BOX_SCALE };
		}
		return getBoxParams(window.innerWidth);
	});

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const handleResize = () => {
			setParams(getBoxParams(window.innerWidth));
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return params;
};
