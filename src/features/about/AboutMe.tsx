import type { FC, ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type AboutMeProps = {
	career: ReactNode;
};

export const AboutMe: FC<AboutMeProps> = ({ career }) => {
	return (
		<Card>
			<div className="text-center text-text-body sm:text-left">
				<h2 className="md:text-3xl text-2xl font-semibold tracking-wide text-white underline decoration-lime-600">
					経歴
				</h2>
				<div className="mt-3 text-sm text-left sm:text-base leading-relaxed text-text-sub">
					{career}
				</div>
			</div>
		</Card>
	);
};
