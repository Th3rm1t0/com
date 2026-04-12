import type { FC } from "react";
import { AboutMe } from "@/features/about";
import { careerContent } from "@/features/about/career";
import { HeroSection } from "@/features/hero";
import { Profile, SocialLinks } from "@/features/profile";
import { socialLinks } from "@/features/profile/social-links";

export const Top: FC = () => {
	return (
		<main className="min-h-screen bg-surface font-body text-text-body">
			<div>
				<HeroSection
					title="Th3rm1t3.com"
					tagline={
						<>
							Hello and, again, welcome to Th3rm1t3's site.
							<br />
						</>
					}
				/>
			</div>
			<div className="mt-4">
				<SocialLinks links={socialLinks} />
			</div>
			<div className="mt-24">
				<Profile
					imageSrc="/icon.webp"
					name="Th3rm1t3 / テルミット"
					bio={<>やったりやらなかったり系エンジニア</>}
				/>
			</div>
			<div>
				<AboutMe career={careerContent} />
			</div>
		</main>
	);
};
