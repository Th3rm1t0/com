import {
	SiGo,
	SiPython,
	SiTypescript,
	SiJavascript,
	SiReact,
	SiDocker,
	SiGit,
	SiLinux,
} from "react-icons/si";
import { FaAws, FaJava, FaDatabase, FaCubesStacked } from "react-icons/fa6";
import type { Skill } from "./SkillMarquee";
import type { Interest } from "./InterestBento";

export const skills: readonly Skill[] = [
	{ name: "Go", icon: <SiGo />, description: "大規模Webバックエンドの設計・開発で使用。高トラフィックなシステムの構築経験あり。" },
	{ name: "Python", icon: <SiPython />, description: "データ処理やスクリプティング、バックエンド開発に活用。" },
	{ name: "TypeScript", icon: <SiTypescript />, description: "フロントエンド・バックエンド問わず型安全な開発に使用。" },
	{ name: "Java", icon: <FaJava />, description: "専門学校時代に学んだ言語。オブジェクト指向の基礎を習得。" },
	{ name: "JavaScript", icon: <SiJavascript />, description: "Webフロントエンドの基盤。React等のフレームワークと合わせて使用。" },
	{ name: "React", icon: <SiReact />, description: "このサイトもReactで構築。コンポーネント設計が得意。" },
	{ name: "AWS", icon: <FaAws />, description: "業務でクラウドインフラの設計・運用を担当。" },
	{ name: "AWS CDK", icon: <FaCubesStacked />, description: "IaCによるインフラ構築。CDKでの設計・開発・運用経験あり。" },
	{ name: "Docker", icon: <SiDocker />, description: "開発環境の構築やデプロイに活用。" },
	{ name: "SQL", icon: <FaDatabase />, description: "データベーススペシャリスト試験合格。RDBの設計・クエリ最適化。" },
	{ name: "Git", icon: <SiGit />, description: "日常的に使用するバージョン管理ツール。" },
	{ name: "Linux", icon: <SiLinux />, description: "サーバー構築・運用、シェルスクリプトによる自動化。" },
];

export const interests: readonly Interest[] = [
	{ label: "音楽", icon: "🎵", accent: "#8b5cf6" },
	{ label: "コーヒー", icon: "☕", accent: "#92400e" },
	{ label: "旅行", icon: "✈️", accent: "#0ea5e9", span: "wide" },
	{ label: "ゲーム", icon: "🎮", accent: "#10b981" },
	{ label: "読書", icon: "📚", accent: "#f59e0b" },
	{ label: "写真", icon: "📷", accent: "#ec4899" },
];
