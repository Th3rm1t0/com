import { type FC, useEffect, useRef, useState } from "react";
import { AboutMe } from "../components/AboutMe";
import { HeroSection } from "../components/HeroSection";
import { Profile } from "../components/Profile";
import type { SocialLink } from "../components/SocialLinks";
import { SocialLinks } from "../components/SocialLinks";

export const Top: FC = () => {
	const [shouldLoadBox, setShouldLoadBox] = useState(false);
	const heroRef = useRef<HTMLElement | null>(null);

	const socialLinks: SocialLink[] = [
		{
			id: "x",
			label: "Twitter",
			href: "https://x.com/Th3rm1t3",
			iconSrc: "/x.svg",
		},
		{
			id: "github",
			label: "GitHub",
			href: "https://github.com/Th3rm1t0",
			iconSrc: "/github.svg",
		},
		{
			id: "zenn",
			label: "Zenn",
			href: "https://zenn.dev/th3rm1t3",
			iconSrc: "/zenn.svg",
		},
		{
			id: "bluesky",
			label: "Bluesky",
			href: "https://bsky.app/profile/th3rm1t3.bsky.social",
			iconSrc: "/bluesky.svg",
		},
	];

	useEffect(() => {
		if (shouldLoadBox) return;
		const target = heroRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setShouldLoadBox(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [shouldLoadBox]);

	return (
		<main className="min-h-screen bg-[#17182cff] font-['Noto Sans JP',sans-serif] text-[#e8e8e8]">
			<div>
				<HeroSection
					heroRef={heroRef}
					shouldLoadBox={shouldLoadBox}
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
					bio={<p>やったりやらなかったり</p>}
				/>
			</div>
			<div>
				<AboutMe
					career={
						<ul className="list-disc list-inside space-y-2">
							<li>~2024.03: 情報系専門学校 / システムエンジニア科</li>
							<li>
								2024.04~現在: 某社 / エンジニア職
								<ul className="list-disc mt-2 list-inside ml-4 space-y-1">
									<li>
										Go, Python, TypeScript, etc... を使用した Web
										バックエンドシステム、およびクラウドインフラ(AWS利用)関連の開発・設計
									</li>
								</ul>
							</li>
						</ul>
					}
					skills={
						<ul className="list-disc list-inside space-y-2">
							<li>Go</li>
							<li>Python</li>
							<li>TypeScript</li>
							<li>Docker</li>
							<li>AWS (Cfn, CDK, Lambda, EC2, ECS, VPC, Stepfunctions, S3, RDS, etc...)</li>
							<li>Git, Github</li>
							<li>SQL, DBMS(MySQL, PostgreSQL)</li>
							<li>CI/CD (GitHub Actions, AWS CodePipeline, etc.)</li>
						</ul>
					}
					curiosities={
						<ul className="list-disc list-inside space-y-2">
							<li>各種トレードオフを分析した上での技術選定・アーキテクチャ・コード設計、およびそれに伴うシステム開発</li>
							<li>技術的に面白いことをやる、ITエンジニアとして自分が楽しめる環境に身を投じる</li>
						</ul>
					}
				/>
			</div>
		</main>
	);
};
