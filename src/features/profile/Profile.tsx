import type { FC, ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type ProfileProps = {
	imageSrc: string;
	name: string;
	bio: ReactNode;
};

export const Profile: FC<ProfileProps> = ({ imageSrc, name, bio }) => {
	return (
		<Card>
			<div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
				<img
					src={imageSrc}
					alt={name}
					className="h-28 w-28 flex-shrink-0 rounded-full border border-border-card object-cover sm:h-32 sm:w-32"
					loading="lazy"
				/>
				<div className="text-center text-text-body sm:text-left">
					<h2 className="md:text-4xl text-2xl font-semibold tracking-wide text-text-primary">
						{name}
					</h2>
					<p className="mt-3 text-sm leading-relaxed text-text-sub sm:text-base">
						{bio}
					</p>
				</div>
			</div>
		</Card>
	);
};
