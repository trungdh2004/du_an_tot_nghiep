import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { getAllColor } from '@/service/color';
import { SearchObjectTypeProduct } from '@/types/searchObjecTypes';
import { CheckedState } from '@radix-ui/react-checkbox';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';


interface Props {
	setSearchParamsObject: Dispatch<SetStateAction<{} | SearchObjectTypeProduct>>;
}
const Color = ({ setSearchParamsObject } : Props) => {
  const [colors, setColors] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllColor();
				setColors(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
  const handleCheckedColor = (color: string) => (checked: CheckedState) => {
		let colors = searchParams.get("color")?.split(",") ?? [];
		console.log(colors);

		if (checked) {
			colors.push(color);
		} else {
			colors = colors.filter((_color) => _color !== color);
		}
		searchParams.set("color", colors.join());
		setSearchParams(searchParams);
	};
  return (
		<div className="flex-col gap-3">
			<h3 className="text-uppercase py-3 font-semibold leading-7 tracking-wide lg:text-lg md:text-base sm:text-sm">
				Màu sắc
			</h3>
			<div className="grid grid-cols-3 gap-3">
				{colors?.map((color: any) => {
					return (
						<div className="flex items-center gap-3" key={color._id}>
							<Checkbox
								className={cn(
									`data-[state=checked]:bg-white data-[state=checked]:text-[#ffffff] rounded-full h-5 w-5 border-[#eee] p-1 text-[7px]`,
									color.code === "#ffffff" && "data-[state=checked]:text-black",
								)}
								style={{ backgroundColor: color.code }}
								value={color._id}
								defaultChecked={searchParams
									.get("color")
									?.split(",")
									.includes(color._id)}
								onCheckedChange={handleCheckedColor(color._id)}
							/>
							<span className="font-medium">{color.name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Color