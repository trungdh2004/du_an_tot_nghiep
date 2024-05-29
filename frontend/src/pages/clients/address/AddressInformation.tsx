import React from 'react'
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
type Props = {
  data: any
}

const AddressInformation = ({ data }: Props) => {
  console.log(data);
  return (
		<div className="flex flex-col gap-2 max-w-4xl px-auto w-full">
			<h2 className="text-black font-semibold">Địa chỉ của bạn</h2>
			<div className="flex flex-col gap-5 w-full">
				{data?.map((address: any) => {
					return (
						<div
							className=" w-full border p-5 bg-slate-100 rounded-xl grid grid-cols-1 gap-10 sm:grid-cols-3"
							key={address.city.idProvince}
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
								<CiCircleMinus className="text-[30px] text-gray-400" />
							</div>
						</div>
					);
				})}
			</div>
			<div>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}

export default AddressInformation