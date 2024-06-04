import React, { useEffect, useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Paginations from "@/components/common/Pagination";
import EditAddress from "./EditAddress";
import { AiFillEdit } from "react-icons/ai";
import { deleteAddress, editAddressMain, fetchAddress } from "@/service/address";
import { BsCheck2Circle } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
const AddressInformation = () => {
	const [openEditById, setOpenEditById] = useState<string | null>(null);
	const [pageIndex, setPageIndex] = useState(1);
	const queryClient = useQueryClient();

	const handleClose = () => {
		setOpenEditById(null);
	};
	const handleEdit = (id: string) => {
		setOpenEditById(id);
	};
	const { mutate } = useMutation({
		mutationFn: async (id: string | number) => {		
				const { data } = await deleteAddress(id);
				
				return data;
		},
    onSuccess: () => {
      toast.success("Bạn xóa địa chỉ thành công");
			queryClient.invalidateQueries({
				queryKey: ["address", pageIndex],
			});
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const mutate1: any = useMutation({
		mutationFn: async (id: string | number) => {
			const { data } = await editAddressMain(id);
			return data;
		},
    onSuccess: () => {
      
      toast.success("Bạn cập nhật địa chỉ mặc định thành công");
			queryClient.invalidateQueries({
				queryKey: ["address", pageIndex],
			});
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { isPending, isError, data, isFetching, isPlaceholderData } = useQuery({
		queryKey: ["address", pageIndex],
		queryFn: () => fetchAddress(pageIndex),
		placeholderData: keepPreviousData,
	});
	if (isPending)
		return (
			<div className="flex flex-col space-y-3">
				<Skeleton className="h-[125px] w-full rounded-xl" />
			</div>
		);
	if (isError)
		return (
			<div className="flex flex-col space-y-3">
				<Skeleton className="h-[125px] w-full rounded-xl" />
			</div>
		);
	return (
		<div className="flex flex-col gap-2 max-w-4xl px-auto w-full">
			<h2 className="text-black font-semibold">Địa chỉ của bạn</h2>

			<div className="flex flex-col gap-5 w-full">
				{data.content.length === 0 ? (
					<div>Không có địa chỉ nào </div>
				) : (
					data.content?.map((address: any, index: number) => {
						return (
							<div
								className={`w-full p-5 bg-slate-100 rounded-xl grid grid-cols-1 gap-10 sm:grid-cols-3 ${address.is_main === true ? `border-2 border-blue-500` : ` `}`}
								key={index}
							>
								<div className="flex flex-col gap-2 sm:w-20px col-span-2">
									<h2 className="text-[14px]">{address.location}</h2>
									<p className="text-[14px]">
										{address.username} , {address.phone}
									</p>
									<p className="text-[14px]">{address.address}</p>
								</div>
								<div className="flex justify-center items-center gap-2">
									<button onClick={() => mutate(address._id)}>
										<TiDeleteOutline className="text-[30px] text-gray-400 hover:text-black" />
									</button>

									<button onClick={() => handleEdit(address._id)}>
										<AiFillEdit className="border-2 border-gray-400 p-[3px] rounded-full text-[22px] text-gray-400 " />
									</button>
                  <button onClick={() => mutate1.mutate(address._id)}>
                    {address.is_main === true? (
                      <BsCheck2Circle className="text-[25px] text-gray-400 hover:text-black" />
                    ) : (
                      <BsCircle className="text-[25px] text-gray-400 hover:text-black" />
                    )}
									</button>
								</div>
							</div>
						);
					})
				)}
			</div>
			<div className="flex justify-center">
				<Paginations
					pageCount={data.totalPage}
					handlePageClick={(event: any) => {
						console.log(event.selected);
						setPageIndex(event.selected + 1);
					}}
				/>
			</div>
			{!!openEditById && (
				<EditAddress
					open={!!openEditById}
					handleClose={handleClose}
					id={openEditById}
				/>
			)}
		</div>
	);
};

export default AddressInformation;
