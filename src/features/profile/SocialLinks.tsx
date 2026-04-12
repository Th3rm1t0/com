import type { FC } from "react";

export type SocialLink = {
	id: string;
	href: string;
	label: string;
	iconSrc: string;
};

type SocialLinksProps = {
	links: SocialLink[];
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
							<img
								src={link.iconSrc}
								alt={link.label}
								className="block h-8 w-8"
								loading="lazy"
							/>
							<span className="text-[0.85rem]">{link.label}</span>
						</a>
					</div>
				))}
			</div>
		</section>
	);
};
