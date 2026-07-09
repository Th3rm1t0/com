import type { FC, ReactNode } from "react";

type ProfileProps = {
	imageSrc: string;
	name: string;
	bio: ReactNode;
};

export const Profile: FC<ProfileProps> = ({ imageSrc, name, bio }) => {
	return (
		<section className="bg-surface-inverse px-6 py-16 sm:py-20">
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:gap-12 sm:text-left">
				<img
					src={imageSrc}
					alt={name}
					className="size-32 flex-shrink-0 rounded-full object-cover ring-2 ring-border-inverse sm:size-36"
					loading="lazy"
				/>
				<div className="flex flex-col items-center gap-4 sm:items-start">
					<h2 className="font-display text-3xl font-extrabold tracking-tight text-balance text-text-inverse sm:text-5xl">
						{name}
					</h2>
					<p className="max-w-prose text-base leading-relaxed text-pretty text-text-inverse-sub">
						{bio}
					</p>
				</div>
			</div>
		</section>
	);
};
