import { formatCurrency } from "@/common/func";
import DialogConfirm from "@/components/common/DialogConfirm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { deleteCartItem } from "@/service/cart";
import useCart from "@/store/cart.store";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CartGroup from "./CartGroup";
import { takeApplyDiscountCode } from "@/service/voucher";
import { IVoucher } from "@/types/voucher";
import { VoucherIcon } from "@/assets/svg";
import { createStateUrlCart } from "@/service/order";

type CheckedState = Record<string, boolean>;

const CartPage = () => {
	const navigate = useNavigate();
	const [isModalConfirm, setIsModalConfirm] = useState(false);
	const { carts, totalCart, itemCart, setItemCart, setTotalCart, setCarts } =
		useCart();
	const [checkedState, setCheckedState] = useState<CheckedState>({});
	const [allChecked, setAllChecked] = useState<boolean>(false);
	const [groupCheckedState, setGroupCheckedState] = useState<CheckedState>({});
	const [totalSelectedAmount, setTotalSelectedAmount] = useState<{
		totalQuantity: number;
		totalAmount: number;
	}>({
		totalQuantity: 0,
		totalAmount: 0,
	});
	const [discountCode, setDiscountCode] = useState<{
		applyCode: string;
		currentVoucherCode: IVoucher | null;
		error: string;
	}>({
		applyCode: "",
		currentVoucherCode: null,
		error: "",
	});
	const isItemValid = useCallback((item: any) => {
		return item?.attribute?._id && item?.attribute?.quantity > 0;
	}, []);
	useEffect(() => {
		if (itemCart) {
			setIsModalConfirm(true);
		}
	}, [itemCart]);
	useEffect(() => {
		const isAllChecked = carts?.every((cart) =>
			cart.items.every(
				(item) => !isItemValid(item) || checkedState[item?._id as string],
			),
		);
		const totals = carts?.reduce(
			(acc, cart) => {
				const groupTotals = cart?.items?.reduce(
					(groupAcc, item) => {
						if (isItemValid(item) && checkedState[item?._id as string]) {
							groupAcc.totalQuantity += 1;
							groupAcc.totalAmount +=
								(item?.attribute?.discount || 0) * (item?.quantity || 0);
						}
						return groupAcc;
					},
					{ totalQuantity: 0, totalAmount: 0 },
				);
				acc.totalQuantity += groupTotals?.totalQuantity;
				acc.totalAmount += groupTotals?.totalAmount;
				return acc;
			},
			{ totalQuantity: 0, totalAmount: 0 },
		);

		setTotalSelectedAmount(totals || { totalQuantity: 0, totalAmount: 0 });
		setAllChecked(isAllChecked || false);
	}, [checkedState, carts, isItemValid]);

	const totalAttribute = useMemo(() => {
		if (!carts) return 0;
		return carts.reduce((totalItems, cart) => {
			const groupItemsCount = cart?.items?.filter(isItemValid).length;
			return totalItems + groupItemsCount;
		}, 0);
	}, [carts, isItemValid]);

	const handleCheckAll = () => {
		const isChecked = !allChecked;
		const updatedCheckedState: CheckedState = {};
		const updatedGroupCheckedState: CheckedState = {};

		carts?.forEach((cart) => {
			const validItems = cart.items.filter(isItemValid);
			updatedGroupCheckedState[cart?.product?._id as string] =
				isChecked && validItems.length > 0;
			validItems.forEach((item) => {
				updatedCheckedState[item?._id as string] = isChecked;
			});
		});

		setCheckedState(updatedCheckedState);
		setGroupCheckedState(updatedGroupCheckedState);
		setAllChecked(isChecked);
	};

	const handleCheckboxGroup = (productId: string) => {
		const isChecked = !groupCheckedState[productId];
		const updatedCheckedState = { ...checkedState };
		const updatedGroupCheckedState = { ...groupCheckedState };

		const cart = carts?.find((c) => c.product._id === productId);
		if (cart) {
			const validItems = cart.items.filter(isItemValid);
			updatedGroupCheckedState[productId] = isChecked && validItems.length > 0;
			validItems.forEach((item) => {
				updatedCheckedState[item?._id as string] = isChecked;
			});
		}

		setCheckedState(updatedCheckedState);
		setGroupCheckedState(updatedGroupCheckedState);
	};

	const handleCheckboxItem = (productId: string, itemId: string) => {
		const updatedCheckedState = { ...checkedState };
		const updatedGroupCheckedState = { ...groupCheckedState };
		const cart = carts?.find((c) => c.product._id === productId);
		const item = cart?.items.find((i) => i._id === itemId);

		if (item && isItemValid(item)) {
			updatedCheckedState[itemId] = !checkedState[itemId];

			const validItemsInGroup = (cart as any).items.filter(isItemValid);

			if (validItemsInGroup.length === 1) {
				updatedGroupCheckedState[productId] = updatedCheckedState[itemId];
			} else {
				const isGroupChecked = validItemsInGroup.every(
					(item: any) => updatedCheckedState[item._id as string],
				);
				updatedGroupCheckedState[productId] = isGroupChecked;
			}

			setCheckedState(updatedCheckedState);
			setGroupCheckedState(updatedGroupCheckedState);
		}
	};

	const getAllSelectedItems = useCallback(() => {
		return carts?.flatMap((cart) =>
			cart.items
				.filter(
					(item) => isItemValid(item) && checkedState[item?._id as string],
				)
				.map((item) => item?._id),
		);
	}, [carts, checkedState, isItemValid]);

	const handleDelete = async (id: string | string[]) => {
		try {
			await deleteCartItem(id);
			const quantityDecreased = Array.isArray(id)
				? carts.reduce(
						(total, cart) =>
							total +
							cart.items.reduce(
								(sum, item) =>
									id.includes(item._id as string)
										? sum + Number(item.quantity)
										: sum,
								0,
							),
						0,
					)
				: itemCart?.quantity || 0;
			const newTotal = totalCart - quantityDecreased;
			const newCarts = carts.map((cart) => ({
				...cart,
				items: cart.items.filter((item) =>
					!Array.isArray(id)
						? item._id !== id
						: !id.includes(item._id as string),
				),
			}));
			setCarts(newCarts);
			setTotalCart(newTotal);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		} finally {
			setItemCart(null);
			setIsModalConfirm(false);
		}
	};
	const handleApplyDiscount = async () => {
		try {
			const { data } = await takeApplyDiscountCode({
				code: discountCode?.applyCode,
				totalMoney: totalSelectedAmount.totalAmount,
			});
			setDiscountCode((prev) => ({ ...prev, currentVoucherCode: data?.data }));
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
				setDiscountCode((prev) => ({
					...prev,
					currentVoucherCode: null,
					error: error?.response?.data?.message,
				}));
			}
		}
	};
	const handleSubmitted = async () => {
		try {
			const listId = getAllSelectedItems() as string[];
			const payload = {
				listId,
				voucher: discountCode?.currentVoucherCode?._id || null,
			};
			if (listId.length <= 0) {
				return toast.error("Bạn chưa chọn sản phẩm nào để đặt hàng!");
			}
			if (
				discountCode?.currentVoucherCode &&
				discountCode?.currentVoucherCode?.minimumOrderValue >
					totalSelectedAmount?.totalAmount
			) {
				payload.voucher = null;
			}

			const { data } = await createStateUrlCart(payload);
			navigate(`/order?state=${data?.url}`);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		}
	};
	return (
		<>
			<DialogConfirm
				open={Boolean(isModalConfirm)}
				title="Xác nhận xoá sản phẩm!"
				content="Bạn chắc chắn muốn xoá bỏ sản phẩm đã chọn ra khỏi giỏ hàng chứ?"
				handleSubmit={() => {
					if (itemCart?._id) {
						return handleDelete(itemCart?._id as string);
					} else {
						const listId = getAllSelectedItems() as string[];
						handleDelete(listId);
					}
				}}
				handleClose={() => {
					setItemCart(null);
					setIsModalConfirm(false);
				}}
			/>
			<section className="px-0 sm:px-[30px] md:px-[40px] xl:px-[50px] 2xl:px-[60px] w-full bg-gray-100 py-5">
				{carts?.length <= 0 ? (
					<div className="flex flex-col items-center justify-center gap-3 h-[21rem]">
						<div className="w-28">
							<img src="/cart-is-empty.png" alt="" className="w-full h-auto" />
						</div>
						<p className="text-base font-semibold text-gray-500">
							Giỏ hàng của bạn còn trống
						</p>
						<Link
							to={"/shop"}
							className="px-10 py-2 text-white bg-red-500 rounded hover:bg-red-600"
						>
							Mua ngay
						</Link>
					</div>
				) : (
					<>
						<div className="header flex items-center bg-white rounded shadow-sm text-gray-400 text-sm h-14 mb-3 overflow-hidden px-2.5 md:px-5">
							<div className="flex md:flex-row-reverse min-w-9 md:min-w-[58px] md:pl-5 pr-3">
								<Checkbox
									checked={allChecked}
									onCheckedChange={handleCheckAll}
									className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
								/>
							</div>
							<div className="w-full md:w-[46.27949%]">Sản phẩm</div>
							<div className="w-[15.88022%] text-center hidden lg:block">
								Đơn giá
							</div>
							<div className="w-[15.4265%] text-center hidden lg:block">
								Số lượng
							</div>
							<div className="w-[10.43557%] text-center hidden lg:block">
								Số tiền
							</div>
							<div className="w-[12.70417%] text-end md:text-center block">
								<span className="hidden md:inline-block">Thao tác</span>
								<div
									className="flex items-center justify-end p-1 cursor-pointer md:hidden"
									onClick={() => {
										const listId = getAllSelectedItems() as string[];
										listId?.length <= 0
											? toast.error(
													"Bạn chưa chọn sản phẩm nào trong giỏ hàng để xoá!",
												)
											: setIsModalConfirm(true);
									}}
								>
									<HiOutlineTrash size={20} />
								</div>
							</div>
						</div>
						<>
							{carts?.map((cart) => (
								<CartGroup
									key={cart.product._id}
									cart={cart}
									groupChecked={groupCheckedState[cart.product._id as string]}
									onGroupCheckedChange={handleCheckboxGroup}
									onItemCheckedChange={handleCheckboxItem}
									checkedState={checkedState}
								/>
							))}
							<div className="sticky bottom-0 bg-white shadow-[0px_-3px_5px_#0000000f] py-5 w-full">
								<div className="border-b border-gray-300 border-dotted py-3 px-1.5 md:px-6 w-full">
									<div className="block pl-10 mb-2 text-sm text-red-500 text-end md:hidden">
										{discountCode?.error}
									</div>
									<div className="w-full pl-2 md:pl-6">
										<div className="flex items-center justify-between gap-5">
											<div className="flex items-center gap-1">
												<VoucherIcon height={24} width={24} />
												<span className="text-xs md:text-sm">Mã giảm giá</span>
											</div>
											<div className="flex items-center gap-5">
												<div className="hidden text-sm text-red-500 text-end md:inline-block">
													{discountCode?.error}
												</div>
												<div
													className={cn(
														"hidden bg-red-500 text-white px-2.5 py-1 rounded-xl items-center gap-2",
														discountCode?.currentVoucherCode && "flex",
													)}
												>
													Giảm{" "}
													{discountCode?.currentVoucherCode?.discountType == 1
														? formatCurrency(
																discountCode?.currentVoucherCode?.discountValue,
															)
														: `${discountCode?.currentVoucherCode?.discountValue}%`}
													<button
														onClick={() =>
															setDiscountCode({
																applyCode: "",
																currentVoucherCode: null,
																error: "",
															})
														}
														className="flex items-center justify-center rounded-full size-5 bg-black/20"
													>
														<IoClose className="text-white" />
													</button>
												</div>
												<div className="flex items-center gap-2">
													<div className="relative">
														<input
															onChange={(e) =>
																setDiscountCode({
																	applyCode: (e.target as HTMLInputElement)
																		.value,
																	currentVoucherCode: null,
																	error: "",
																})
															}
															value={discountCode?.applyCode}
															type="text"
															className="max-sm:w-36 outline-none border border-gray-200 bg-gray-100 h-8 md:h-10 p-1.5 "
														/>
														<button
															onClick={() =>
																setDiscountCode((prev) => ({
																	...prev,
																	applyCode: "",
																	error: "",
																}))
															}
															className="absolute top-1/2 -translate-y-1/2 right-1.5 size-5 bg-black/30 rounded-full flex items-center justify-center"
														>
															<IoClose className="text-white" />
														</button>
													</div>
													<Button
														onClick={handleApplyDiscount}
														disabled={
															discountCode?.applyCode?.length < 9 ||
															getAllSelectedItems()?.length <= 0
														}
														className={cn(
															"max-sm:h-8 bg-red-500 hover:bg-red-600 text-white px-5",
															(discountCode?.applyCode?.length < 9 ||
																getAllSelectedItems()?.length <= 0) &&
																"pointer-events-none bg-black/35",
														)}
													>
														Áp dụng
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-between w-full px-2 mt-5 md:px-6">
									<div className="flex items-center gap-10 px-2 md:px-6">
										<div className="flex items-center gap-5 text-sm">
											<Checkbox
												id="checkedAllFotter"
												checked={allChecked}
												onCheckedChange={handleCheckAll}
												className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
											/>
											<label
												htmlFor="checkedAllFotter"
												className="text-base whitespace-nowrap md:hidden"
											>
												Tất cả
											</label>
											<label
												htmlFor="checkedAllFotter"
												className="hidden text-base whitespace-nowrap md:inline-block"
											>
												Chọn tất cả ({totalAttribute})
											</label>
										</div>
										<div
											className="hidden cursor-pointer md:block"
											onClick={() => {
												const listId = getAllSelectedItems() as string[];
												listId?.length <= 0
													? toast.error(
															"Bạn chưa chọn sản phẩm nào trong giỏ hàng để xoá!",
														)
													: setIsModalConfirm(true);
											}}
										>
											Xoá
										</div>
									</div>
									<div className="flex flex-col items-end justify-end gap-3 md:items-center md:gap-5 md:flex-row ">
										<div className="flex items-center justify-end">
											<p className="text-xs md:text-lg text-start md:text-end">
												Tổng thanh toán{" "}
												<span className="hidden md:inline-block">
													({totalSelectedAmount.totalQuantity} sản phẩm)
												</span>
												:{" "}
												<span className="font-medium text-red-500 md:text-lg">
													{formatCurrency(totalSelectedAmount.totalAmount)}
												</span>
											</p>
										</div>
										<Button
											onClick={handleSubmitted}
											className="text-xs sm:text-sm md:text-base md:h-12  w-32 md:w-[320px] bg-red-500 hover:bg-red-600"
										>
											Mua hàng{" "}
											<span className="inline-block md:hidden">
												({totalSelectedAmount?.totalQuantity})
											</span>
										</Button>
									</div>
								</div>
							</div>
						</>
					</>
				)}
			</section>
		</>
	);
};

export default CartPage;
