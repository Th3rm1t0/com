import { type FC } from "react";

type GlitchTextProps = {
  text: string;
  className?: string;
};

export const GlitchText: FC<GlitchTextProps> = ({ text, className = "" }) => {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
};
