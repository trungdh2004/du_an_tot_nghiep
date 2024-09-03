import { formatCurrency } from "@/common/func";
import StarRatings from "react-star-ratings";
import ListColor from "./ListColor";
import ListSize from "./ListSize";
import InputQuantity from "@/components/common/InputQuantity";
import { Button } from "@/components/ui/button";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useEffect, useState, useCallback, useMemo } from "react";
import { IProductDetail } from "@/types/product";
import ButtonLoading from "@/components/common/ButtonLoading";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { addProductToCart } from "@/service/cart";
import { AxiosError } from "axios";
import useCartAnimation from "@/hooks/useCartAnimation";
import useCart from "@/store/cart.store";
import { useCurrentRouteAndNavigation } from "@/hooks/router";
import { useAuth } from "@/hooks/auth";

type Props = {
	product?: IProductDetail;
	isLoading?: boolean;
};

interface IStateInfoProduct {
	listColorExist: {
		id: string;
		colorCode: string;
		colorName: string;
		listSize: string[];
	}[];
	listSizeExist: {
		id: string;
		sizeName: string;
		listColor: string[];
	}[];
}

const InfoProduct: React.FC<Props> = ({ product, isLoading = false }) => {
	const { isLoggedIn } = useAuth();
	const { startAnimation, RenderAnimation } = useCartAnimation();
	const navigateIsLogin = useCurrentRouteAndNavigation();
	const { updateTotalCart } = useCart();
	const [stateInfoProduct, setStateInfoProduct] = useState<IStateInfoProduct>({
		listColorExist: [],
		listSizeExist: [],
	});
	const [exitsListSize, setExitsListSize] = useState<string[]>([]);
	const [exitsListColor, setExitsListColor] = useState<string[]>([]);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [chooseColorId, setChooseColorId] = useState("");
	const [chooseSizeId, setChooseSizeId] = useState("");
	const [attributeId, setAttributeId] = useState("");
	const [purchaseQuantity, setPurchaseQuantity] = useState(1);
	const [isLoadingButton, setIsLoadingButton] = useState({
		isLoadingShopping: false,
		isLoadingBynow: false,
	});
	const [isErrorAttribute, setIsErrorAttribute] = useState<boolean>(false);
	useMemo(() => {
		const updateQuantityAndAttribute = () => {
			if (chooseColorId && chooseSizeId) {
				const currentAttribute = product?.attributes?.find(
					(attribute) =>
						attribute?.color?._id === chooseColorId &&
						attribute?.size?._id === chooseSizeId,
				);
				setIsErrorAttribute(false);
				setAttributeId(currentAttribute?._id || "");
				setTotalQuantity(currentAttribute?.quantity || product?.quantity || 0);
			} else if (chooseSizeId) {
				const quantity = product?.listSize?.find(
					(size) => size?.sizeId === chooseSizeId,
				)?.quantity;
				setAttributeId("");
				setTotalQuantity(quantity || product?.quantity || 0);
			} else if (chooseColorId) {
				const quantity = product?.listColor?.find(
					(color) => color?.colorId === chooseColorId,
				)?.quantity;
				setTotalQuantity(quantity || product?.quantity || 0);
				setAttributeId("");
			} else {
				setTotalQuantity(product?.quantity || 0);
				setAttributeId("");
			}
		};
		updateQuantityAndAttribute();
	}, [chooseColorId, chooseSizeId, product]);

	const handleStateInfoProduct = useCallback(() => {
		if (!product) return { listColorExist: [], listSizeExist: [] };

		const listColorExist =
			product.listColor?.map((color) => ({
				id: color.colorId,
				colorCode: color.colorCode,
				colorName: color.colorName,
				listSize: color.list
					?.map((item) => item.size?._id)
					.filter(Boolean) as string[],
			})) || [];

		const listSizeExist =
			product.listSize?.map((size) => ({
				id: size.sizeId,
				sizeName: size.sizeName,
				listColor: size.list
					?.map((item) => item.color?._id)
					.filter(Boolean) as string[],
			})) || [];

		return { listColorExist, listSizeExist };
	}, [product]);

	useEffect(() => {
		setStateInfoProduct(handleStateInfoProduct());
		setTotalQuantity(product?.quantity || 0);
	}, [product, handleStateInfoProduct]);
	const handleOrderProduct = async (action: "add-to-cart" | "buy-now") => {
		if (!isLoggedIn) {
			return navigateIsLogin();
		}
		if (!attributeId) {
			setIsErrorAttribute(true);
			return;
		}
		switch (action) {
			case "add-to-cart":
				try {
					setIsLoadingButton({
						isLoadingBynow: false,
						isLoadingShopping: true,
					});
					const { data } = await addProductToCart({
						attribute: attributeId,
						productId: product?._id as string,
						quantity: purchaseQuantity,
					});
					setIsLoadingButton({
						isLoadingBynow: false,
						isLoadingShopping: false,
					});
					document.querySelector(".ablum-detail-product");
					const itemElement = document.querySelector(
						".ablum-detail-product",
					) as HTMLDivElement;
					startAnimation(itemElement, product?.thumbnail as string);
					updateTotalCart(purchaseQuantity);
				} catch (error) {
					if (error instanceof AxiosError) {
						toast.error(error?.response?.data?.message);
					}
				}

				break;
			case "buy-now":
				console.log("Buy now");
				break;
			default:
				toast.error("Hành động không hợp lệ vui lòng thử lại!");
				break;
		}
	};
	console.log(">>>product", product);

	return (
		<>
			{RenderAnimation()}
			<div className="w-full pt-10">
				<div className="space-y-3 md:space-y-5 w-full">
					<div className="space-y-0.5 p-1.5 w-full">
						<p className="uppercase text-xs">
							Danh mục: <span>{product?.category?.name}</span>
						</p>
						<h2 className="uppercase text-xl  text-wrap w-full">
							{product?.name}
						</h2>
						<div className="flex items-center capitalize text-sm text-[#767676] [&>p]:px-4  [&>*]:border-r [&>*]:border-[#00000024]">
							<div className="flex items-end gap-1 pr-4">
								<span className="border-b border-blue-500 text-blue-500 font-medium">
									3.5
								</span>
								<div className="pb-0.5 flex w-max">
									<StarRatings
										rating={3.5}
										numberOfStars={5}
										starDimension="14px"
										starSpacing="0.5px"
										starRatedColor="#ee4d2d"
									/>
								</div>
							</div>
							<p className="flex items-center gap-1 text-nowrap max-md:border-none">
								<span className="text-black font-medium">7</span>
								Đánh giá
							</p>
							<p className="hidden md:flex items-center gap-1 text-nowrap">
								<span className="text-black font-medium">
									{product?.quantitySold}
								</span>
								Đã bán
							</p>
							<p className="hidden md:flex items-center gap-1 border-none text-nowrap">
								<span className="text-black font-medium">7</span>
								Lượt xem
							</p>
						</div>
					</div>
					<div className="flex items-end gap-5 bg-[#fafafa] py-4 px-5 w-full">
						<span className="text-gray-500 text-base line-through">
							{formatCurrency(900000)}
						</span>
						<p className="text-2xl font-medium text-blue-500">
							{formatCurrency(product?.price || 0)}
						</p>
						<span className="capitalize text-sm text-white font-medium bg-blue-500 px-1 py-0.5 rounded">
							34% giảm
						</span>
					</div>
					<div className="w-full space-y-3 md:space-y-5">
						<div
							className={cn(
								"space-y-5 p-1.5 w-full",
								isErrorAttribute && "bg-red-50",
							)}
						>
							<ListColor
								listColorExist={stateInfoProduct?.listColorExist}
								onChoose={setChooseColorId}
								setExitsListSize={setExitsListSize}
								exitsListColor={exitsListColor}
								setTotalQuantity={setTotalQuantity}
							/>
							<ListSize
								listSizeExist={stateInfoProduct?.listSizeExist}
								onChoose={setChooseSizeId}
								exitsListSize={exitsListSize}
								setExitsListColor={setExitsListColor}
								setTotalQuantity={setTotalQuantity}
							/>
							<div className="flex max-md:flex-col max-md:gap-3 items-start md:items-center">
								<h3 className="font-normal text-base text-gray-500 min-w-28 max-w-28">
									Số lượng
								</h3>
								<div className="flex items-center gap-3">
									<InputQuantity
										disabled={totalQuantity <= 0}
										defaultValue={1}
										maxTotal={totalQuantity}
										getValue={setPurchaseQuantity}
										className="bg-white"
										size="responsive"
									/>
									<span className="text-gray-600 text-sm md:text-base">
										{totalQuantity} sản phẩm có sẵn
									</span>
								</div>
							</div>
							<span
								className={cn(
									"text-red-500 hidden",
									isErrorAttribute && "inline-block",
								)}
							>
								Vui lòng chọn Phân loại hàng
							</span>
						</div>
						<div className="flex items-center gap-3 p-1.5 w-full">
							<Button
								className="bg-blue-500 hover:bg-blue-700 px-5"
								onClick={() => handleOrderProduct("buy-now")}
							>
								{isLoadingButton.isLoadingBynow ? (
									<ButtonLoading type="white" />
								) : (
									"Mua ngay"
								)}
							</Button>
							<Button
								className="bg-blue-100 hover:bg-blue-50 flex items-center gap-1.5 text-blue-500"
								onClick={() => handleOrderProduct("add-to-cart")}
							>
								{isLoadingButton.isLoadingShopping ? (
									<ButtonLoading type="primary" />
								) : (
									<>
										<MdOutlineAddShoppingCart size={22} /> Thêm vào giỏ hàng{" "}
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InfoProduct;
