import { IProductDetail } from "@/types/product";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
interface Props {
	dataReview: any;
	setSearchRating: React.Dispatch<
		React.SetStateAction<{
			pageIndex: number;
			pageSize: number;
			rating: number | null;
		}>
	>;
	product: IProductDetail | undefined;
}
import NoReview from "@/assets/noreview.png";
import { Review } from "@/types/review";
import { format } from "date-fns";
import Paginations from "@/components/common/Pagination";
const ProductReview = ({ dataReview, setSearchRating, product }: Props) => {
	console.log(dataReview);
	console.log(product);

	return (
		<div className="bg-white box-shadow py-4 px-7">
			<h3 className="text-xl py-4">Đánh giá sản phẩm</h3>
			<div className="border border-orange-100 bg-orange-100 py-4 px-3 bg-opacity-20 flex gap-8">
				<div className="flex items-center gap-2">
					<p className="text-3xl text-orange-600">{product?.rating}</p>
					<span className="mt-[10px] text-lg text-orange-600">trên 5</span>
				</div>
				<div className="flex space-x-2 pt-1">
					<label
						onClick={() =>
							setSearchRating((prev) => {
								return { ...prev, rating: null };
							})
						}
					>
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
					<label
						onClick={() =>
							setSearchRating((prev) => {
								return { ...prev, rating: 5 };
							})
						}
					>
						<input
							type="radio"
							name="rating"
							defaultValue={5}
							className="hidden peer"
						/>
						<div className="flex items-center gap-1 border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							<span>5</span> <FaStar size={12} className="text-orange-400" />
						</div>
					</label>
					<label
						onClick={() =>
							setSearchRating((prev) => {
								return { ...prev, rating: 4 };
							})
						}
					>
						<input
							type="radio"
							name="rating"
							defaultValue={4}
							className="hidden peer"
						/>
						<div className="flex items-center gap-1 border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							<span>4</span> <FaStar size={12} className="text-orange-400" />
						</div>
					</label>
					<label
						onClick={() =>
							setSearchRating((prev) => {
								return { ...prev, rating: 3 };
							})
						}
					>
						<input
							type="radio"
							name="rating"
							defaultValue={3}
							className="hidden peer"
						/>
						<div className="flex items-center gap-1 border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							<span>3</span> <FaStar size={12} className="text-orange-400" />
						</div>
					</label>
					<label
						onClick={() =>
							setSearchRating((prev) => {
								return { ...prev, rating: 2 };
							})
						}
					>
						<input
							type="radio"
							name="rating"
							defaultValue={2}
							className="hidden peer"
						/>
						<div className="flex items-center gap-1 border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							<span>2</span> <FaStar size={12} className="text-orange-400" />
						</div>
					</label>
					<label
						onClick={() =>
							setSearchRating((prev) => {
								return { ...prev, rating: 1 };
							})
						}
					>
						<input
							type="radio"
							name="rating"
							defaultValue={1}
							className="hidden peer"
						/>
						<div className="flex items-center gap-1 border peer-checked:text-red-500 px-4 py-1 cursor-pointer peer-checked:border-orange-500 text-sm">
							<span>1</span> <FaStar size={12} className="text-orange-400" />
						</div>
					</label>
				</div>
			</div>
			{dataReview?.content?.length === 0 ? (
				<div className="flex flex-col gap-3 py-20 justify-center items-center">
					<img src={NoReview} alt="" className="w-40 h-40" />
					<p>Chưa có đánh giá</p>
				</div>
			) : (
				<div className="flex flex-col">
					{dataReview?.content?.map((review: Review, index: number) => {
						return (
							<div className="" key={index}>
								<div className="flex gap-3 py-5">
									<img
										src={review?.user?.avatarUrl || "/avatar_25.jpg"}
										alt=""
										className="w-11 h-11 rounded-full"
									/>
									<div className="flex flex-col gap-2">
										<h2 className="font-medium text-base text-black">
											{review.user.full_name}
										</h2>

										<div className="flex text-orange-500">
											{[...Array(5)].map((_, index) =>
												index < review.rating ? (
													<FaStar key={index} size={13} />
												) : (
													<FaRegStar key={index} size={13} />
												),
											)}
										</div>

										<span className="text-xs text-gray-500">
											{format(new Date(review.createdAt), "dd/MM/yyyy")} | Phân
											loại hàng : {review.attribute}
										</span>

										<p className="text-sm">
											<span className="text-gray-500">Lời nhắn : </span>
											{review.content}
										</p>
									</div>
								</div>
								<hr />
							</div>
						);
					})}
					<Paginations
						pageCount={dataReview?.totalPage}
						handlePageClick={(event: any) => {
							// setPageIndex(event.selected + 1);
							setSearchRating((prev) => {
								return { ...prev, pageIndex: event.selected + 1 };
							});
						}}
						forcePage={0}
					/>
				</div>
			)}
		</div>
	);
};

export default ProductReview;
