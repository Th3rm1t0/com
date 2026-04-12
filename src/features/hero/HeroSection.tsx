import { type FC, lazy, type ReactNode, Suspense } from "react";
import { useTheme } from "@/app/providers/theme/ThemeProvider";
import { useBoxLazyLoad } from "@/features/hero/useBoxLazyLoad";
import { getHeroGlow } from "@/features/hero/heroThemeStyles";

const LazyBoxRotate = lazy(async () => {
	const module = await import("@/features/hero/BoxRotate");
	return { default: module.BoxRotate };
});

type HeroSectionProps = {
	title: string;
	tagline: ReactNode;
};

export const HeroSection: FC<HeroSectionProps> = ({ title, tagline }) => {
	const { targetRef, shouldLoad } = useBoxLazyLoad();
	const { resolvedTheme } = useTheme();
	const activeGlow = getHeroGlow(resolvedTheme, "active");
	const idleGlow = getHeroGlow(resolvedTheme, "idle");

	return (
		<section ref={targetRef} className="relative min-h-[65vh] overflow-hidden">
			{shouldLoad ? (
				<Suspense
					fallback={
						<div
							aria-hidden="true"
							className="absolute inset-0"
							style={{ background: activeGlow }}
						/>
					}
				>
					<LazyBoxRotate />
				</Suspense>
			) : (
				<div
					aria-hidden="true"
					className="absolute inset-0"
					style={{ background: idleGlow }}
				/>
			)}
			<div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-12 text-center">
				<h1 className="sm:mt-[2em] mt-[4em] font-display text-[clamp(3rem,7vw,4.5rem)] font-bold text-text-primary">
					{title}
				</h1>
				<div className="mx-auto mb-8 mt-5 p-1 max-w-[620px] text-base leading-[1.6] text-text-primary backdrop-blur rounded">
					<p>{tagline}</p>
				</div>
			</div>
		</section>
	);
};
