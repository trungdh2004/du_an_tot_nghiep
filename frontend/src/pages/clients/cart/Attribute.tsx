import LabelChecked from "@/components/common/LabelChecked";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ICart } from "@/types/cart";
import { IColor } from "@/types/typeProduct";
import { ISize } from "@/types/variants";
import { useState } from "react";
type Props = {
	dataColor?: any;
	dataSize?: any;
	open?: boolean;
};
const Attribute = ({ dataColor, dataSize }: Props) => {
	const [size, setSize] = useState<ISize>();
	const [color, setColor] = useState<IColor>();
	const handleChangeSize = (size: ISize) => {
		setSize(size);
	};
	const handleChangeColor = (color: IColor) => {
		setColor(color);
	};
	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<button className="text-sm text-left text-gray-500">
						Phân loại sản phẩm{" "}
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-auto text-gray-500">
					<div className="grid gap-4">
						<div className="flex gap-7 lg:gap-10">
							<h3 className="lg:text-[15px] text-[13px] font-semibold ">Màu</h3>
							<div className="flex gap-3 items-center">
								{dataColor &&
									dataColor.map((color: any, index: number) => {
										return (
											<LabelChecked
												isOneChecked
												value={color.colorId}
												nameInput="choosColor"
												haxColor={color.colorCode}
												key={color.colorId}
												onChange={() => handleChangeColor(color.colorName)}
												className="px-2"
											>
												{color.colorName}
											</LabelChecked>
										);
									})}
							</div>
						</div>
						<div className="flex gap-7 lg:gap-10">
							<h3 className="lg:text-[15px] text-[13px] font-semibold ">
								Size
							</h3>
							<div className="grid lg:grid-cols-4 grid-cols-3 gap-4 w-full">
								{dataSize?.map((size: any, index: number) => {
									return (
										<LabelChecked
											isOneChecked
											value={size.sizeId}
											nameInput="chooseSize"
											key={size.sizeId}
											onChange={() => handleChangeSize(size.sizeName)}
											className="px-2"
										>
											{size.sizeName}
										</LabelChecked>
									);
								})}
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<div className="text-sm text-left text-gray-500">
				{color as any}, {size}
			</div>
		</>
	);
};

export default Attribute;
