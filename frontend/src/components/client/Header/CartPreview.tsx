import { formatCurrency } from "@/common/func";
import { ICart } from "@/types/cart";
import { Link } from "react-router-dom";
type Props = {
	totalCart?: number;
	carts?: ICart[];
};
const CartPreview = ({ totalCart, carts }: Props) => {
	return (
		<div className="">
			<div className="mb-5">
				<p className="text-xs">Sản phẩm mới thêm</p>
			</div>
			<div className="space-y-3 h-auto  max-h-96 overflow-y-auto">
				{carts?.map((cart) =>
					cart?.items?.map((item) => {
						return item?.attribute?._id && item?.attribute?.quantity ? (
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-1">
									<div className="min-w-10 min-h-10 max-w-10 max-h-10 w-10 h-10">
										<img
											src={item?.thumbnail}
											alt=""
											className="w-full h-full object-cover"
										/>
									</div>
									<p className="max-w-52 truncate text-sm">{item?.name}</p>
								</div>
								<p className="text-red-500 text-sm">
									{formatCurrency(item?.attribute?.discount || 0)}
								</p>
							</div>
						) : (
							<></>
						);
					}),
				)}
			</div>
			<div className="flex items-center justify-between  mt-3">
				<p className="text-xs capitalize">{totalCart} thêm vào giỏ hàng</p>
				<Link
					to={"/cart"}
					className="text-white text-sm px-5  py-1.5  bg-red-500 hover:bg-red-600 rounded"
				>
					Xem giỏ hàng
				</Link>
			</div>
		</div>
	);
};

export default CartPreview;
