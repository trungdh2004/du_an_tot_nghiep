import { formatCurrency } from "@/common/func";
import DialogConfirm from "@/components/common/DialogConfirm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteCartItem } from "@/service/cart";
import useCart from "@/store/cart.store";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CartGroup from "./CartGroup";
type CheckedState = Record<string, boolean>;
const CartPage = () => {
	const { carts, totalCart, itemCart, setItemCart, setTotalCart } = useCart();
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

	useEffect(() => {
		const isAllChecked = carts?.every((cart) =>
			cart.items.every((item) => checkedState[item?._id as string]),
		);
		const totals = carts?.reduce(
			(acc, cart) => {
				const groupTotals = cart?.items?.reduce(
					(groupAcc, item) => {
						if (checkedState[item?._id as string]) {
							groupAcc.totalQuantity += 1;
							groupAcc.totalAmount +=
								(item?.discount || 0) * (item?.quantity || 0);
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
	}, [checkedState, carts]);

	const totalAttribute = useMemo(() => {
		if (!carts) return 0;

		return carts.reduce((totalItems, cart) => {
			const groupItemsCount = cart?.items?.length;
			return totalItems + groupItemsCount;
		}, 0);
	}, [carts]);

	const handleCheckAll = () => {
		const isChecked = !allChecked;
		setAllChecked(isChecked);

		const updatedCheckedState: CheckedState = {};
		const updatedGroupCheckedState: CheckedState = {};

		carts?.forEach((cart) => {
			updatedGroupCheckedState[cart?.product?._id as string] = isChecked;
			cart.items.forEach((item) => {
				updatedCheckedState[item?._id as string] = isChecked;
			});
		});

		setCheckedState(updatedCheckedState);
		setGroupCheckedState(updatedGroupCheckedState);
	};

	const handleCheckboxGroup = (productId: string) => {
		const isChecked = !groupCheckedState[productId];
		const updatedCheckedState = { ...checkedState };
		const updatedGroupCheckedState = {
			...groupCheckedState,
			[productId]: isChecked,
		};

		carts?.forEach((cart) => {
			if (cart.product._id === productId) {
				cart.items.forEach((item) => {
					updatedCheckedState[item?._id as string] = isChecked;
				});
			}
		});

		setCheckedState(updatedCheckedState);
		setGroupCheckedState(updatedGroupCheckedState);
	};

	const handleCheckboxItem = (productId: string, itemId: string) => {
		const updatedCheckedState = {
			...checkedState,
			[itemId]: !checkedState[itemId],
		};

		const isGroupChecked = carts
			?.find((cart) => cart.product._id === productId)
			?.items.every((item) => updatedCheckedState[item._id as string]);

		const updatedGroupCheckedState = {
			...groupCheckedState,
			[productId]: !!isGroupChecked,
		};

		setCheckedState(updatedCheckedState);
		setGroupCheckedState(updatedGroupCheckedState);
	};
	const getAllSelectedItems = useCallback(() => {
		const selectedItems = carts?.flatMap((cart) =>
			cart.items
				.filter((item) => checkedState[item?._id as string])
				.map((item) => item?._id),
		);
		return selectedItems;
	}, []);
	const handleDelete = async (id: string | string[]) => {
		try {
			await deleteCartItem(id);
			const quantityDecreased = Array.isArray(id)
				? carts?.reduce((total, obj) => {
						const sumItems = obj?.items?.reduce((sum, item) => {
							if (id?.includes(item?._id as string)) {
								sum += Number(item?.quantity);
							}
							return sum;
						}, 0);
						return (total += Number(sumItems));
					}, 0)
				: (itemCart as any)?.quantity;

			const newTotal = totalCart - quantityDecreased;

			setTotalCart(newTotal);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		} finally {
			setItemCart(null);
		}
	};
	const handleSubmitted = () => {
		console.log("Các đơn hàng mua:", getAllSelectedItems());
	};

	return (
		<>
			<DialogConfirm
				open={Boolean(itemCart)}
				title="Xác nhận xoá sản phẩm!"
				content="Bạn chắc chắn muốn xoá bỏ sản phẩm đã chọn ra khỏi giỏ hàng chứ?"
				handleSubmit={() => handleDelete(itemCart?._id as string)}
				handleClose={() => {
					setItemCart(null);
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
							className="px-10 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
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
									className="flex items-center justify-end cursor-pointer md:hidden p-1"
									onClick={() => {
										const listId = getAllSelectedItems() as string[];
										if (listId?.length > 0) {
											handleDelete(listId as string[]);
										} else {
											toast.error(
												"Bạn chưa chọn sản phẩm nào trong giỏ hàng để xoá!",
											);
										}
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
								<div className="flex items-center justify-end border-b border-gray-300 border-dotted py-3 px-1.5 md:px-6">
									<div className="flex items-end gap-5">
										<p>Nguyen Huy Toi Voucher</p>
										<div className="text-blue-500">Chọn hoặc nhập mã</div>
									</div>
								</div>
								<div className="flex items-center justify-between  mt-5 w-full px-2 md:px-6">
									<div className="flex items-center  gap-10 px-2  md:px-6">
										<div className="flex items-center gap-5 text-sm">
											<Checkbox
												id="checkedAllFotter"
												checked={allChecked}
												onCheckedChange={handleCheckAll}
												className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
											/>
											<label
												htmlFor="checkedAllFotter"
												className="whitespace-nowrap text-base md:hidden"
											>
												Tất cả
											</label>
											<label
												htmlFor="checkedAllFotter"
												className="whitespace-nowrap text-base hidden md:inline-block"
											>
												Chọn tất cả ({totalAttribute})
											</label>
										</div>
										<div
											className="hidden md:block cursor-pointer"
											onClick={() => {
												const listId = getAllSelectedItems() as string[];
												if (listId?.length > 0) {
													handleDelete(listId as string[]);
												} else {
													toast.error(
														"Bạn chưa chọn sản phẩm nào trong giỏ hàng để xoá!",
													);
												}
											}}
										>
											Xoá
										</div>
									</div>
									<div className="flex justify-end items-end md:items-center md:gap-5 flex-col gap-3 md:flex-row ">
										<div className="flex items-center justify-end">
											<p className=" text-xs md:text-lg text-start md:text-end ">
												Tổng thanh toán{" "}
												<span className="hidden md:inline-block">
													({totalSelectedAmount.totalQuantity} sản phẩm)
												</span>
												:{" "}
												<span className="text-red-500 md:text-lg font-medium">
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
