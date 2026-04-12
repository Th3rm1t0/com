import type { FC } from "react";
import { AboutMe } from "@/features/about";
import { careerContent } from "@/features/about/career";
import { HeroSection } from "@/features/hero";
import { Profile, SocialLinks } from "@/features/profile";
import { socialLinks } from "@/features/profile/social-links";
import { ThemeToggle } from "@/features/theme";

export const Top: FC = () => {
	return (
		<main className="min-h-screen bg-surface font-body text-text-body">
			<div className="sticky top-4 z-40 mx-auto flex w-full max-w-5xl justify-end px-4 pt-4">
				<ThemeToggle />
			</div>
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
