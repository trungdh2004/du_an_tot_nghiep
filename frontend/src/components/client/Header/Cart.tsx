import { formatCurrency } from "@/common/func";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuth } from "@/hooks/auth";
import { useCurrentRouteAndNavigation } from "@/hooks/router";
import { cn } from "@/lib/utils";
import useCart from "@/store/cart.store";
import { LucideShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartPreview from "./CartPreview";

const Cart = () => {
	const { totalCart, carts } = useCart();
	const { isLoggedIn } = useAuth();
	const navigateIsLogin = useCurrentRouteAndNavigation();
	return (
		<Link
			to={"/cart"}
			onClick={(e) => {
				if (!isLoggedIn) {
					e.preventDefault();
					navigateIsLogin();
				}
			}}
		>
			<HoverCard>
				<HoverCardTrigger asChild>
					<div
						className="relative hover:bg-[#919eab27] rounded-full p-1"
						id="cartHeader"
					>
						<div
							className={cn(
								" rounded-full bg-red-500 text-white absolute  p-0.5 px-1 text-xs hidden items-center justify-center -top-1 -right-1 ",
								isLoggedIn && "inline-block",
							)}
						>
							{totalCart}
						</div>
						<LucideShoppingCart strokeWidth={1.5} size={20} />
					</div>
				</HoverCardTrigger>
				<HoverCardContent align="end" className="w-80">
					<div className={cn("")}>
						{!totalCart ? (
							<div className="py-14 flex items-center justify-center">
								<div className="flex flex-col items-center justify-center">
									<div className="w-24 h-24 mx-auto">
										<img
											src="/cart-is-empty.png"
											alt=""
											className="w-full h-full object-cover"
										/>
									</div>
									<p>Chưa có sản phẩm</p>
								</div>
							</div>
						) : (
							<CartPreview carts={carts} totalCart={totalCart} />
						)}
					</div>
				</HoverCardContent>
			</HoverCard>
		</Link>
	);
};

export default Cart;
