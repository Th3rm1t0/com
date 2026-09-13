import { useFrame, useThree } from "@react-three/fiber";
import { type FC, useEffect, useRef } from "react";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

const ASCII_CHAR_SET = " .:-=+*#%@";

type AsciiRendererProps = {
	asciiColor: string;
	invert: boolean;
};

export const AsciiRenderer: FC<AsciiRendererProps> = ({
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
		// Must size immediately: the resize-only effect below won't rerun here.
		effect.setSize(gl.domElement.width, gl.domElement.height);

		effect.domElement.style.position = "absolute";
		effect.domElement.style.top = "0";
		effect.domElement.style.left = "0";
		effect.domElement.style.pointerEvents = "none";
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
	}, [gl, invert]);

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
