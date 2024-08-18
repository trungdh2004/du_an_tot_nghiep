import { cn } from "@/lib/utils";
import React, { memo, useCallback } from "react";
import { IoIosCheckmark } from "react-icons/io";

interface LabelCheckedProps {
	isOneChecked?: boolean;
	value: string | number;
	title?: string;
	haxColor?: string;
	nameInput?: string;
	disabled?: boolean;
	defaultChecked?: boolean;
	className?: string;
	fontSize?: number;
	children?: React.ReactNode;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	size?: "small" | "medium" | "large" | "responsive";
}

const LabelChecked: React.FC<LabelCheckedProps> = memo(
	({
		value,
		isOneChecked = false,
		disabled = false,
		defaultChecked = false,
		children,
		fontSize,
		nameInput,
		haxColor,
		className,
		onChange,
		size = "medium",
		...props
	}) => {
		const handleOneChecked = useCallback(
			(e: React.MouseEvent<HTMLInputElement>) => {
				if (!isOneChecked) return;
				const currentItem = e.currentTarget;
				const checkboxes = document.querySelectorAll(
					`input[name="${nameInput}"]:checked`,
				) as NodeListOf<HTMLInputElement>;
				if (checkboxes.length > 1) {
					checkboxes.forEach((checkbox) => {
						checkbox.checked = false;
					});
					currentItem.checked = true;
				}
			},
			[isOneChecked, nameInput],
		);

		const sizeClasses = {
			small: "h-10 text-sm",
			medium: "h-12 text-base",
			large: "h-14 text-lg",
			responsive: "h-9 text-sm sm:h-12 sm:text-base md:h-12 md:text-lg",
		};

		const labelClasses = cn(
			"relative overflow-hidden flex items-center justify-start border border-solid border-[#ccc] cursor-pointer rounded bg-white",
			"hover:text-blue-500 hover:border-blue-500",
			"has-[:checked]:text-blue-500 has-[:checked]:border-blue-500",
			sizeClasses[size],
			"w-full max-w-28 lg:w-28",
			disabled && "pointer-events-none opacity-70 bg-black/5",
			className,
		);

		const colorSpanClasses = cn(
			"color shadow-md rounded-full flex-shrink-0",
			size === "small" ? "w-5 h-5" : "w-6 h-6",
			size === "responsive" && "w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6",
		);

		const textClasses = cn(
			"capitalize text-nowrap  text-center w-min",
			!haxColor && "text-center",
			fontSize
				? `text-[${fontSize}px]`
				: sizeClasses[size].split(" ").find((cls) => cls.startsWith("text-")),
		);

		return (
			<label htmlFor={String(value)} className={labelClasses}>
				<input
					onClick={handleOneChecked}
					onChange={onChange}
					className="peer"
					type="checkbox"
					hidden
					disabled={disabled}
					defaultChecked={defaultChecked}
					name={nameInput}
					id={String(value)}
					value={value}
					{...props}
				/>
				<div className="flex items-center justify-center w-full h-full px-3 gap-2">
					{haxColor && (
						<span
							style={{ backgroundColor: haxColor }}
							className={colorSpanClasses}
						/>
					)}
					<span className={textClasses}>{children}</span>
				</div>
				<span className="selection-box-tick hidden absolute bottom-0 right-0 peer-checked:block">
					<IoIosCheckmark
						size={16}
						color="#fff"
						strokeWidth={2}
						className="-rotate-2"
					/>
				</span>
			</label>
		);
	},
);

export default LabelChecked;
