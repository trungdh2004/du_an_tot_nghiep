import React from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IColor, IProduct } from "@/types/typeProduct";
import { formatCurrency, formatQuantitySort } from "@/common/func";
import { optimizeCloudinaryUrl } from "@/common/localFunction";
import OutOfStock from "@/assets/OutofStock.png";

const Product = ({ productShop }: any) => {
	return (
		<div className="w-full pt-9">
			<div className="grid w-full lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-9 md:gap-7 gap-5">
        {productShop?.content?.map((product: IProduct) => {
          console.log(product);
          
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
						<Link to={"/"}>
							<div className="group">
								<div>
									<div className="relative overflow-hidden border bg-[#F4F4F4] flex justify-center items-center max-w-full min-w-full box-shadow ">
										{/* <img src={bn1} className='py-6 w-full h-full' /> */}
										<div className="relative group inline-block lg:h-full h-[200px] w-full">
											<img
												className="object-cover w-full h-full transition duration-500 transform group-hover:scale-50"
												src={optimizeCloudinaryUrl(product.thumbnail, 350, 370)}
												alt="Image 1"
											/>
											<img
												className="absolute top-0 left-0 w-full h-full object-cover transition duration-500 opacity-0 group-hover:opacity-100"
												src={optimizeCloudinaryUrl(
													product.images[1].url,
													350,
													370,
												)}
												alt="Image 2"
											/>
											{product?.quantity <= 0 && (
												<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition duration-500 bg-[#f0dddd] bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-50">
													<img
														src={optimizeCloudinaryUrl(OutOfStock)}
														alt=""
														className="lg:w-[140px] lg:h-[140px] md:w-[110px] md:h-[110px] w-[80px] h-[80px] "
													/>
												</div>
											)}
										</div>
										<div className="absolute w-full flex justify-center items-center -bottom-10 group-hover:bottom-8 transition-all duration-300 ease-in-out">
											<Link
												to={`/shop/`}
												className="flex justify-center gap-1 items-center lg:w-[200px] w-[150px] lg:text-base text-sm lg:py-2 py-1 bg-opacity-30 border text-white bg-[#232323] text-center leading-[40px] border-none transition-transform hover:scale-90 hover:bg-[#f5f5f5] hover:text-[#262626] duration-300"
											>
												<IoEyeOutline />
												<p className="lg:text-sm text-xs">Xem chi tiết</p>
											</Link>
										</div>
										<div className="absolute -right-10 top-5 group-hover:right-3 transition-all border-opacity-30 duration-300 ease-in-out border rounded-full p-2 bg-[#e7e7e7]">
											<FaRegHeart
												size={17}
												className="border-opacity-30 text-black cursor-pointer hover:text-red-500"
											/>
										</div>
										<div className="absolute left-3 top-5 text-center rounded-full w-[35px] h-[35px]  p-1 bg-[#f54040]">
											<p className="lg:text-[12px] text-xs pt-1 text-white">
												{product.discount}%
											</p>
										</div>
									</div>
									<div className="flex flex-col gap-2 my-4">
										<h3 className=" lg:text-base text-sm text-[#1A1E26] font-medium w-70 overflow-hidden overflow-ellipsis whitespace-nowrap">
											<Link to={`shop/`} className="line-clamp-1">{product.name}</Link>
										</h3>
										<div className="flex justify-between lg:h-[20px] h-[15px] gap-4">
											<div className="flex items-center justify-start -space-x-1 *:size-4 *:inline-block  *:rounded-full">
												{listColor?.map((color: any) => (
													<span
														style={{ background: `${color?.code}` }}
														className="box-shadow border border-black/40"
													/>
												))}
											</div>
											<div className="flex items-center gap-1">
												<span className="text-sm">{product.rating}</span>
												<FaStar className="text-yellow-400" size={10} />
											</div>
										</div>
										<div className="flex gap-2  justify-between items-center ">
											<div className="flex items-center  gap-2">
												<span className="lg:text-sm md:text-sm text-xs justify-start font-[500] text-black">
													{formatCurrency(
														product.price * (1 - product.discount / 100),
													)}
												</span>
												<span className="lg:text-[13px] md:text-[13px] text-[10px] font-normal">
													<del>{formatCurrency(product?.price || 0)}</del>
												</span>
											</div>
											<div>
												<p className="lg:text-sm text-xs">
													Đã bán {product.quantitySold}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Product;
