import { formatCurrency } from "@/common/func";
import StarRatings from "react-star-ratings";
import ListColor from "./ListColor";
import ListSize from "./ListSize";
import InputQuantity from "@/components/common/InputQuantity";
import { Button } from "@/components/ui/button";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useState } from "react";
import { IProduct } from "@/types/typeProduct";
type Props = {
	product?:IProduct,
	isLoading?: boolean
};
const InfoProduct = ({product,isLoading}:Props) => {
	const [totalQuanti] = useState();
	return (
		<div className="p-5 pt-10">
			<div className="space-y-5">
				<div className="space-y-0.5">
					<p className="uppercase text-xs">
						Danh mục: <span>{(product?.category as any)?.name}</span>
					</p>
					<h2 className="uppercase text-xl">
						{product?.name}
					</h2>
					<div className="flex items-center capitalize text-sm text-[#767676] [&>p]:px-4  [&>*]:border-r [&>*]:border-[#00000024]">
						<div className="flex items-end gap-1 pr-4">
							<span className="border-b border-blue-500 text-blue-500 font-medium">
								3.5
							</span>
							<div className="pb-0.5 flex w-max">
								<StarRatings
									rating={3.5}
									numberOfStars={5}
									starDimension="14px"
									starSpacing="0.5px"
									starRatedColor="#ee4d2d"
								/>
							</div>
						</div>
						<p className="flex items-center gap-1 text-nowrap">
							<span className="text-black font-medium ">7</span>
							Đánh giá
						</p>
						<p className="flex items-center gap-1 text-nowrap">
							<span className="text-black font-medium ">{product?.quantitySold}</span>
							Đã bán
						</p>
						<p className="flex items-center gap-1 border-none text-nowrap">
							<span className="text-black font-medium ">7</span>
							Lượt xem
						</p>
					</div>
				</div>
				<div className="flex items-end gap-5 bg-[#fafafa] py-4 px-5">
					<span className="text-gray-500 text-base line-through">
						{formatCurrency(900000)}
					</span>
					<p className="text-2xl font-medium text-blue-500">
						{formatCurrency(15151515)}
					</p>
					<span className="capitalize text-sm text-white font-medium bg-blue-500 px-1 py-0.5 rounded">
						34% giảm
					</span>
				</div>
				<div className="space-y-5">
					<ListColor />
					<ListSize />
					<div className="flex items-center">
						<h3 className="font-normal text-base text-gray-500  min-w-28 max-w-28">
							Số lượng
						</h3>
						<div className="flex items-center gap-3">
							<InputQuantity

								defaultValue={4}
								maxTotal={product?.quantity}
								getValue={(value) => {
									console.log(value);
								}}
							/>
							<span className="text-gray-600 text-sm md:text-base">
							{product?.quantity} sản phẩm có sẵn
							</span>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Button className="bg-blue-500 hover:bg-blue-700 px-5">
							Mua ngay
						</Button>
						<Button className="bg-blue-100 hover:bg-blue-50 flex items-center gap-1.5 text-blue-500">
							<MdOutlineAddShoppingCart size={22} /> Thêm vào giỏ hàng
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoProduct;
