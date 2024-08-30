import { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { pagingCart } from "@/service/cart";
import { formatCurrency } from "@/common/func";
import InputQuantity from "@/components/common/InputQuantity";
import { Button } from "@/components/ui/button";
import { ICart, ICartItem } from "@/types/cart"; // Đảm bảo rằng bạn có các kiểu dữ liệu này trong types/cart.ts
import { Skeleton } from "@/components/ui/skeleton";
import { optimizeCloudinaryUrl } from "@/common/localFunction";
import Attribute from "./Attribute";
import { HiOutlineTrash } from "react-icons/hi";

type CheckedState = Record<string, boolean>;

const CartPage = () => {
	const {
		data: dataCart,
		isLoading,
		isError,
	} = useQuery<ICart[]>({
		queryKey: ["MYSHOPPINGCART"],
		queryFn: async () => {
			const { data } = await pagingCart();
			return data?.data?.content;
		},
	});

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
		const isAllChecked = dataCart?.every((cart) =>
			cart.items.every((item) => checkedState[item._id as string]),
		);
		const totals = dataCart?.reduce(
			(acc, cart) => {
				const groupTotals = cart.items.reduce(
					(groupAcc, item) => {
						if (checkedState[item._id as string]) {
							groupAcc.totalQuantity += 1;
							groupAcc.totalAmount +=
								(item?.discount || 0) * (item?.quantity || 0);
						}
						return groupAcc;
					},
					{ totalQuantity: 0, totalAmount: 0 },
				);
				acc.totalQuantity += groupTotals.totalQuantity;
				acc.totalAmount += groupTotals.totalAmount;
				return acc;
			},
			{ totalQuantity: 0, totalAmount: 0 },
		);

		setTotalSelectedAmount(totals || { totalQuantity: 0, totalAmount: 0 });
		setAllChecked(isAllChecked || false);
	}, [checkedState, dataCart]);
	const totalAttribute = useMemo(() => {
		if (!dataCart) return 0;

		return dataCart.reduce((totalItems, cart) => {
			const groupItemsCount = cart.items.length;
			return totalItems + groupItemsCount;
		}, 0);
	}, [dataCart]);
	const handleCheckAll = () => {
		const isChecked = !allChecked;
		setAllChecked(isChecked);

		const updatedCheckedState: CheckedState = {};
		const updatedGroupCheckedState: CheckedState = {};

		dataCart?.forEach((cart) => {
			updatedGroupCheckedState[cart.product._id as string] = isChecked;
			cart.items.forEach((item) => {
				updatedCheckedState[item._id as string] = isChecked;
			});
		});

		setCheckedState(updatedCheckedState);
		setGroupCheckedState(updatedGroupCheckedState);
	};

	const handleCheckboxGroup = (productId: string) => {
		const isChecked = !groupCheckedState[productId];
		const updatedCheckedState = { ...checkedState };

		dataCart
			?.find((cart) => cart.product._id === productId)
			?.items.forEach((item) => {
				updatedCheckedState[item._id as string] = isChecked;
			});

		setCheckedState(updatedCheckedState);
		setGroupCheckedState((prevState) => ({
			...prevState,
			[productId]: isChecked,
		}));
	};

	const handleCheckboxItem = (productId: string, itemId: string) => {
		const updatedCheckedState = {
			...checkedState,
			[itemId]: !checkedState[itemId],
		};

		setCheckedState(updatedCheckedState);

		const allItemsChecked = dataCart
			?.find((cart) => cart.product._id === productId)
			?.items.every((item) => updatedCheckedState[item._id as string]);

		setGroupCheckedState((prevState) => ({
			...prevState,
			[productId]: allItemsChecked || false,
		}));
	};
	const getAllSelectedItems = () => {
		const selectedItems = dataCart?.flatMap((cart) =>
			cart.items
				.filter((item) => checkedState[item._id as string])
				.map((item) => item._id),
		);
		return selectedItems;
	};
	const handleSubmitted = () => {
		console.log("Các đơn hàng mua:", getAllSelectedItems());
	};
	if (isError) {
		return <h2>Error...</h2>;
	}

	return (
		<div className="px-0 sm:px-[30px] md:px-[40px] xl:px-[50px] 2xl:px-[60px] w-full bg-gray-100 py-5">
			<div>
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
						<div className="flex items-center justify-end cursor-pointer md:hidden">
							<HiOutlineTrash size={20} />
						</div>
					</div>
				</div>
				{isLoading ? (
					<div className="space-y-3">
						<Skeleton className="w-full h-44" />
						<Skeleton className="w-full h-44" />
						<Skeleton className="w-full h-44" />
					</div>
				) : (
					<>
						{dataCart?.map((cart) => (
							<div key={cart.product._id} className="bg-white mb-3">
								<div className="flex items-center border-b border-black border-opacity-[0.09] h-15 px-2.5 md:px-5 py-3">
									<div className="group flex md:flex-row-reverse min-w-9 md:min-w-[58px] md:pl-5 md:pr-3">
										<Checkbox
											checked={groupCheckedState[cart.product._id as string]}
											onCheckedChange={() =>
												handleCheckboxGroup(cart.product._id as string)
											}
											className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
										/>
									</div>
									<div>{cart?.product?.name}</div>
								</div>
								{cart?.items?.map((item) => (
									<div
										key={item._id}
										className="item-group flex items-center mt-3 md:mt-5 px-2.5 md:p-5 pb-4"
									>
										<div className="flex md:flex-row-reverse min-w-9 md:min-w-[58px] md:pl-5 md:pr-3">
											<Checkbox
												checked={checkedState?.[item?._id as string]}
												onCheckedChange={() =>
													handleCheckboxItem(
														cart?.product?._id as string,
														item._id as string,
													)
												}
												className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
											/>
										</div>
										<div className="flex items-center w-full lg:w-[46.27949%]">
											<div className="min-w-16 min-h-16 max-w-16 max-h-16 md:min-w-20 md:min-h-20 md:max-w-20 md:max-h-20">
												<img
													src={optimizeCloudinaryUrl(
														cart?.product?.thumbnail,
														80,
														80,
													)}
													alt={cart?.product?.name}
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="px-2.5 py-1.5 max-sm:w-[78%] md:w-5/6">
												<p className="max-sm:truncate">{cart?.product?.name}</p>
												<Attribute />
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
															maxTotal={cart?.product?.quantity}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="hidden lg:flex w-[15.88022%] text-center text-sm items-center justify-center gap-2">
											<span className="line-through text-black/50">
												{formatCurrency(item?.price)}
											</span>
											<span className="text-red-500">
												{formatCurrency(item?.discount)}
											</span>
										</div>
										<div className="hidden lg:flex w-[15.4265%] text-center items-center justify-center">
											<InputQuantity
												size="small"
												defaultValue={item?.quantity}
												maxTotal={cart?.product?.quantity}
											/>
										</div>
										<div className="hidden lg:block w-[10.43557%] text-center">
											<span className="text-red-500">
												{formatCurrency(item?.price * Number(item?.quantity))}
											</span>
										</div>
										<div className="hidden lg:block w-[12.70417%] text-center">
											Xoá
										</div>
									</div>
								))}
							</div>
						))}
					</>
				)}
			</div>
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
								checked={allChecked}
								onCheckedChange={handleCheckAll}
								className="data-[state=checked]:bg-red-500 border-gray-300 data-[state=checked]:border-red-500"
							/>
							<span className="whitespace-nowrap text-base md:hidden">
								Tất cả
							</span>
							<span className="whitespace-nowrap text-base hidden md:inline-block">
								Chọn tất cả ({totalAttribute})
							</span>
						</div>
						<div className="hidden md:block">Xoá</div>
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
								({totalSelectedAmount.totalQuantity})
							</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
