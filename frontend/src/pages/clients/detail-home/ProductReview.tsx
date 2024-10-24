import { IProductDetail } from "@/types/product";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
interface Props {
	dataReview: any;
	setRating: (rating: number) => void;
	product: IProductDetail | undefined;
}
const ProductReview = ({ dataReview, setRating, product }: Props) => {
	console.log(dataReview);
	console.log(product);

	return (
		<div className="bg-white box-shadow py-4 px-7">
			<h3 className="text-xl">Đánh giá sản phẩm</h3>
			<div className="border border-orange-100 bg-orange-100 py-4 px-3 bg-opacity-20 flex gap-8">
				<div className="flex items-center gap-2">
					<p className="text-3xl text-orange-600">{product?.rating}</p>
					<span className="mt-[10px] text-lg text-orange-600">trên 5</span>
				</div>
				<div className="flex space-x-2 pt-1">
					<label>
						<input
							type="radio"
							name="rating"
							defaultValue="null"
							className="hidden peer"
							defaultChecked
						/>
						<div className="border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm ">
							Tất Cả
						</div>
					</label>
					<label>
						<input
							type="radio"
							name="rating"
							defaultValue={5}
							className="hidden peer"
						/>
						<div className="border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							5 Sao
						</div>
					</label>
					<label>
						<input
							type="radio"
							name="rating"
							defaultValue={4}
							className="hidden peer"
						/>
						<div className="border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							4 Sao
						</div>
					</label>
					<label>
						<input
							type="radio"
							name="rating"
							defaultValue={3}
							className="hidden peer"
						/>
						<div className="border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							3 Sao
						</div>
					</label>
					<label>
						<input
							type="radio"
							name="rating"
							defaultValue={2}
							className="hidden peer"
						/>
						<div className="border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							2 Sao
						</div>
					</label>
					<label>
						<input
							type="radio"
							name="rating"
							defaultValue={1}
							className="hidden peer"
						/>
						<div className="border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							1 Sao
						</div>
					</label>
				</div>
			</div>

			<div className="">
				<div className="flex gap-3 py-5">
					<img
						src="https://picsum.photos/200"
						alt=""
						className="w-11 h-11 rounded-full"
					/>
					<div className="flex flex-col gap-2">
						<h2 className="font-medium text-base text-black">toi</h2>

						<div className="flex text-orange-500">
							{[...Array(5)].map((_, index) =>
								index < 2 ? (
									<FaStar key={index} size={13} />
								) : (
									<FaRegStar key={index} size={13} />
								),
							)}
						</div>

						<span className="text-xs text-gray-500">
							3/4/2024 | Phân loại hàng : Trắng , XL
						</span>

						<p className="text-sm">
							<span className="text-gray-500">Lời nhắn : </span>
							âjajajajajajajjajajajajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
						</p>
					</div>
				</div>
				<hr />
			</div>
			<div className="">
				<div className="flex gap-3 py-5">
					<img
						src="https://picsum.photos/200"
						alt=""
						className="w-11 h-11 rounded-full"
					/>
					<div className="flex flex-col gap-2">
						<h2 className="font-medium text-base text-black">toi</h2>

						<div className="flex text-orange-500">
							{[...Array(5)].map((_, index) =>
								index < 2 ? (
									<FaStar key={index} size={13} />
								) : (
									<FaRegStar key={index} size={13} />
								),
							)}
						</div>

						<span className="text-xs text-gray-500">
							3/4/2024 | Phân loại hàng : Trắng , XL
						</span>

						<p className="text-sm">
							<span className="text-gray-500">Lời nhắn : </span>
							âjajajajajajajjajajajajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
						</p>
					</div>
				</div>
				<hr />
			</div>
		</div>
	);
};

export default ProductReview;
