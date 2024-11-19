import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/common/func";
import Countdown from "./CoutDown";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { findProductActive, pagingProductComing } from "@/service/product";
import { IProduct } from "@/types/typeProduct";
import { useQuery } from "@tanstack/react-query";
type DealProductType = {
	active: boolean;
	createdAt: string;
	date: string;
	product: IProduct;
	updatedAt: string;
	__v: number;
	_id: string;
};
const DealProductSection: React.FC = () => {
	const { data: dealProduct } = useQuery({
		queryKey: ["activeProductHome"],
		queryFn: async () => {
			try {
				const { data } = await findProductActive();
				// setDealProduct(data);
				return data;
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data?.message);
				}
			}
		},
	});

	console.log({dealProduct});
	

	return (
		<section className="py-6 md:py-12 relative mt-14">
			{/* <div className="bg-magic"></div> */}
			<div className="absolute inset-0 z-[0] ">
				<div className="absolute inset-0 bg-white z-[-2]"></div>
				<div className="absolute inset-0 opacity-[0.08] bg-magic-img z-[-1]"></div>
			</div>
			<div className="padding z-[1]">
				<div className="flex flex-col items-center gap-5 md:gap-10 lg:flex-row">
					{/* Nội dung sản phẩm */}
					<div className=" relative flex flex-col gap-6 lg:w-1/2">
						<span className="text-xs  md:text-sm font-medium tracking-wide text-gray-500 uppercase">
							Sản phẩm nổi bật
						</span>

						<h2 className="text-[#2c3f58] text-[18px] sm:text-xl md:text-2xl lg:text-4xl font-medium leading-tight">
							{dealProduct?.product?.name}
						</h2>

						<div className="flex max-sm:flex-col max-sm:items-start flex-wrap items-center gap-4 md:gap-8 mt-2">
							<div className="flex items-center">
								<span className="text-[#2c3f58] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
									{formatCurrency(dealProduct?.product?.discount || 0)}
								</span>
								<span className="ml-4 text-base sm:text-xl text-gray-400 line-through">
									{formatCurrency(dealProduct?.product?.price || 0)}
								</span>
							</div>

							<button className="bg-[#2c3f58] text-white px-8 py-3 rounded hover:bg-[#1f2937] transition-colors">
								Mua ngay
							</button>
						</div>
						<div className="flex flex-col items-start gap-2 countDownWrap">
							<h6 className="text-lg font-medium text-gray-500">
								Kết thúc vào
							</h6>
							<Countdown date={new Date(dealProduct?.date)} />
						</div>
					</div>
					<div className="relative flex justify-center w-full lg:w-1/2 ">
						<motion.div
							className="absolute bg-gradient-to-br from-[#9cffe97d] to-[#6b6bd56b] inset-x-6 inset-y-14 md:inset-y-5  md:inset-x-12 "
							initial={{ scale: 1 }}
							animate={{ scale: 1.05 }}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								repeatType: "reverse",
							}}
							style={{
								borderRadius: "34% 66% 67% 33% / 45% 41% 59% 55%",
							}}
						></motion.div>

						<div className="relative z-10 max-md:w-1/2 h-auto max-w-96">
							<img
								src={dealProduct?.product?.thumbnail}
								alt={dealProduct?.product?.name}
								className="w-full h-full mix-blend-multiply"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DealProductSection;
