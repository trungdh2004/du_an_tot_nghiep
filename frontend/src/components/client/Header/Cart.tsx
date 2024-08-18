import { LucideShoppingCart } from "lucide-react";

const Cart = () => {
	return (
		<div className="relative hover:bg-[#919eab27] p-1" id="cartHeader">
			<span className=" rounded-full bg-red-500 text-white absolute w-4 h-4 text-xs flex items-center justify-center top-0 -right-1">
				1
			</span>
			<LucideShoppingCart strokeWidth={1.5} size={20} />
		</div>
	);
};

export default Cart;
