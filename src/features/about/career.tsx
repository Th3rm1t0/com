import type { ReactNode } from "react";

export const careerContent: ReactNode = (
	<ol className="relative space-y-6 before:pointer-events-none before:absolute before:top-2 before:bottom-2 before:left-[0.72rem] before:w-px before:bg-gradient-to-b before:from-white/35 before:via-white/15 before:to-white/5 before:content-[''] md:before:left-[10.6rem]">
		<li className="relative grid gap-3 pl-7 md:grid-cols-[10rem_1fr] md:gap-x-5 md:pl-0">
			<span className="absolute left-[0.35rem] top-3 h-3 w-3 rounded-full border border-white/50 bg-white/85 shadow-[0_0_0_4px_rgba(255,255,255,0.08)] md:left-[10.25rem]" />
			<div className="rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
				<p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-text-body">
					<span className="text-xs font-semibold tracking-[0.12em] text-text-sub sm:text-sm">2021.04 ~ 2024.03</span>
					<span className="font-medium">IT系専門学校</span>
				</p>
			</div>

			<div className="rounded-xl border border-white/12 bg-black/10 px-4 py-3 md:col-start-2">
				<p className="text-[11px] font-bold tracking-[0.14em] text-text-sub sm:text-xs">学業実績</p>
				<ul className="mt-2 list-disc space-y-1.5 pl-5 text-text-sub marker:text-white/60">
					<li>IPAの基本情報、応用情報、データベーススペシャリスト、情報処理安全確保支援士(未登録)の試験に合格</li>
					<li>Java, Python, JavaScript などを活用したシステム開発を学ぶ</li>
				</ul>
			</div>
		</li>

		<li className="relative grid gap-3 pl-7 md:grid-cols-[10rem_1fr] md:gap-x-5 md:pl-0">
			<span className="absolute left-[0.35rem] top-3 h-3 w-3 rounded-full border border-white/50 bg-white/85 shadow-[0_0_0_4px_rgba(255,255,255,0.08)] md:left-[10.25rem]" />
			<div className="rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
				<p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-text-body">
					<span className="text-xs font-semibold tracking-[0.12em] text-text-sub sm:text-sm">2024.04 ~</span>
					<span className="font-medium">某社 / エンジニア</span>
				</p>
			</div>

			<div className="rounded-xl border border-white/12 bg-black/10 px-4 py-3 md:col-start-2">
				<p className="text-[11px] font-bold tracking-[0.14em] text-text-sub sm:text-xs">業務実績</p>
				<ul className="mt-2 list-disc space-y-1.5 pl-5 text-text-sub marker:text-white/60">
					<li>Go, Python, TypeScript などを活用した大規模データ・トラフィックを扱う Web バックエンドシステムの開発・設計・運用</li>
					<li>クラウドインフラ(AWS CDK)関連の開発・設計・運用</li>
				</ul>
			</div>
		</li>
	</ol>
);
