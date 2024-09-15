import { formatCurrency } from "@/common/func";
import { optimizeCloudinaryUrl } from "@/common/localFunction";
import InputQuantity from "@/components/common/InputQuantity";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateAttributeItemCart } from "@/hooks/cart";
import useDebounce from "@/hooks/shared";
import { cn } from "@/lib/utils";
import { getCountMyShoppingCart, updateCartItem } from "@/service/cart";
import useCart from "@/store/cart.store";
import { ICart, ICartItem } from "@/types/cart";
import { IListColorAttribute, IListSizeAttribute } from "@/types/product";
import { AxiosError } from "axios";
import { useState } from "react";
import { IoBanOutline } from "react-icons/io5";
import { toast } from "sonner";
import Attribute from "./Attribute";
import { Link } from "react-router-dom";

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
		<div key={item._id} className="flex items-center item-group">
			<div
				className={cn(
					"flex md:flex-row-reverse  min-w-[36px] md:min-w-[58px] md:pl-5 md:pr-3",
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
						<IoBanOutline className="text-red-500 " />
					</>
				)}
			</div>
			<div className="flex items-center w-full lg:w-[46.27949%]">
				<div className="relative overflow-hidden rounded min-w-14 min-h-14 max-w-14 max-h-14 md:min-w-20 md:min-h-20 md:max-w-20 md:max-h-20">
					<img
						src={optimizeCloudinaryUrl(item.thumbnail, 80, 80)}
						alt={item.name}
						className="object-cover w-full h-full"
					/>
					<div className="absolute inset-x-0 bottom-0 bg-black/45">
						<p className="text-xs text-center text-white">
							{!item?.attribute?._id
								? "Không khả dụng"
								: !item?.attribute?.quantity
									? "Hết hàng"
									: ""}
						</p>
					</div>
				</div>
				<div
					className={cn(
						"flex flex-col justify-start px-2.5 py-1.5 sm:w-full md:w-5/6",
						!item?.attribute?._id || !item?.attribute?.quantity
							? "w-[70%]"
							: "w-[73%]",
					)}
				>
					<Link
						to={`/shop/detail/${decodeURI(cart?.product?.slug as string)}`}
						className="max-sm:truncate"
					>
						{item.name}
					</Link>
					<div className="inline-block">
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
						<div
							className={cn(
								"text-sm text-left pointer-events-none",
								(!item?.attribute?.color && !item?.attribute?.size) ||
									!item?.attribute?.quantity
									? "text-red-500 max-sm:max-w-44 text-[10px]"
									: "text-gray-500 ",
							)}
						>
							{!item?.attribute?.color && !item?.attribute?.size
								? `Phân loại hàng này đã bị xoá, vui lòng lựa chọn một phân loại khác.`
								: item?.attribute?.quantity
									? `${(item?.attribute?.color as any)?.name}, ${(item?.attribute?.size as any)?.name}`
									: `Phân loại hàng này đã hết, vui lòng lựa chọn một phân loại khác.`}
						</div>
					</div>
					<div className="flex lg:hidden">
						<div className="space-x-2 text-xs text-center">
							<span
								className={cn(
									"line-through text-black/50 text-[8px]",
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
										: "text-red-500 font-bold",
								)}
							>
								{formatCurrency(item?.attribute?.discount || 0)}
							</span>
						</div>
						<div className="ml-auto">
							{item?.attribute?._id && item?.attribute?.quantity ? (
								<InputQuantity
									size="mobile"
									className="w-20"
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
				{item?.attribute?._id && item?.attribute?.quantity ? (
					<InputQuantity
						size="small"
						defaultValue={item?.quantity}
						maxTotal={item?.attribute?.quantity}
						getValue={handleChangeQuantity}
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
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button className="bg-transparent border-none outline-none hover:bg-transparent text-black/75">
								Xoá
							</Button>
						</TooltipTrigger>
						<TooltipContent>Xoá sản phẩm ra khỏi giỏ hàng</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};

export default CartItem;
