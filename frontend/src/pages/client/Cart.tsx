import React from "react";
import { FaPaintbrush } from "react-icons/fa6";
const Cart = () => {
	return (
		<div className='className=" px-[20px] sm:px-[30px] md:px-[40px] xl:px-[50px] 2xl:px-[60px]"'>
			<div className="">
				<div className="relative grid lg:grid-cols-3 md:grid-cols-3 gap-10 ">
					<div className="lg:col-span-2 md:col-span-2 bg-white divide-y">
						
						
						
						
						<div className=" flex  py-4">
							<div className="lg:h-36 lg:w-36 lg:rounded-xl shrink-0 mr-[15px] md:rounded-xl md:w-[100px] md:h-[100px]  h-[75px] w-[75px] rounded ">
								<img
									src="https://readymadeui.com/images/product6.webp"
									className="w-full h-full  md:rounded-xl lg:rounded-xl rounded-lg"
								/>
							</div>
							<div className="w-full">
								<div className="flex items-start justify-between  ">
									<div className="object-contain">
										<h3 className="lg:text-lg font-bold text-gray-800 mb-1 md:text-sm text-[10px]">
											Black T-Shirt
										</h3>
										<div className="mt-2 ">
											<h6 className="lg:text-sm text-gray-800 md:text-xs text-[9px]">
												Kích cỡ: <strong className="ml-2">M</strong>
											</h6>
											<h6 className="lg:text-sm text-gray-800 flex md:text-xs  text-[9px]">
												Màu sắc : <strong className="ml-2 "> Đen</strong>
											</h6>
											<h6 className="lg:text-sm text-gray-800 md:text-xs text-[9px]">Đơn giá: 185</h6>

										</div>
										
									</div>

									<div className="flex items-center  gap-3">
										<button
											type="button"
											className=" text-[9px] lg:w-[32px] lg:h-[32px] flex items-center justify-center bg-[#FFFFFF] border-[1px] border-[#D9D9D9] outline-none rounded-full text-black text-center line-height[1/2] md:h-[24px] md:w-[24px] w-[10px] h-[10px]"
										>
											-
										</button>
										<span className="font-bold  text-[9px] leading-[18px]">2</span>
										<button
											type="button"
											className="flex text-[9px] items-center justify-center lg:w-[32px] lg:h-[32px] text-black bg-[#FFFFFF] border-[1px] border-[#D9D9D9] outline-none rounded-full md:h-[24px] md:w-[24px] w-[10px] h-[10px]"
										>
											+
										</button>
									</div>

									<div className=" text-right">
										<div className="">
											<h4 className="text-[9px] lg:px-[16px] py-[3px] px-[8px] font-bold text-[#4CAF50] border-[1px] border-[#4CAF50] rounded-md md:px-[10px] md:text-sm">
												370
											</h4>
										</div>
									</div>
								</div>
								<div className="lg:mt-16 flex flex-row md:mt-1  ">
									<button
										type="button"
										className="font-semibold basis-1/2 text-pink-500 text-[9px] lg:text-sm md:text-sm flex items-center gap-2 shrink-0"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-[10px] lg:w-4 md:w-4 fill-current inline"
											viewBox="0 0 64 64"
										>
											<path
												d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
												data-original="#000000"
											></path>
										</svg>
											Trong kho
									</button>
									<button
										type="button"
										className="font-semibold text-red-500 basis-1/2 text-[9px] lg:text-sm md:text-sm flex items-center justify-end gap-2 shrink-0"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-[10px] lg:w-4 md:w-4 fill-current inline"
											viewBox="0 0 24 24"
										>
											<path
												d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
												data-original="#000000"
											></path>
											<path
												d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
												data-original="#000000"
											></path>
										</svg>
										Xóa
									</button>
								</div>
							</div>
						</div>
						
					</div>
					
					
					

					<div className=" fixed bottom-[0px] bg-white w-full  md:shadow-md lg:shadow-md md:p-6 lg:p-6 lg:sticky md:sticky lg:top-0 md:h-max lg:h-max  md:ml-[15px] lg:ml-[32px]">
						<div className="static w-full">
						<h3 className="text-lg hidden lg:block md:block font-bold text-gray-800 border-b pb-4">
							Tóm tắt
						</h3>

						<ul className="text-gray-800 divide-y mt-4">
							<li className="md:flex lg:flex  flex-wrap gap-4 lg:text-sm md:text-sm py-4 hidden ">
								Tổng phụ <span className="ml-auto font-bold ">$73.00</span>
							</li>
							<li className="md:flex lg:flex  flex-wrap gap-4 lg:text-sm md:text-sm py-4 hidden ">
								Phí vận chuyển <span className="ml-auto font-bold">$4.00</span>
							</li>
							<li className="md:flex lg:flex  flex-wrap gap-4 lg:text-sm md:text-sm py-4 hidden ">
								Thuế <span className="ml-auto font-bold">$4.00</span>
							</li>
							<li className="md:flex lg:flex md:flex-wrap lg:flex-wrap lg:gap-4 md:gap-4 lg:text-sm md:text-sm text-[9px] lg:py-4 md:py-4 pt-4 font-bold">
								Tổng cộng <span className="lg:ml-auto md:ml-auto">$81.00</span>
							</li>
						</ul>

						<button
							type="button"
							className="float-right absolute right-[38px]  lg:mt-4 md:mt-4 lg:text-sm md:text-sm mt-[-20px]  px-1 py-1 lg:w-full md:w-full md:right-0 bg-black text-[10px]  text-white rounded-md"
						>
							Thanh toán
						</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
