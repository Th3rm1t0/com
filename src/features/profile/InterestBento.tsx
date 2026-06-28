import type { FC } from "react";

type Interest = {
	label: string;
	icon: string;
	accent: string;
	span?: "wide";
};

type InterestBentoProps = {
	interests: readonly Interest[];
};

export type { Interest };

export const InterestBento: FC<InterestBentoProps> = ({ interests }) => {
	return (
		<section className="px-4 py-12">
			<h2 className="mb-8 text-center text-2xl font-bold tracking-wide text-text-primary md:text-3xl">
				Interests
			</h2>
			<div className="mx-auto grid max-w-3xl auto-rows-[8rem] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
				{interests.map((interest) => (
					<div
						key={interest.label}
						className={`group relative flex cursor-default flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border-subtle transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl ${
							interest.span === "wide" ? "col-span-2" : ""
						}`}
						style={{
							background: `linear-gradient(135deg, ${interest.accent}08, ${interest.accent}18)`,
						}}
					>
						<div
							className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							style={{
								background: `radial-gradient(circle at 50% 50%, ${interest.accent}25, transparent 70%)`,
							}}
						/>
						<span className="relative text-4xl">
							{interest.icon}
						</span>
						<span className="relative text-sm font-medium text-text-sub">
							{interest.label}
						</span>
					</div>
				))}
			</div>
		</section>
	);
};
