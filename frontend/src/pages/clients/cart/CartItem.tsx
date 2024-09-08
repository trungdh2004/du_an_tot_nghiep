import { formatCurrency } from "@/common/func";
import { optimizeCloudinaryUrl } from "@/common/localFunction";
import InputQuantity from "@/components/common/InputQuantity";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateAttributeItemCart } from "@/hooks/cart";
import useDebounce from "@/hooks/shared";
import { getCountMyShoppingCart, updateCartItem } from "@/service/cart";
import useCart from "@/store/cart.store";
import { ICart, ICartItem } from "@/types/cart";
import { IListColorAttribute, IListSizeAttribute } from "@/types/product";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import Attribute from "./Attribute";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IoBanOutline } from "react-icons/io5";

interface CartItemProps {
	cart?: ICart;
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
	cart,
	item,
	productId,
	checked,
	listSizeAndColor,
	attributeAlreadyExists,
	onCheckedChange,
}: CartItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { carts, setItemCart, setCarts, setTotalCart } = useCart();
	const [errors, setErrors] = useState({
		color: false,
		size: false,
	});
	const { updateAttributeItemCart } = useUpdateAttributeItemCart();
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
	const handleChangeAttributes = (colorId: string, sizeId: string) => {
		updateAttributeItemCart({
			colorId,
			sizeId,
			item,
			cart,
			setIsOpen,
			setErrors,
		});
	};
	return (
		<div
			key={item._id}
			className="item-group flex items-center mt-3 md:mt-5 px-2.5 md:p-5 pb-4"
		>
			<div
				className={cn(
					"flex md:flex-row-reverse  md:min-w-[58px] md:pl-5 md:pr-3",
					item?.attribute?._id && item?.attribute?.quantity
						? "min-w-9"
						: "min-w-9 md:min-w-16",
				)}
			>
				{item?.attribute?._id && item?.attribute?.quantity ? (
					<Checkbox
						checked={checked}
						onCheckedChange={() =>
							onCheckedChange(productId, item._id as string)
						}
						className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
					/>
				) : (
					<>
						<Badge
							className="hidden md:block uppercase text-nowrap text-[8px]"
							variant={"destructive"}
						>
							Hết hàng
						</Badge>
						<IoBanOutline className="md:hidden text-red-500" />
					</>
				)}
			</div>
			<div className="flex items-center w-full lg:w-[46.27949%]">
				<div className="min-w-16 min-h-16 max-w-16 max-h-16 md:min-w-20 md:min-h-20 md:max-w-20 md:max-h-20">
					<img
						src={optimizeCloudinaryUrl(item.thumbnail, 80, 80)}
						alt={item.name}
						className="w-full h-full object-cover"
					/>
				</div>
				<div
					className={cn(
						"px-2.5 py-1.5 sm:w-full md:w-5/6",
						!item?.attribute?._id || !item?.attribute?.quantity
							? "w-[75%]"
							: "w-[78%]",
					)}
				>
					<p className="max-sm:truncate">{item.name}</p>
					<Attribute
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						errors={errors}
						setErrors={setErrors}
						handleChangeAttributes={handleChangeAttributes}
						attributeAlreadyExists={attributeAlreadyExists}
						product={listSizeAndColor}
						attribute={item?.attribute as any}
					/>
					<div className="flex lg:hidden">
						<div className="text-center text-xs space-x-2">
							<span
								className={cn(
									"line-through text-black/50 text-[10px]",
									!item?.attribute?._id ||
										(!item?.attribute?.quantity && "hidden"),
								)}
							>
								{formatCurrency(item?.attribute?.price || 0)}
							</span>
							<span
								className={cn(
									!item?.attribute?._id || !item?.attribute?.quantity
										? "text-gray-700"
										: "text-red-500",
								)}
							>
								{formatCurrency(item?.attribute?.discount || 0)}
							</span>
						</div>
						<div className="ml-auto">
							{item?.attribute?._id && item?.attribute?.quantity ? (
								<InputQuantity
									size="mobile"
									className="w-24"
									defaultValue={item?.quantity}
									maxTotal={item?.attribute?.quantity}
									getValue={handleChangeQuantity}
								/>
							) : (
								<span className="text-black opacity-45">{item?.quantity}</span>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="hidden lg:flex w-[15.88022%] text-center text-sm items-center justify-center gap-2">
				<span
					className={cn(
						"line-through text-black/50",
						!item?.attribute?.discount && "hidden",
					)}
				>
					{formatCurrency(item?.attribute?.price || 0)}
				</span>
				<span
					className={cn(
						item?.attribute?.discount ? "text-red-500" : "text-gray-700",
					)}
				>
					{formatCurrency(item?.attribute?.discount || 0)}
				</span>
			</div>
			<div className="hidden lg:flex w-[15.4265%] text-center items-center justify-center">
				{item?.attribute?._id ? (
					<InputQuantity
						size="small"
						defaultValue={item?.quantity}
						maxTotal={item?.attribute?.quantity}
					/>
				) : (
					<span className="text-black opacity-45">{item?.quantity}</span>
				)}
			</div>
			<div className="hidden lg:block w-[10.43557%] text-center">
				<span className="text-red-500">
					{formatCurrency(
						item?.attribute?.discount
							? item?.attribute?.discount * Number(item?.quantity)
							: 0,
					)}
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
