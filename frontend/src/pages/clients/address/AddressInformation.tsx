import React, { useEffect, useRef, useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Paginations from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import PaginatedItems from "@/components/Pagination";

type Props = {
	data: any;
};

const AddressInformation = () => {
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async (id: string | number) => {
			try {
				if (window.confirm("Are you sure you want to delete")) {
					const { data } = await axios.delete(
						`http://localhost:5000/api/v1/address/deleteAddress/${id}`,
						{
							headers: {
								Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTg0NGFkYzc1ZTk1ZDc1NzZkOWI4ZiIsImVtYWlsIjoidHV5ZW4yMDA0QGdtYWlsLmNvbSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNzE3MjU0ODEwLCJleHAiOjE3MTcyNTg0MTB9.8vFxsSAEDBwVU8wKfPsHfV6aC9dgWL8QOAZJTxoDKi8`,
							},
						},
					);
					toast.success("Bạn xóa địa chỉ thành công");
					return data;
				}
			} catch (error: any) {
				toast.error(error.response!.data!.message);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["address", pageIndex],
			});
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const fetchAddress = async (page: any) => {
		const response = await axios.post(
			`http://localhost:5000/api/v1/address/paddingAddress`,
			{
				pageIndex: page,
			},
			{
				headers: {
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTg0NGFkYzc1ZTk1ZDc1NzZkOWI4ZiIsImVtYWlsIjoidHV5ZW4yMDA0QGdtYWlsLmNvbSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNzE3MjU0ODEwLCJleHAiOjE3MTcyNTg0MTB9.8vFxsSAEDBwVU8wKfPsHfV6aC9dgWL8QOAZJTxoDKi8`,
				},
			},
		);
		return response.data;
	};
	const { isPending, isError, error, data, isFetching, isPlaceholderData } =
		useQuery({
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
	const totalPage = [...Array(data.totalPage)].map((_, i) => i + 1);
	return (
		<div className="flex flex-col gap-2 max-w-4xl px-auto w-full">
			<h2 className="text-black font-semibold">Địa chỉ của bạn</h2>
			<div className="flex flex-col gap-5 w-full">
				{data.content?.map((address: any, index: number) => {
					return (
						<div
							className=" w-full border p-5 bg-slate-100 rounded-xl grid grid-cols-1 gap-10 sm:grid-cols-3"
							key={index}
						>
							<div className="flex flex-col gap-2 sm:w-20px col-span-2">
								<h2 className="text-[14px]">
									{address.city.name} , {address.district.name} ,
									{address.commune.name}
								</h2>
								<p className="text-[14px]">
									{address.username} , {address.phone}
								</p>
								<p className="text-[14px]">{address.address}</p>
							</div>
							<div className="flex justify-center items-center">
								<button onClick={() => mutate(address._id)}>
									<CiCircleMinus className="text-[30px] text-gray-400" />
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div>
				{/* <Pagination>
					<PaginationContent>
						<PaginationItem>
							<button
								onClick={() => setPageIndex((old: any) => Math.max(old - 1, 1))}
								disabled={pageIndex === 1}
							>
								<PaginationPrevious />
							</button>
						</PaginationItem>
						{totalPage.map((page: any) => {
							return (
								<PaginationItem key={page}>
									<PaginationLink onClick={() => setPageIndex(page)}>
										{page}
									</PaginationLink>
								</PaginationItem>
							);
						})}

						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>

						<PaginationItem>
							<button
								onClick={() => setPageIndex((old) => old + 1)}
								disabled={pageIndex === data.totalPage}
								// Disable the Next Page button until we know a next page is available
								// disabled={isPlaceholderData || !data?.hasMore}
							>
								<PaginationNext />
							</button>
						</PaginationItem>
					</PaginationContent>
				</Pagination> */}
				<Paginations
					pageCount={data.totalPage}
          handlePageClick={(event: any) => {
            console.log(event.selected);         
            setPageIndex(event.selected + 1)  
					}}
				/>
			</div>
		</div>
	);
};

export default AddressInformation;
