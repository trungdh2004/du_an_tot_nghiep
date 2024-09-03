import { Checkbox } from "@/components/ui/checkbox";
import { ICart } from "@/types/cart";
import CartItem from "./CartItem";

interface CartGroupProps {
	cart: ICart;
	groupChecked: boolean;
	onGroupCheckedChange: (productId: string) => void;
	onItemCheckedChange: (productId: string, itemId: string) => void;
	checkedState: Record<string, boolean>;
}

const CartGroup = ({
	cart,
	groupChecked,
	onGroupCheckedChange,
	onItemCheckedChange,
	checkedState,
}: CartGroupProps) => {
	return (
		<div className="bg-white mb-3">
			<div className="flex items-center border-b border-black border-opacity-[0.09] h-15 px-2.5 md:px-5 py-3">
				<div className="group flex md:flex-row-reverse min-w-9 md:min-w-[58px] md:pl-5 md:pr-3">
					<Checkbox
						checked={groupChecked}
						onCheckedChange={() =>
							onGroupCheckedChange(cart.product._id as string)
						}
						className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
					/>
				</div>
				<div>{cart?.product?.name}</div>
			</div>
			{cart?.items?.map((item, index) => {
				const attributeAlreadyExists = cart?.items?.reduce(
					(acc, p) => {
						if (p._id !== item._id) {
							const colorId = (p?.attribute?.color as any)?._id;
							const sizeId = (p?.attribute?.size as any)?._id;
							if (
								colorId &&
								colorId !== (item?.attribute?.color as any)?._id &&
								!acc.listColor.includes(colorId)
							) {
								acc.listColor.push(colorId);
							}
							if (
								sizeId &&
								sizeId !== (item?.attribute?.size as any)?._id &&
								!acc.listSize.includes(sizeId)
							) {
								acc.listSize.push(sizeId);
							}
						}
						return acc;
					},
					{ listColor: [] as string[], listSize: [] as string[] },
				);
				console.log(">>>Group Item", cart);

				return (
					<CartItem
						listSizeAndColor={{
							listSize: cart?.listSize as any,
							listColor: cart?.listColor as any,
						}}
						attributeAlreadyExists={attributeAlreadyExists}
						key={item._id}
						item={item}
						productId={cart.product._id as string}
						checked={checkedState[item._id as string]}
						onCheckedChange={onItemCheckedChange}
					/>
				);
			})}
		</div>
	);
};

export default CartGroup;
