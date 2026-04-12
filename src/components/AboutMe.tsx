import type { FC, ReactNode } from "react";

type AboutMeProps = {
	career: ReactNode;
	skills: ReactNode;
	curiosities: ReactNode;
};

export const AboutMe: FC<AboutMeProps> = ({ career, skills, curiosities }) => {
	return (
		<section className="px-4 py-10">
			<div className="mx-auto max-w-4xl border rounded-md border-white/10 bg-white/5 p-8 backdrop-blur">
				<div className="text-center text-slate-200 sm:text-left">
					<h2 className="md:text-3xl text-2xl font-semibold tracking-wide text-white underline decoration-lime-600">
						経歴
					</h2>
					<div className="mt-3 text-sm text-left sm:text-base leading-relaxed text-slate-300">
						{career}
					</div>
					<h2 className="md:text-3xl text-2xl font-semibold tracking-wide text-white mt-10 underline decoration-sky-600">
						スキル
					</h2>
					<div className="mt-3 text-sm text-left sm:text-base leading-relaxed text-slate-300">
						{skills}
					</div>
					<h2 className="md:text-3xl text-2xl font-semibold tracking-wide text-white mt-10 underline decoration-pink-600">
						興味・関心
					</h2>
					<div className="mt-3 text-sm text-left sm:text-base leading-relaxed text-slate-300">
						{curiosities}
					</div>
				</div>
			</div>
		</section>
	);
};
