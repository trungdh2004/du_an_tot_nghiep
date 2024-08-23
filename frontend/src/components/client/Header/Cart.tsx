import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import useCart from "@/store/cart.store";
import { LucideShoppingCart } from "lucide-react";

const Cart = () => {
	const { totalCart } = useCart();
	const { isLoggedIn } = useAuth();
	return (
		<>
			<HoverCard>
				<HoverCardTrigger asChild>
					<div className="relative hover:bg-[#919eab27] p-1" id="cartHeader">
						<div
							className={cn(
								" rounded-full bg-red-500 text-white absolute  p-0.5 text-xs hidden items-center justify-center -top-1 -right-1 ",
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
		</>
	);
};

export default Cart;
