import { cn } from "@/lib/utils";
import { IoIosCheckmark } from "react-icons/io";

type Props = {
	id?: string;
};
const LabelChecked = (props: Props) => {
	return (
		<label
			htmlFor={props?.id}
			className={cn(
				" relative  overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d] has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]",
				isVariantColors.includes(color._id) || "disabled",
			)}
		>
			<input
				className="peer"
				onChange={(event) => setColorId(event.target.value)}
				type="radio"
				hidden
				defaultChecked={color._id === defaultColor}
				name="choose-color"
				id={color._id}
				value={color._id}
			/>
			<span
				style={{ backgroundColor: color.hex }}
				className={`color shadow-md w-5 h-5 rounded-full bg-orange-300`}
			/>
			<span className="caption1 capitalize">{color.name}</span>
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
