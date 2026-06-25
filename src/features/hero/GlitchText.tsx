import { type FC } from "react";
import { useGlitchEffect } from "./useGlitchEffect";

type GlitchTextProps = {
  text: string;
  className?: string;
};

export const GlitchText: FC<GlitchTextProps> = ({ text, className = "" }) => {
  const ref = useGlitchEffect();

  return (
    <span ref={ref} className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
};
