import { formatCurrency } from "@/common/func";
import { ProductOrder, ProductOrderItem } from "@/types/order";
import React from "react";
import { IoIosResize } from "react-icons/io";
import { IoColorFillOutline } from "react-icons/io5";

const ProductOrderV2 = ({ data }: any) => {
	console.log(data);

	return (
		<div className="w-full">
			<h4 className="font-bold text-xl pb-9">Đơn hàng của tôi</h4>
			<div className="flex-col hidden gap-3 py-2 mb-5 bg-white border border-gray-200 rounded-none lg:flex md:flex lg:rounded-md md:rounded-md box-shadow">
				<div className="hidden lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 lg:px-4 md:px-3">
					<div className="col-span-3">
						<h3 className="text-base font-medium lg:text-lg">Sản phẩm</h3>
					</div>
					<div className="col-span-1 pl-3">
						<h3 className="text-sm">Số lượng</h3>
					</div>
					<div className="col-span-1 pl-7">
						<h3 className="text-sm">Giá tiền</h3>
					</div>
					<div className="col-span-1 pl-14">
						<h3 className="text-sm">Thành tiền</h3>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-5">
				{data?.data?.map((product: ProductOrder, index: number) => {
					return (
						<div className="rounded-md border border-gray-200 px-7 py-6 flex flex-col gap-4">
							{product?.items?.map(
								(productItem: ProductOrderItem, index: number) => {
									return (
										<>
											<div className="max-w-full flex  items-center justify-between">
												<div className="flex gap-3 items-center">
													<img
														src={productItem?.thumbnail}
														alt=""
														className="w-[90px] lg:h-[90px] h-[110px] object-cover"
													/>
													<div className="flex flex-col gap-2">
														<h3 className="font-semibold w-[230px] truncate">
															{productItem?.name}
														</h3>
														<div className="flex gap-3 items-center">
															<div className="flex items-center gap-1">
																<IoColorFillOutline />
																<p className="lg:text-base text-sm">
																	{productItem.attribute.color.name}
																</p>
															</div>
															<div className="w-[1px] h-5 bg-black"></div>
															<div className="flex items-center gap-1">
																<IoIosResize />
																<p className="lg:text-base text-sm">
																	{productItem.attribute.size.name}
																</p>
															</div>
														</div>
														<div className="lg:hidden md:block block">
															<p className="text-sm">x{productItem.quantity}</p>
														</div>
														<div className="lg:hidden md:block block">
															<p className="text-sm">
																Giá tiền :{" "}
																{formatCurrency(productItem.discount)}
															</p>
														</div>
														<div className="lg:hidden md:block block">
															<p className="text-sm">
																Thành tiền :{" "}
																{formatCurrency(
																	productItem.discount * productItem.quantity,
																)}
															</p>
														</div>
													</div>
												</div>

												<div className="lg:block md:hidden hidden">
													<p>x{productItem.quantity}</p>
												</div>
												<div className="lg:block md:hidden hidden">
													<p>{formatCurrency(productItem.discount)}</p>
												</div>
												<div className="lg:block md:hidden hidden">
													<p>
														{formatCurrency(
															productItem.discount * productItem.quantity,
														)}
													</p>
												</div>
											</div>
											<hr />
										</>
									);
								},
							)}

							<div className="flex items-center justify-between gap-4 md:pt-3 lg:self-end md:self-end">
								<p className="text-xs lg:text-sm md:text-sm ">
									Tổng số tiền ({product.items.length} sản phẩm) :
								</p>
								<span className="lg:text-lg md:text-lg text-base font-normal text-[#f78138]">
									{formatCurrency(product.totalAmount)}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductOrderV2;
