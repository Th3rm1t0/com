import type { FC } from "react";
import type {
	HeroModelDefinition,
	HeroModelName,
} from "@/components/hero/models";

type ModelSwitcherProps = {
	names: readonly HeroModelName[];
	models: Record<HeroModelName, HeroModelDefinition>;
	selected: HeroModelName;
	onSelect: (name: HeroModelName) => void;
};

export const ModelSwitcher: FC<ModelSwitcherProps> = ({
	names,
	models,
	selected,
	onSelect,
}) => {
	if (names.length <= 1) {
		return null;
	}

	return (
		<div
			role="radiogroup"
			aria-label="表示する3Dモデルを選択"
			className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2"
		>
			{names.map((name) => {
				const isSelected = name === selected;
				return (
					<label key={name} className="cursor-pointer">
						<input
							type="radio"
							name="hero-model"
							value={name}
							checked={isSelected}
							onChange={() => onSelect(name)}
							className="sr-only"
						/>
						<span
							aria-hidden="true"
							className={`block h-7 w-7 transition-colors duration-200 ${
								isSelected
									? "bg-text-primary"
									: "bg-border-card hover:bg-text-primary/40"
							}`}
						/>
						<span className="sr-only">{models[name].label}</span>
					</label>
				);
			})}
		</div>
	);
};
