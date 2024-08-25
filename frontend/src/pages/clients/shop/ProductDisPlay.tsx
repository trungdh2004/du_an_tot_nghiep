import React from "react";
import { formatCurrency, formatQuantitySort } from "@/common/func";
import { IColor } from "@/types/typeProduct";
const ProductDisPlay = ({ productShop }: any) => {
	return (
		<div className="w-full py-9">
			<div className="grid w-full lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-9">
				{productShop?.content?.map((product: any) => {
					const listColor = product.attributes.reduce(
						(acc: IColor[], item: any) => {
							if (!item.color._id) return acc;
							let group = acc.find(
								(g) => g._id === (item.color as IColor)?._id,
							);

							// Nếu nhóm không tồn tại, tạo nhóm mới
							if (!group) {
								group = {
									_id: (item.color as IColor)._id as string,
									name: (item.color as IColor).name as string,
									code: (item.color as IColor).code as string,
								};
								acc.push(group);
								return acc;
							}
							return acc;
						},
						[],
					);

					return (
						<div
							key={product?._id}
							className="max-w-full min-w-full box-shadow rounded-lg overflow-hidden  bg-white"
						>
							<div className="">
								<div className="w-full">
									<img
										src={product?.thumbnail}
										alt=""
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="p-3">
									<p className="lg:text-base text-sm">{product?.name}</p>
									<div className="flex items-center justify-start -space-x-1 *:size-3 *:inline-block  *:rounded-full my-1.5">
										{listColor?.map((color: any) => (
											<span
												style={{ background: `${color?.code}` }}
												className="box-shadow border border-black/40"
											/>
										))}
									</div>
									<div className="flex items-center justify-between">
										<span className="lg:text-sm md:text-sm text-xs font-medium text-red-500">
											{formatCurrency(product?.price || 0)}
										</span>
										<span className="lg:text-sm md:text-sm text-[10px]">
											Đã bán {formatQuantitySort(product?.quantitySold || 0)}
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductDisPlay;
