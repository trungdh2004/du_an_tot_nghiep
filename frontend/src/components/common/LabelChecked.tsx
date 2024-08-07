import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { IoIosCheckmark } from "react-icons/io";

type Props = {
	value: string | number;
	title?: string;
	haxColor?: string;
	nameInput?: string;
	disabled?: boolean;
	defaultChecked?: boolean;
	className?: string;
	fontSize?: number;
	children?: ReactNode | string;
	[key: string]: any;
};
const LabelChecked = ({
	value,
	disabled = false,
	defaultChecked = false,
	children,
	fontSize = 14,
	nameInput,
	haxColor,
	className,
	...props
}: Props) => {
	return (
		<label
			htmlFor={String(value)}
			className={cn(
				" relative  overflow-hidden flex items-center justify-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-blue-500   hover:border-blue-500 has-[:checked]:text-blue-500   has-[:checked]:border-blue-500",
				className,
				disabled && "pointer-events-none opacity-70",
			)}
		>
			<input
				className="peer"
				{...props}
				type="radio"
				hidden
				disabled={disabled}
				defaultChecked={defaultChecked}
				name={nameInput}
				id={String(value)}
				value={value}
			/>
			{haxColor && (
				<span
					style={{ backgroundColor: haxColor }}
					className={`color shadow-md w-4 h-4 rounded-full min-w-4 min-h-4`}
				/>
			)}

			<span
				className={`text-[${fontSize}px] capitalize text-nowrap text-center`}
			>
				{children}
			</span>
			<span className="selection-box-tick hidden absolute bottom-0 right-0 peer-checked:block">
				<IoIosCheckmark
					size={12}
					color="#fff"
					strokeWidth={2}
					className="-rotate-2"
				/>
			</span>
		</label>
	);
};

export default LabelChecked;
