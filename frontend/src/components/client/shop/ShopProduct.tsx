import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "react-router-dom";
import { getAllCategory } from "@/service/category-admin";
import { CheckedState } from "@radix-ui/react-checkbox";
import { getAllColor } from "@/service/color";
import { getAllSize } from "@/service/size-admin";
import { cn } from "@/lib/utils";

const ShopProduct = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [category, setCategory] = useState([]);
	const [colors, setColors] = useState([]);
	const [size, setSize] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllCategory();
				setCategory(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	console.log(category);
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
  console.log(colors);
  
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllSize();
				setSize(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const handleCheckked = (color: string) => (checked: CheckedState) => {
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
	const paramsObject = Object.fromEntries(searchParams.entries());
	console.log(paramsObject.category);
	return (
		<div className="padding">
			<div className="grid grid-cols-12">
				<div className="col-span-3">
					<div className="flex flex-col gap-3">
            {colors?.map((color: any) => {
              
							return (
								<div className="flex items-center gap-3" key={color._id}>
									<Checkbox
										className={cn(
											`data-[state=checked]:bg-white data-[state=checked]:text-white rounded-full h-5 w-5 border-white p-1 text-[7px]`,
                    )}
                    style={{backgroundColor: color.code}}
										value={color._id}
										defaultChecked={searchParams
											.get("color")
											?.split(",")
											.includes(color._id)}
										onCheckedChange={handleCheckked(color._id)}
									/>
									<span className="font-medium">{color.name}</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="col-span-9"></div>
			</div>
		</div>
	);
};

export default ShopProduct;
