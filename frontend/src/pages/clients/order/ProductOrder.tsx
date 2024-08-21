import React from "react";

const ProductOrder = () => {
	return (
		<div className="grid grid-cols-1">
			<div className="lg:flex md:flex flex-col gap-3 bg-white my-2 py-2 hidden border border-gray-200">
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
			<div className="lg:flex flex-col gap-3 bg-white my-2 py-2 border border-gray-200">
				<div className="flex flex-col gap-2 my-4">
					<div className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 grid grid-cols-1 gap-1  lg:px-4 px-3 items-center">
						<div className="lg:col-span-3 md:col-span-3 col-span-1">
							<div className="flex lg:flex-row items-center gap-3">
								<img
									src="https://readymadeui.com/images/coffee4.webp"
									alt="Product3"
									className="cursor-pointer w-14 h-14"
								/>
								<div className="flex lg:flex-row md:flex-row flex-col  lg:gap-3 md:gap-3 gap-1">
									<h3 className="lg:w-[350px] md:w-[320px] w-[290px] truncate lg:text-base text-sm font-medium">
										Lót chuột CỠ LỚN 100 mẫu kích thước 80x30cm
										hsdjkhgfdsaguhjsdafhhgfsdgufgds
									</h3>
									<span className="text-[#727272] text-sm">
										Loại : XL , Đen
									</span>
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs ">
								Giá tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Số lượng :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">1</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Tổng tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 grid grid-cols-1 gap-1  lg:px-4 px-3 items-center">
						<div className="lg:col-span-3 md:col-span-3 col-span-1">
							<div className="flex lg:flex-row items-center gap-3">
								<img
									src="https://readymadeui.com/images/coffee4.webp"
									alt="Product3"
									className="cursor-pointer w-14 h-14"
								/>
								<div className="flex lg:flex-row md:flex-row flex-col lg:gap-3 md:gap-3 gap-1">
									<h3 className="w-[350px] truncate lg:text-base text-sm">
										Lót chuột CỠ LỚN 100 mẫu kích thước 80x30cm
										hsdjkhgfdsaguhjsdafhhgfsdgufgds
									</h3>
									<span className="text-[#727272] text-sm">
										Loại : XL , Đen
									</span>
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs ">
								Giá tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Số lượng :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">1</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Tổng tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 grid grid-cols-1 gap-1  lg:px-4 px-3 items-center">
						<div className="lg:col-span-3 md:col-span-3 col-span-1">
							<div className="flex lg:flex-row items-center gap-3">
								<img
									src="https://readymadeui.com/images/coffee4.webp"
									alt="Product3"
									className="cursor-pointer w-14 h-14"
								/>
								<div className="flex lg:flex-row md:flex-row flex-col lg:gap-3 md:gap-3 gap-1">
									<h3 className="w-[350px] truncate lg:text-base text-sm">
										Lót chuột CỠ LỚN 100 mẫu kích thước 80x30cm
										hsdjkhgfdsaguhjsdafhhgfsdgufgds
									</h3>
									<span className="text-[#727272] text-sm">
										Loại : XL , Đen
									</span>
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs ">
								Giá tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Số lượng :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">1</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Tổng tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
					</div>
					<hr />
					<div className="px-4 lg:self-end md:self-end justify-between pt-3 flex gap-4 items-center">
						<p className="lg:text-sm md:text-sm text-xs ">
							Tổng số tiền (1 sản phẩm) :
						</p>
						<span className="lg:text-lg md:text-lg text-base font-normal">
							50000000đ
						</span>
					</div>
				</div>
			</div>
			<div className="lg:flex flex-col gap-3 bg-white my-2 py-2 border border-gray-200">
				<div className="flex flex-col gap-2 my-4">
					<div className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 grid grid-cols-1 gap-1  lg:px-4 px-3 items-center">
						<div className="lg:col-span-3 md:col-span-3 col-span-1">
							<div className="flex lg:flex-row items-center gap-3">
								<img
									src="https://readymadeui.com/images/coffee4.webp"
									alt="Product3"
									className="cursor-pointer w-14 h-14"
								/>
								<div className="flex lg:flex-row md:flex-row flex-col  gap-3">
									<h3 className="w-[350px] truncate lg:text-base text-sm">
										Lót chuột CỠ LỚN 100 mẫu kích thước 80x30cm
										hsdjkhgfdsaguhjsdafhhgfsdgufgds
									</h3>
									<span className="text-[#727272] text-sm">
										Loại : XL , Đen
									</span>
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs ">
								Giá tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Số lượng :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">1</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Tổng tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 grid grid-cols-1 gap-1  lg:px-4 px-3 items-center">
						<div className="lg:col-span-3 md:col-span-3 col-span-1">
							<div className="flex lg:flex-row items-center gap-3">
								<img
									src="https://readymadeui.com/images/coffee4.webp"
									alt="Product3"
									className="cursor-pointer w-14 h-14"
								/>
								<div className="flex lg:flex-row md:flex-row flex-col  gap-3">
									<h3 className="w-[350px] truncate lg:text-base text-sm">
										Lót chuột CỠ LỚN 100 mẫu kích thước 80x30cm
										hsdjkhgfdsaguhjsdafhhgfsdgufgds
									</h3>
									<span className="text-[#727272] text-sm">
										Loại : XL , Đen
									</span>
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs ">
								Giá tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Số lượng :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">1</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Tổng tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 grid grid-cols-1 gap-1  lg:px-4 px-3 items-center">
						<div className="lg:col-span-3 md:col-span-3 col-span-1">
							<div className="flex lg:flex-row items-center gap-3">
								<img
									src="https://readymadeui.com/images/coffee4.webp"
									alt="Product3"
									className="cursor-pointer w-14 h-14"
								/>
								<div className="flex lg:flex-row md:flex-row flex-col  gap-3">
									<h3 className="w-[350px] truncate lg:text-base text-sm">
										Lót chuột CỠ LỚN 100 mẫu kích thước 80x30cm
										hsdjkhgfdsaguhjsdafhhgfsdgufgds
									</h3>
									<span className="text-[#727272] text-sm">
										Loại : XL , Đen
									</span>
								</div>
							</div>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs ">
								Giá tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Số lượng :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">1</h3>
						</div>
						<div className="col-span-1 lg:text-right md:text-right lg:block md:block flex items-center lg:pl-0 md:pl-0 pl-[68px] gap-2">
							<span className="lg:hidden md:hidden block lg:text-base md:text-sm text-xs">
								Tổng tiền :
							</span>
							<h3 className="lg:text-base md:text-sm text-xs">5000000đ</h3>
						</div>
					</div>

					<hr />
					<div className="px-4 lg:self-end md:self-end justify-between pt-3 flex gap-4 items-center">
						<p className="lg:text-sm md:text-sm text-xs ">
							Tổng số tiền (1 sản phẩm) :
						</p>
						<span className="lg:text-lg md:text-lg text-base font-normal">
							50000000đ
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductOrder;
