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

const Cart = () => {
	const { totalCart } = useCart();
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
					xin chào
				</HoverCardContent>
			</HoverCard>
		</Link>
	);
};

export default Cart;
