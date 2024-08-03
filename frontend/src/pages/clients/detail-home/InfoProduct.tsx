import { formatCurrency } from "@/common/func";
const InfoProduct = () => {
	return (
		<div>
			<div className="space-y-0.5">
				<p className="uppercase text-xs">
					Danh mục: <span>Áo phông</span>
				</p>
				<h2 className="uppercase text-xl">Áo boy phố</h2>
				<div className="flex items-center capitalize text-xs text-[#767676] *:px-5 [&>*]:border-r [&>*]:border-[#767676]">
					<p className="flex items-center"></p>
					<p className="">
						<span>7</span>
						Đánh giá
					</p>
					<p className="">
						<span>7</span>
						Đã bán
					</p>
					<p className="border-none">
						<span>7</span>
						Lượt xem
					</p>
				</div>
				<p className="text-xl font-semibold py-5 border-b  border-gray-200">
					{formatCurrency(15151515)}
				</p>
			</div>
		</div>
	);
};

export default InfoProduct;
