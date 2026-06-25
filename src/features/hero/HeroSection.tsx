import { type FC, lazy, Suspense } from "react";
import { GlitchText } from "@/features/hero/GlitchText";
import { useBoxLazyLoad } from "@/features/hero/useBoxLazyLoad";

const LazyBoxRotate = lazy(async () => {
	const module = await import("@/features/hero/BoxRotate");
	return { default: module.BoxRotate };
});

type HeroSectionProps = {
	title: string;
};

export const HeroSection: FC<HeroSectionProps> = ({ title }) => {
	const { targetRef, shouldLoad } = useBoxLazyLoad();

	return (
		<section
			ref={targetRef}
			className="relative overflow-hidden"
		>
			<div className="absolute inset-0 lg:left-[38%] xl:left-[40%]">
				{shouldLoad ? (
					<Suspense
						fallback={
							<div aria-hidden="true" className="absolute inset-0" />
						}
					>
						<LazyBoxRotate />
					</Suspense>
				) : (
					<div aria-hidden="true" className="absolute inset-0" />
				)}
			</div>
			<div className="relative z-10 mx-auto flex min-h-[65vh] w-full max-w-6xl items-center px-6 py-12 sm:px-8 lg:min-h-[72vh] lg:px-10 lg:py-16">
				<div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.74fr)] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] xl:gap-8">
					<div className="relative z-20 flex flex-col items-center text-center lg:-mr-16 lg:items-start lg:text-left xl:-mr-20">
						<h1 className="mt-[3.25rem] whitespace-nowrap font-display text-[clamp(2.45rem,12.8vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-text-primary sm:mt-[2.5rem] lg:mt-0 lg:text-[clamp(5.1rem,8.6vw,7.9rem)] xl:text-[clamp(5.9rem,7.8vw,9rem)]">
							<GlitchText text={title} />
						</h1>
					</div>
					<div aria-hidden="true" className="hidden h-[19rem] lg:block xl:h-[22rem]" />
				</div>
			</div>
		</section>
	);
};
