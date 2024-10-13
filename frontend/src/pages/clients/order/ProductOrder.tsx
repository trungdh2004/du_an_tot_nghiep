import { formatCurrency } from "@/common/func";
import React from "react";
import productNotFound from "@/assets/productnotfound.jpg";
import type { ProductOrderItem, ProductOrder } from "@/types/order";

const ProductOrder = ({ data }: any) => {
	return (
		<div className="grid grid-cols-1">
			<div className="lg:flex md:flex flex-col gap-3 bg-white my-2 py-2 hidden lg:rounded-md md:rounded-md rounded-none border border-gray-200 box-shadow">
				<div className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 lg:px-4 md:px-3 hidden">
					<div className="col-span-3">
						<h3 className="lg:text-lg text-base font-medium">Sản phẩm</h3>
					</div>
					<div className="col-span-1 text-right">
						<h3 className="text-sm">Đơn giá </h3>
					</div>
					<div className="col-span-1 text-right">
						<h3 className="text-sm">Số lượng</h3>
					</div>
					<div className="col-span-1 text-right">
						<h3 className="text-sm">Thành tiền</h3>
					</div>
				</div>
			</div>
			{data?.data?.length !== 0 ? (
				data?.data?.map((product: ProductOrder, index: number) => {
					return (
						<div
							className="lg:flex flex-col gap-3 bg-white my-2 py-2 lg:rounded-md md:rounded-md rounded-none border border-gray-200 box-shadow"
							key={index}
						>
							<div className="flex flex-col gap-3 my-4">
								{product?.items?.map(
									(productItem: ProductOrderItem, index: number) => {
										return (
											<div
												className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 grid grid-cols-1 gap-1  lg:px-4 px-3 items-center"
												key={index}
											>
												<div className="lg:col-span-3 md:col-span-3 col-span-1">
													<div className="flex lg:flex-row items-center gap-3">
														<img
															src={productItem.thumbnail}
															alt="Product3"
															className="cursor-pointer w-14 h-14"
														/>
														<div className="flex lg:flex-row md:flex-row flex-col  lg:gap-3 md:gap-3 gap-1">
															<h3 className="lg:w-[350px] md:w-[320px] w-[290px] truncate lg:text-base text-sm font-medium">
																{productItem.name}
															</h3>
															{productItem?.is_simple === true ? (
																<h3 className="text-[#727272] text-sm">
																	Sản phẩm đơn giản
																</h3>
															) : (
																<span className="text-[#727272] text-sm">
																	Loại : {productItem.attribute.size.name},
																	{productItem.attribute.color.name}
																</span>
															)}
														</div>
													</div>
												</div>
												<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
													<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs ">
														Giá tiền :
													</span>
													<h3 className="lg:text-base md:text-sm text-xs">
														{formatCurrency(productItem.discount)}
													</h3>
												</div>
												<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
													<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
														Số lượng :
													</span>
													<h3 className="lg:text-base md:text-sm text-xs">
														{productItem.quantity}
													</h3>
												</div>
												<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
													<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
														Tổng tiền :
													</span>
													<h3 className="lg:text-base md:text-sm text-xs">
														{formatCurrency(
															productItem.discount * productItem.quantity,
														)}
													</h3>
												</div>
											</div>
										);
									},
								)}
								<hr />
								<div className="px-4 lg:self-end md:self-end justify-between pt-3 flex gap-4 items-center">
									<p className="lg:text-sm md:text-sm text-xs ">
										Tổng số tiền ({product.items.length} sản phẩm) :
									</p>
									<span className="lg:text-lg md:text-lg text-base font-normal text-[#f78138]">
										{formatCurrency(product.totalAmount)}
									</span>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div className="flex flex-col gap-3 items-center justify-center bg-white my-2 py-2 lg:rounded-md md:rounded-md rounded-none border border-gray-200 box-shadow">
					<img
						src={productNotFound}
						alt=""
						className="object-cover w-[200px] h-[200px]"
					/>
					<span className="font-semibold">Bạn chưa chọn sản phẩm nào</span>
				</div>
			)}
		</div>
	);
};

export default ProductOrder;
