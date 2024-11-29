import { formatCurrency } from "@/common/func";
import { ProductOrder, ProductOrderItem } from "@/types/order";
import React from "react";
import { IoIosResize } from "react-icons/io";
import { IoColorFillOutline } from "react-icons/io5";
import AddressOrder from "../AddressOrder";
import ProductOrderSkeleton from "./ProductOrderSkeleton";
import ProductItemOrder from "./ProductItemOrder";
import productNotFound from "@/assets/productnotfound.jpg";
const ProductOrderV2 = ({
	data,
	handleChangeAddress,
	isLoading,
	setOrder,
}: any) => {
	return (
		<div className="w-full">
			<h4 className="font-bold text-xl pb-5 lg:pb-7  lg:text-left text-center ">
				Đơn hàng của tôi
			</h4>
			<div className="pb-5">
				<AddressOrder
					data={data}
					handleChangeAddress={handleChangeAddress}
					setOrder={setOrder}
				/>
			</div>
			<div className="flex-col hidden gap-3 py-2 mb-5 bg-white border border-gray-200 rounded-none lg:flex lg:rounded-md md:rounded-md box-shadow">
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
				{isLoading ? (
					<ProductOrderSkeleton />
				) : (
					<>
						{data?.data?.length > 0 ? (
							data?.data?.map((product: ProductOrder, index: number) => {
								return (
									<div
										className="rounded-md border border-gray-200 px-7 py-6 flex flex-col gap-4"
										key={index}
									>
										{product?.items?.map(
											(productItem: ProductOrderItem, index: number) => {
												return (
													<ProductItemOrder
														productItem={productItem}
														key={index}
													/>
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
							})
						) : (
							<div className="flex flex-col items-center justify-center gap-3 py-2 my-2 bg-white border border-gray-200 rounded-none lg:rounded-md md:rounded-md box-shadow">
								<img
									src={productNotFound}
									alt=""
									className="object-cover w-[200px] h-[200px]"
								/>
								<span className="font-semibold">
									Bạn chưa chọn sản phẩm nào
								</span>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default ProductOrderV2;
