import type { FC, ReactNode } from "react";

type CardProps = {
	children: ReactNode;
	className?: string;
};

export const Card: FC<CardProps> = ({ children, className }) => (
	<section className="px-4 py-10">
		<div
			className={[
				"mx-auto max-w-4xl rounded-md border border-border-subtle bg-surface-card p-8 backdrop-blur",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			{children}
		</div>
	</section>
);
