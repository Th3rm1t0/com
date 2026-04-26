import { useEffect, useState } from "react";

const DEFAULT_BOX_X = -0.32;
const DEFAULT_BOX_SCALE = 2.74;

export type BoxParams = {
	x: number;
	scale: number;
};

const getBoxParams = (width: number): BoxParams => {
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
