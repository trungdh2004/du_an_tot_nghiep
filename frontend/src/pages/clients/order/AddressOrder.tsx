import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import ListAddressOrderDetail from "./ListAddressOrderDetail";
import AddAddressOrder from "./AddAddressOrder";
import { FaPlus } from "react-icons/fa";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAddress } from "@/service/address";
import { Skeleton } from "@/components/ui/skeleton";
const AddressOrder = ({ data, handleChangeAddress }: any) => {
	const [openListAddress, setOpenListAddress] = useState(false);
	const [openAdd, setOpenAdd] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const {
		isPending,
		isError,
		data: address,
		isFetching,
		isPlaceholderData,
	} = useQuery({
		queryKey: ["address", pageIndex],
		queryFn: () => fetchAddress(pageIndex),
		placeholderData: keepPreviousData,
	});
	return (
		<div className="lg:py-4 py-2 ">
			{isPending && (
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-[125px] w-full rounded-xl" />
				</div>
			)}
			{isError && (
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-[125px] w-full rounded-xl" />
				</div>
			)}
			<div className="flex flex-col gap-3 bg-white py-4 lg:rounded-md md:rounded-md rounded-none border border-gray-200 box-shadow">
				<div className="flex gap-3 pl-3">
					<FiMapPin size={25} className="text-[#f78138]" />
					<p className="lg:text-lg md:text-base text-sm text-[#f78138]">
						Địa chỉ nhận hàng
					</p>
				</div>
				<div className="flex lg:flex-row md:flex-row flex-col pl-4 justify-between lg:items-center md:items-center items-start gap-3">
					{data?.address === null ? (
						<div className="flex gap-3">
							<p>Bạn chưa chọn địa chỉ nào</p>
							<button
								className="border border-[#ff6200] text-sm px-2 mr-7 text-[#ff6200] flex items-center gap-2"
								onClick={() => setOpenAdd(true)}
							>
								<FaPlus />
								Thêm địa chỉ
							</button>
						</div>
					) : (
						<div className="flex lg:flex-row md:flex-row flex-col gap-3">
							<span className="lg:text-base text-sm font-bold tracking-normal">
								{data?.address?.username} {data?.address?.phone}
							</span>
							<p className="lg:text-base text-sm font-medium tracking-normal">
								{data?.address?.detailAddress} , {data?.address?.address}
							</p>
							{data?.address?.is_main && (
								<div className="border border-[#ff6200] flex items-center justify-center lg:w-[70px] md:w-[70px] w-[50px]">
									<span className="text-[#ff6200] lg:text-xs text-[9px] p-1 py-0 font-medium">
										Mặc định
									</span>
								</div>
							)}
						</div>
					)}
					{address?.content?.length != 0 && (
						<button
							className="lg:text-sm text-xs text-blue-400 font-medium mr-4"
							onClick={() => setOpenListAddress(true)}
						>
							Thay đổi
						</button>
					)}
				</div>
			</div>
			{!!openListAddress && (
				<ListAddressOrderDetail
					open={openListAddress}
					closeOpen={() => setOpenListAddress(false)}
					dataAddress={data?.address}
					handleChangeAddress={handleChangeAddress}
					address={address}
					pageIndex={pageIndex}
					setPageIndex={setPageIndex}
				/>
			)}
			{!!openAdd && (
				<AddAddressOrder open={openAdd} closeOpen={() => setOpenAdd(false)} />
			)}
		</div>
	);
};

export default AddressOrder;
