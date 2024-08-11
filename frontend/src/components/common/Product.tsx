import React from "react";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IColor } from "@/types/typeProduct";
import { formatCurrency, formatQuantitySort } from "@/common/func";
import { BsBag } from "react-icons/bs";

const Product = ({ productShop }: any) => {


  return (
		<div className="w-full pt-9">
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
						<div className="group">
							<div>
								<div className="relative overflow-hidden border bg-[#F4F4F4] flex justify-center items-center max-w-full min-w-full box-shadow ">
									{/* <img src={bn1} className='py-6 w-full h-full' /> */}
									<div className="relative group inline-block lg:h-full h-[200px] w-full">
										<img
											className="object-cover w-full h-full transition duration-300 transform group-hover:scale-50"
											src={product.thumbnail}
											alt="Image 1"
										/>
										<img
											className="absolute top-0 left-0 w-full h-full object-cover transition duration-300 opacity-0 group-hover:opacity-100"
											src={product.images[1].url}
											alt="Image 2"
										/>
									</div>
									<div className="absolute w-full flex justify-center items-center -bottom-10 group-hover:bottom-0 transition-all duration-300 ease-in-out">
										<Link
											to={`/shop/`}
											className="flex justify-center gap-1 items-center lg:w-1/2 w-[100px] lg:text-base text-sm lg:py-2 border-r border-white text-white bg-[#232323] text-center leading-[40px] transition-transform"
										>
											<BsBag />
											<p className="lg:text-sm text-xs">Thêm giỏ hàng</p>
										</Link>

										<Link
											to={`/shop/`}
											className="flex justify-center gap-1 items-center lg:w-1/2 w-[100px] lg:text-base text-sm lg:py-2 border text-white bg-[#232323] text-center leading-[40px] border-none transition-transform"
										>
											<IoEyeOutline />
											<p className="lg:text-sm text-xs">Xem chi tiết</p>
										</Link>
									</div>
									<div className="absolute -right-10 top-5 group-hover:right-3 transition-all border-opacity-30 duration-300 ease-in-out border rounded-full p-1 border-[#545454]">
										<FaHeart
											size={17}
											className="border-opacity-30 text-white cursor-pointer hover:text-red-500"
										/>
									</div>
									<div className="absolute left-3 top-5 text-center rounded-full w-[35px] h-[35px]  p-1 bg-[#f54040]">
										<p className="lg:text-[12px] text-xs pt-1 text-white">
											{product.discount}%
										</p>
									</div>
								</div>
								<div className="my-4">
									<div className="flex lg:h-[20px] h-[15px] gap-4">
										<div className="flex items-center justify-start -space-x-1 *:size-4 *:inline-block  *:rounded-full my-1.5">
											{listColor?.map((color: any) => (
												<span
													style={{ background: `${color?.code}` }}
													className="box-shadow border border-black/40"
												/>
											))}
										</div>
									</div>
									<h3 className=" lg:text-base text-sm text-[#1A1E26] my-4 font-normal w-70 overflow-hidden overflow-ellipsis whitespace-nowrap">
										<Link to={`shop/`}>{product.name}</Link>
									</h3>

									<div className="flex gap-2 justify-start pl-2 my-4 items-center ">
										{/* <h5 className=" text-[#000] lg:text-base text-sm">
										1001010đ
									</h5> */}
										{/* <span className='text-[15px] text-[#767676]'>
                        <del>${(product.price*((100-(product.discount)/100)/100)).toLocaleString('vi-VN')}đ</del>
                      </span> */}

										<div className="flex items-center justify-between gap-2">
											<span className="lg:text-sm md:text-sm text-xs font-medium text-black">
												{formatCurrency(product?.price || 0)}
											</span>
											{/* <span className="lg:text-sm md:text-sm text-[10px]">
											Đã bán {formatQuantitySort(product?.quantitySold || 0)}
										</span> */}
											<span className="lg:text-[13px] md:text-[13px] text-[10px] font-normal">
												<del>
													{formatCurrency(
														product.price * (1 - product.discount / 100),
													)}
												</del>
											</span>
										</div>
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

export default Product;
