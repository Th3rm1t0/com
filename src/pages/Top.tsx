import type { FC } from "react";
import { HeroSection } from "@/features/hero";
import {
	Profile,
	SocialLinks,
	socialLinks,
	SkillMarquee,
	InterestBento,
	skills,
	interests,
} from "@/features/profile";
import { ThemeToggle } from "@/features/theme";

export const Top: FC = () => {
	return (
		<main className="min-h-screen bg-surface font-body text-text-body">
			<div className="sticky top-4 z-40 mx-auto flex w-full max-w-5xl justify-end px-4 pt-4">
				<ThemeToggle />
			</div>
			<div>
				<HeroSection title="Th3rm1t3.com" />
			</div>
			<div className="mt-4">
				<SocialLinks links={socialLinks} />
			</div>
			<div className="mt-24">
				<Profile
					imageSrc="/icon.webp"
					name="Th3rm1t3 / テルミット"
					tagline="キラメキ駆動開発者"
					bio={
						<p>
							ものづくりが好きなエンジニア。フロントエンドからインフラまで幅広く触りながら、
							日々キラメキを探して開発しています。技術の面白さを追求しつつ、
							ユーザーに届く体験を大切にしています。
						</p>
					}
				/>
			</div>
			<SkillMarquee skills={skills} />
			<InterestBento interests={interests} />
		</main>
	);
};
