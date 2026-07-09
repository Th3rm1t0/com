import type { FC } from "react";
import type { IconType } from "react-icons";

export type SocialLink = {
	id: string;
	href: string;
	label: string;
	icon: IconType;
};

type SocialLinksProps = {
	links: ReadonlyArray<SocialLink>;
};

export const SocialLinks: FC<SocialLinksProps> = ({ links }) => {
	return (
		<section>
			<div className="flex flex-wrap justify-center gap-4 py-4">
				{links.map((link) => (
					<div key={link.id}>
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col items-center gap-2 text-text-primary no-underline"
						>
							<link.icon aria-label={link.label} className="h-8 w-8" />
							<span className="text-[0.85rem]">{link.label}</span>
						</a>
					</div>
				))}
			</div>
		</section>
	);
};
