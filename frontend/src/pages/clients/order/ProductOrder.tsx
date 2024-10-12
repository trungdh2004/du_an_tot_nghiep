import { formatCurrency } from "@/common/func";
import React from "react";
import productNotFound from "@/assets/productnotfound.jpg";

const ProductOrder = ({ data }: any) => {
	return (
		<div className="grid grid-cols-1">
			<div className="flex-col hidden gap-3 py-2 my-2 bg-white border border-gray-200 rounded-none lg:flex md:flex lg:rounded-md md:rounded-md box-shadow">
				<div className="hidden lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 lg:px-4 md:px-3">
					<div className="col-span-3">
						<h3 className="text-base font-medium lg:text-lg">Sản phẩm</h3>
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
				data?.data?.map((product: any) => {
					return (
						<div className="flex-col gap-3 py-2 my-2 bg-white border border-gray-200 rounded-none lg:flex lg:rounded-md md:rounded-md box-shadow">
							<div className="flex flex-col gap-3 my-4">
								{product?.items?.map((productItem: any) => {
									return (
										<div className="grid items-center grid-cols-1 gap-1 px-3 lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 lg:px-4">
											<div className="col-span-1 lg:col-span-3 md:col-span-3">
												<div className="flex items-center gap-3 lg:flex-row">
													<img
														src={productItem.thumbnail}
														alt="Product3"
														className="cursor-pointer w-14 h-14"
													/>
													<div className="flex flex-col gap-1 lg:flex-row md:flex-row lg:gap-3 md:gap-3">
														<h3 className="lg:w-[350px] md:w-[320px] w-[290px] truncate lg:text-base text-sm font-medium">
															{productItem.name}
														</h3>
														<span className="text-[#727272] text-sm text-nowrap">
															Loại : {productItem.attribute.size.name}, {" "}
															{productItem.attribute.color.name}
														</span>
													</div>
												</div>
											</div>
											<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
												<span className="block text-xs lg:hidden md:hidden lg:text-base md:text-sm ">
													Giá tiền :
												</span>
												<h3 className="text-xs lg:text-base md:text-sm">
													{formatCurrency(productItem.attribute.discount)}
												</h3>
											</div>
											<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
												<span className="block text-xs lg:hidden md:hidden lg:text-base md:text-sm">
													Số lượng :
												</span>
												<h3 className="text-xs lg:text-base md:text-sm">
													{productItem.quantity}
												</h3>
											</div>
											<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
												<span className="block text-xs lg:hidden md:hidden lg:text-base md:text-sm">
													Tổng tiền :
												</span>
												<h3 className="text-xs lg:text-base md:text-sm">
													{formatCurrency(
														productItem.attribute.discount *
															productItem.quantity,
													)}
												</h3>
											</div>
										</div>
									);
								})}
								<hr />
								<div className="flex items-center justify-between gap-4 px-4 pt-3 lg:self-end md:self-end">
									<p className="text-xs lg:text-sm md:text-sm ">
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
				<div className="flex flex-col items-center justify-center gap-3 py-2 my-2 bg-white border border-gray-200 rounded-none lg:rounded-md md:rounded-md box-shadow">
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
