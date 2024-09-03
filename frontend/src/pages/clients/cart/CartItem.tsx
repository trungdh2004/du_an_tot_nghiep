import { formatCurrency } from "@/common/func";
import { optimizeCloudinaryUrl } from "@/common/localFunction";
import InputQuantity from "@/components/common/InputQuantity";
import { Checkbox } from "@/components/ui/checkbox";
import useDebounce from "@/hooks/shared";
import { getCountMyShoppingCart, updateCartItem } from "@/service/cart";
import useCart from "@/store/cart.store";
import { ICartItem } from "@/types/cart";
import { IListColorAttribute, IListSizeAttribute } from "@/types/product";
import { AxiosError } from "axios";
import { toast } from "sonner";
import Attribute from "./Attribute";

interface CartItemProps {
	item: ICartItem;
	listSizeAndColor?: {
		listColor?: IListColorAttribute[];
		listSize?: IListSizeAttribute[];
	};
	attributeAlreadyExists?: {
		listColor?: string[];
		listSize?: string[];
	};
	productId: string;
	checked: boolean;
	onCheckedChange: (productId: string, itemId: string) => void;
}

const CartItem = ({
	item,
	productId,
	checked,
	listSizeAndColor,
	attributeAlreadyExists,
	onCheckedChange,
}: CartItemProps) => {
	const { carts, setItemCart, setCarts, setTotalCart } = useCart();
	const handleChangeQuantity = useDebounce(async (value: number) => {
		try {
			await updateCartItem(item?._id as string, { quantity: value });
			const { data } = await getCountMyShoppingCart();
			const newCarts = carts?.map((cart) => ({
				...cart,
				items: cart?.items?.map((itemCart) =>
					itemCart?._id === item?._id
						? { ...itemCart, quantity: value }
						: itemCart,
				),
			}));
			setCarts(newCarts);
			setTotalCart(data?.count);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		}
	}, 700);
	const handleChangeAttributes = async (colorId: string, sizeId: string) => {
		console.log(">>>Item", item);
	};
	console.log(">>>>>>ITem", item);

	return (
		<div
			key={item._id}
			className="item-group flex items-center mt-3 md:mt-5 px-2.5 md:p-5 pb-4"
		>
			<div className="flex md:flex-row-reverse min-w-9 md:min-w-[58px] md:pl-5 md:pr-3">
				<Checkbox
					checked={checked}
					onCheckedChange={() => onCheckedChange(productId, item._id as string)}
					className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
				/>
			</div>
			<div className="flex items-center w-full lg:w-[46.27949%]">
				<div className="min-w-16 min-h-16 max-w-16 max-h-16 md:min-w-20 md:min-h-20 md:max-w-20 md:max-h-20">
					<img
						src={optimizeCloudinaryUrl(item.thumbnail, 80, 80)}
						alt={item.name}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="px-2.5 py-1.5 sm:w-full w-[78%] md:w-5/6">
					<p className="max-sm:truncate">{item.name}</p>
					<Attribute
						handleChangeAttributes={handleChangeAttributes}
						attributeAlreadyExists={attributeAlreadyExists}
						product={listSizeAndColor}
						attribute={item?.attribute as any}
					/>
					<div className="flex lg:hidden">
						<div className="text-center text-xs space-x-2">
							<span className="line-through text-black/50 text-[10px]">
								{formatCurrency(item?.price)}
							</span>
							<span className="text-red-500">
								{formatCurrency(item?.discount)}
							</span>
						</div>
						<div className="ml-auto">
							<InputQuantity
								size="mobile"
								className="w-24"
								defaultValue={item?.quantity}
								maxTotal={item?.attribute?.quantity}
								getValue={handleChangeQuantity}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden lg:flex w-[15.88022%] text-center text-sm items-center justify-center gap-2">
				<span className="line-through text-black/50">
					{formatCurrency(item?.price)}
				</span>
				<span className="text-red-500">{formatCurrency(item?.discount)}</span>
			</div>
			<div className="hidden lg:flex w-[15.4265%] text-center items-center justify-center">
				<InputQuantity
					size="small"
					defaultValue={item?.quantity}
					maxTotal={item?.attribute?.quantity}
				/>
			</div>
			<div className="hidden lg:block w-[10.43557%] text-center">
				<span className="text-red-500">
					{formatCurrency(item?.price * Number(item?.quantity))}
				</span>
			</div>
			<div
				className="hidden lg:block w-[12.70417%] text-center cursor-pointer"
				onClick={() => setItemCart(item)}
			>
				Xoá
			</div>
		</div>
	);
};

export default CartItem;
