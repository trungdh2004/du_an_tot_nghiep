import { Checkbox } from "@/components/ui/checkbox";
import Attribute from "./Attribute";
import { useQuery } from "@tanstack/react-query";
import { pagingCart } from "@/service/cart";
import { formatCurrency } from "@/common/func";
import InputQuantity from "@/components/common/InputQuantity";
import { Button } from "@/components/ui/button";

const CartPage = () => {
	const { data: dataCart } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => {
			const { data } = await pagingCart();
			console.log(data);
			return data.data.content;
		},
		staleTime: 5 * 60 * 1000,
	});
	return (
		<div className="padding w-full bg-gray-200 py-5 ">
			<div>
				{/* ===============Cart================ */}
				<table className="w-full max-md:hidden">
					<thead className="w-full bg-white mb-3 border-b-[12px] border-gray-100 max-sm:hidden">
						<tr className="h-14">
							<th className="max-w-14 px-3 text-center align-middle">
								<Checkbox />
							</th>
							<th className="text-left ">Sản phẩm</th>
							<th>Đơn giá</th>
							<th>Số lượng</th>
							<th>Số tiền</th>
							<th>Thao tác</th>
						</tr>
					</thead>
					<tbody className="bg-white w-full">
						<tr className="w-full border-b border-gray-200">
							<td className="align-middle text-center p-4">
								<Checkbox />
							</td>
							<td className="w-1/2 p-4">
								<div className="flex items-start gap-3 w-full">
									<div className="size-20 min-w-20 min-h-20 max-w-20 max-h-20">
										<img
											src="https://down-vn.img.susercontent.com/file/vn-11134207-23030-ky6lxcr2ypov4f"
											alt=""
											className="w-full h-full object-cover"
											loading="lazy"
										/>
									</div>
									<div>
										<h3 className="text-base">
											Áo Khoác Thun Umi Cao Cấp Dày Dặn, Vải Mềm Mịn Có Mũ Chống
											Nắng Màu Đen N I K E Thể Thao , Thoáng Mát, Không Xù Lông
										</h3>
										<Attribute />
									</div>
								</div>
							</td>
							<td className="p-4">
								<div className="flex items-center justify-center gap-3">
									<span className="text-[#0000008a] line-through font-normal">
										{formatCurrency(122125)}
									</span>
									<span className="font-normal">{formatCurrency(122125)}</span>
								</div>
							</td>
							<td className="p-4">
								<div className="flex items-center justify-center">
									<InputQuantity size="small" />
								</div>
							</td>
							<td className="p-4">
								<div className="flex items-center justify-center gap-3">
									<span className="font-normal text-orange-500">
										{formatCurrency(122125)}
									</span>
								</div>
							</td>
							<td className="p-4">
								<div className="flex items-center justify-center cursor-pointer">
									<span>Xoá</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				{/* ===============Cart Mobile================ */}
				<div className="mb-1 space-y-2 md:hidden">
					<div className="flex items-center gap-2 p-2 bg-white rounded">
						<Checkbox />
						<div className="flex items-start gap-3">
							<div className="size-20 min-w-20 min-h-20 max-w-20 max-h-20">
								<img
									src="https://down-vn.img.susercontent.com/file/vn-11134207-23030-ky6lxcr2ypov4f"
									alt=""
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="">
								<h3 className="text-nowrap truncate max-w-60">
									Áo Khoác Thun Umi Cao Cấp Dày Dặn, Vải Mềm Mịn Có Mũ Chống
									Nắng Màu Đen N I K E Thể Thao , Thoáng Mát, Không Xù Lông
								</h3>
								<Attribute />
								<div className="flex flex-col items-start gap-3">
									<div className="flex items-center text-xs gap-2">
										<span className="text-orange-500 font-medium">
											{formatCurrency(155515)}
										</span>{" "}
										<span className="text-[#0000008a] line-through font-normal">
											{formatCurrency(122125)}
										</span>
									</div>
									<InputQuantity size="mobile" className="w-28" />
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 p-2 bg-white rounded">
						<Checkbox />
						<div className="flex items-start gap-3">
							<div className="size-20 min-w-20 min-h-20 max-w-20 max-h-20">
								<img
									src="https://down-vn.img.susercontent.com/file/vn-11134207-23030-ky6lxcr2ypov4f"
									alt=""
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="">
								<h3 className="text-nowrap truncate max-w-60">
									Áo Khoác Thun Umi Cao Cấp Dày Dặn, Vải Mềm Mịn Có Mũ Chống
									Nắng Màu Đen N I K E Thể Thao , Thoáng Mát, Không Xù Lông
								</h3>
								<Attribute />
								<div className="flex flex-col items-start gap-3">
									<div className="flex items-center text-xs gap-2">
										<span className="text-red-500 font-medium">
											{formatCurrency(155515)}
										</span>{" "}
										<span className="text-[#0000008a] line-through font-normal">
											{formatCurrency(122125)}
										</span>
									</div>
									<InputQuantity size="mobile" className="w-28" />
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 p-2 bg-white rounded">
						<Checkbox />
						<div className="flex items-start gap-3">
							<div className="size-20 min-w-20 min-h-20 max-w-20 max-h-20">
								<img
									src="https://down-vn.img.susercontent.com/file/vn-11134207-23030-ky6lxcr2ypov4f"
									alt=""
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="">
								<h3 className="text-nowrap truncate max-w-60">
									Áo Khoác Thun Umi Cao Cấp Dày Dặn, Vải Mềm Mịn Có Mũ Chống
									Nắng Màu Đen N I K E Thể Thao , Thoáng Mát, Không Xù Lông
								</h3>
								<Attribute />
								<div className="flex flex-col items-start gap-3">
									<div className="flex items-center text-xs gap-2">
										<span className="text-orange-500 font-medium">
											{formatCurrency(155515)}
										</span>{" "}
										<span className="text-[#0000008a] line-through font-normal">
											{formatCurrency(122125)}
										</span>
									</div>
									<InputQuantity size="mobile" className="w-28" />
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 p-2 bg-white rounded">
						<Checkbox />
						<div className="flex items-start gap-3">
							<div className="size-20 min-w-20 min-h-20 max-w-20 max-h-20">
								<img
									src="https://down-vn.img.susercontent.com/file/vn-11134207-23030-ky6lxcr2ypov4f"
									alt=""
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="">
								<h3 className="text-nowrap truncate max-w-60">
									Áo Khoác Thun Umi Cao Cấp Dày Dặn, Vải Mềm Mịn Có Mũ Chống
									Nắng Màu Đen N I K E Thể Thao , Thoáng Mát, Không Xù Lông
								</h3>
								<Attribute />
								<div className="flex flex-col items-start gap-3">
									<div className="flex items-center text-xs gap-2">
										<span className="text-orange-500 font-medium">
											{formatCurrency(155515)}
										</span>{" "}
										<span className="text-[#0000008a] line-through font-normal">
											{formatCurrency(122125)}
										</span>
									</div>
									<InputQuantity size="mobile" className="w-28" />
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 p-2 bg-white rounded">
						<Checkbox />
						<div className="flex items-start gap-3">
							<div className="size-20 min-w-20 min-h-20 max-w-20 max-h-20">
								<img
									src="https://down-vn.img.susercontent.com/file/vn-11134207-23030-ky6lxcr2ypov4f"
									alt=""
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="">
								<h3 className="text-nowrap truncate max-w-60">
									Áo Khoác Thun Umi Cao Cấp Dày Dặn, Vải Mềm Mịn Có Mũ Chống
									Nắng Màu Đen N I K E Thể Thao , Thoáng Mát, Không Xù Lông
								</h3>
								<Attribute />
								<div className="flex flex-col items-start gap-3">
									<div className="flex items-center text-xs gap-2">
										<span className="text-orange-500 font-medium">
											{formatCurrency(155515)}
										</span>{" "}
										<span className="text-[#0000008a] line-through font-normal">
											{formatCurrency(122125)}
										</span>
									</div>
									<InputQuantity size="mobile" className="w-28" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sticky bottom-0 bg-white shadow-[0px_-3px_5px_#0000000f] py-5 w:full">
				<div className="flex items-center md:justify-end gap-10 border-b border-gray-300 border-dotted px-2 pb-5 md:px-6">
					<div className="flex items-center text-xs md:text-sm">
						ToinhYour Voucher
					</div>
					<p className="text-xs md:text-sm max-sm:ml-auto">
						Chọn hoặc nhập mã giảm giá
					</p>
				</div>
				<div className="flex items-center md:justify-between  h-16 py-3 px-2 md:px-6">
					<div className="flex items-center gap-2 md:gap-6">
						<Checkbox />
						<label htmlFor="" className="text-xs md:text:sm">
							Tất cả (3)
						</label>
						<span className="max-sm:hidden">Xoá</span>
					</div>
					<div className="flex items-center max-sm:justify-end max-sm:items-end gap-2  max-sm:flex-col  md:gap-5 ml-auto">
						<p>
							Tổng thanh toán{" "}
							<span className="max-sm:hidden">(0 sản phẩm)</span>:{" "}
							<span className="text-red-500 text-xs md:text-xl">
								{formatCurrency(1515554)}
							</span>
						</p>
						<Button className="bg-blue-500 md:px-20 max-sm:py-0.5 px-10">
							Mua hàng
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
