import type { FC, ReactNode } from "react";

type ProfileProps = {
	imageSrc: string;
	name: string;
	tagline: string;
	bio: ReactNode;
};

export const Profile: FC<ProfileProps> = ({ imageSrc, name, tagline, bio }) => {
	return (
		<section className="px-4 py-16">
			<div className="mx-auto flex max-w-4xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
				<img
					src={imageSrc}
					alt={name}
					className="h-44 w-44 flex-shrink-0 rounded-full border-2 border-border-card object-cover md:h-52 md:w-52"
					loading="lazy"
				/>
				<div className="text-center md:text-left">
					<h2 className="text-3xl font-bold tracking-wide text-text-primary md:text-5xl">
						{name}
					</h2>
					<p className="mt-3 font-display text-lg font-medium text-text-muted md:text-xl">
						{tagline}
					</p>
					<div className="mt-5 max-w-lg text-sm leading-relaxed text-text-sub sm:text-base">
						{bio}
					</div>
				</div>
			</div>
		</section>
	);
};
