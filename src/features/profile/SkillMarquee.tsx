import {
	type FC,
	type ReactNode,
	useState,
	useRef,
	useCallback,
	useEffect,
} from "react";

type Skill = {
	name: string;
	icon: ReactNode;
	description?: string;
};

type SkillMarqueeProps = {
	skills: readonly Skill[];
};

export type { Skill };

type ModalState = {
	skill: Skill;
	rect: DOMRect;
} | null;

type Rect = { top: number; left: number; width: number; height: number };

const MORPH_DURATION = 320;
const MORPH_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const PILL_FADE_MS = 120;

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

function getColors(el: Element) {
	const cs = getComputedStyle(el);
	return { bg: cs.backgroundColor, border: cs.borderColor };
}

function computeTransform(visual: Rect, pivot: Rect): string {
	const tx =
		visual.left + visual.width / 2 - (pivot.left + pivot.width / 2);
	const ty =
		visual.top + visual.height / 2 - (pivot.top + pivot.height / 2);
	const sx = visual.width / pivot.width;
	const sy = visual.height / pivot.height;
	if (tx === 0 && ty === 0 && sx === 1 && sy === 1) return "none";
	return `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
}

function lerpRect(a: Rect, b: Rect, t: number): Rect {
	return {
		top: lerp(a.top, b.top, t),
		left: lerp(a.left, b.left, t),
		width: lerp(a.width, b.width, t),
		height: lerp(a.height, b.height, t),
	};
}

function buildMorphKeyframes(
	pivot: Rect,
	from: Rect,
	to: Rect,
	fromColors: { bg: string; border: string },
	toColors: { bg: string; border: string },
	midOffset: number,
): Keyframe[] {
	const mid = lerpRect(from, to, midOffset);
	return [
		{
			transform: computeTransform(from, pivot),
			borderRadius: "9999px",
			backgroundColor: fromColors.bg,
			borderColor: fromColors.border,
			offset: 0,
		},
		{
			transform: computeTransform(mid, pivot),
			borderRadius: "24px",
			backgroundColor: toColors.bg,
			borderColor: toColors.border,
			offset: midOffset,
		},
		{
			transform: computeTransform(to, pivot),
			borderRadius: "16px",
			backgroundColor: toColors.bg,
			borderColor: toColors.border,
			offset: 1,
		},
	];
}

const SkillModal: FC<{
	skill: Skill;
	originRect: DOMRect;
	pillEl: HTMLButtonElement;
	onClose: () => void;
}> = ({ skill, originRect, pillEl, onClose }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const finalRef = useRef<Rect | null>(null);
	const closingRef = useRef(false);
	const [contentVisible, setContentVisible] = useState(false);

	useEffect(() => {
		const card = cardRef.current;
		const overlay = overlayRef.current;
		if (!card || !overlay) return;

		let cancelled = false;

		const run = () => {
			if (cancelled) return;

			const pillColors = getColors(pillEl);

			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const fw = Math.min(640, vw - 48);
			const fl = (vw - fw) / 2;
			const ft = vh * 0.2;

			card.style.position = "fixed";
			card.style.top = `${ft}px`;
			card.style.left = `${fl}px`;
			card.style.width = `${fw}px`;
			card.style.maxHeight = `${vh * 0.6}px`;
			card.style.borderRadius = "16px";

			const fh = card.offsetHeight;
			card.style.height = `${fh}px`;
			card.style.visibility = "visible";
			card.style.willChange = "transform";

			const dest: Rect = { top: ft, left: fl, width: fw, height: fh };
			finalRef.current = dest;

			const cardColors = getColors(card);

			const anim = card.animate(
				buildMorphKeyframes(
					dest,
					originRect,
					dest,
					pillColors,
					cardColors,
					0.35,
				),
				{ duration: MORPH_DURATION, easing: MORPH_EASING },
			);

			overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
				duration: MORPH_DURATION,
				easing: MORPH_EASING,
			});

			anim.onfinish = () => {
				card.style.willChange = "";
				setContentVisible(true);
			};
		};

		document.fonts.ready.then(run);
		return () => {
			cancelled = true;
		};
	}, [originRect, pillEl]);

	const handleClose = useCallback(() => {
		if (closingRef.current) return;
		closingRef.current = true;

		const card = cardRef.current;
		const overlay = overlayRef.current;
		const fr = finalRef.current;
		if (!card || !overlay || !fr) {
			onClose();
			return;
		}

		setContentVisible(false);
		card.style.willChange = "transform";

		const run = () => {
			const pillRect = pillEl.getBoundingClientRect();
			const cardColors = getColors(card);
			const pillColors = getColors(pillEl);

			const anim = card.animate(
				buildMorphKeyframes(fr, fr, pillRect, cardColors, pillColors, 0.65),
				{ duration: MORPH_DURATION, easing: MORPH_EASING, fill: "forwards" },
			);

			overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: MORPH_DURATION,
				easing: MORPH_EASING,
				fill: "forwards",
			});

			anim.onfinish = onClose;
		};

		setTimeout(run, PILL_FADE_MS);
	}, [onClose, pillEl]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [handleClose]);

	return (
		<div className="fixed inset-0 z-50">
			<div
				ref={overlayRef}
				className="absolute inset-0 bg-text-primary/25 backdrop-blur-[2px]"
				onClick={handleClose}
				role="button"
				tabIndex={0}
			/>
			<div
				ref={cardRef}
				onClick={(e) => {
					e.stopPropagation();
					handleClose();
				}}
				role="dialog"
				style={{ visibility: "hidden" }}
				className="overflow-y-auto overscroll-contain border border-border-card bg-text-primary text-surface shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				<div
					className={[
						"flex flex-col p-10 transition-opacity duration-150",
						contentVisible ? "opacity-100" : "opacity-0",
					].join(" ")}
				>
					<div className="flex items-center gap-5">
						<span className="shrink-0 text-7xl">{skill.icon}</span>
						<span className="text-2xl font-bold tracking-wide md:text-3xl">
							{skill.name}
						</span>
					</div>
					{skill.description && (
						<p className="mt-5 text-base leading-relaxed text-surface/80 md:text-lg">
							{skill.description}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export const SkillMarquee: FC<SkillMarqueeProps> = ({ skills }) => {
	const [modal, setModal] = useState<ModalState>(null);
	const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
	const activePillRef = useRef<HTMLButtonElement | null>(null);

	const handleClick = useCallback((skill: Skill) => {
		const el = pillRefs.current.get(skill.name);
		if (!el) return;
		activePillRef.current = el;
		const rect = el.getBoundingClientRect();

		el.style.transition = `opacity ${PILL_FADE_MS}ms ease-out`;
		el.style.opacity = "0";

		const onEnd = () => {
			el.removeEventListener("transitionend", onEnd);
			clearTimeout(fallback);
			el.style.transition = "";
			el.style.visibility = "hidden";
			setModal({ skill, rect });
		};
		el.addEventListener("transitionend", onEnd);
		const fallback = setTimeout(onEnd, PILL_FADE_MS + 50);
	}, []);

	const handleClose = useCallback(() => {
		const pill = activePillRef.current;
		if (pill) {
			pill.style.visibility = "";
			pill.style.opacity = "";
			pill.style.transition = "";
			activePillRef.current = null;
		}
		setModal(null);
	}, []);

	return (
		<>
			<section className="px-4 py-12">
				<h2 className="mb-8 text-center text-2xl font-bold tracking-wide text-text-primary md:text-3xl">
					Skills & Tech
				</h2>
				<div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
					{skills.map((skill) => (
						<button
							key={skill.name}
							ref={(el) => {
								if (el) pillRefs.current.set(skill.name, el);
							}}
							type="button"
							onClick={() => handleClick(skill)}
							className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-5 py-2.5 text-sm font-medium text-text-sub transition-[border-color,box-shadow] duration-200 hover:border-border-card hover:shadow-md"
						>
							<span className="text-lg">{skill.icon}</span>
							{skill.name}
						</button>
					))}
				</div>
			</section>

			{modal && activePillRef.current && (
				<SkillModal
					skill={modal.skill}
					originRect={modal.rect}
					pillEl={activePillRef.current}
					onClose={handleClose}
				/>
			)}
		</>
	);
};
