import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { getAllSize } from '@/service/size-admin';
import { SearchObjectTypeProduct } from '@/types/searchObjecTypes';
import { CheckedState } from '@radix-ui/react-checkbox';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
interface Props {
	setSearchParamsObject: Dispatch<SetStateAction<{} | SearchObjectTypeProduct>>;
}
const Size = (setSearchParamsObject: Props) => {
	const [size, setSize] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
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

	const handleCheckedSize = (size: string) => (checked: CheckedState) => {
		let sizes = searchParams.get("size")?.split(",") ?? [];
		console.log(sizes);

		if (checked) {
			sizes.push(size);
		} else {
			sizes = sizes.filter((_size) => _size !== size);
		}
		searchParams.set("size", sizes.join());
		setSearchParams(searchParams);
	};
	return (
		<div className="flex-col gap-3">
			<h3 className="text-uppercase py-3 font-semibold leading-7 tracking-wide lg:text-lg md:text-base sm:text-sm">
				Kích thước
			</h3>
			<div className="grid grid-cols-3 gap-3">
				{size?.map((size: any) => {
					return (
						<div className="flex items-center gap-3" key={size._id}>
							<Checkbox
								className={cn(
									`data-[state=checked]:bg-white data-[state=checked]:text-[#000000] rounded-full h-5 w-5 border-[#eee] p-1 text-[7px]`,
								)}
								value={size._id}
								defaultChecked={searchParams
									.get("size")
									?.split(",")
									.includes(size._id)}
								onCheckedChange={handleCheckedSize(size._id)}
							/>
							<span className="font-medium">{size.name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Size