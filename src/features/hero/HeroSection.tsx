import { type FC, lazy, Suspense } from "react";
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
						<h1 className="mt-[3.25rem] whitespace-nowrap font-display text-[clamp(2.35rem,11.2vw,5.05rem)] font-bold leading-[0.92] tracking-[-0.04em] text-text-primary sm:mt-[2.5rem] lg:mt-0 lg:text-[clamp(4.2rem,7.1vw,6.4rem)] xl:text-[clamp(4.8rem,6.5vw,7rem)]">
							{title}
						</h1>
					</div>
					<div aria-hidden="true" className="hidden h-[19rem] lg:block xl:h-[22rem]" />
				</div>
			</div>
		</section>
	);
};
