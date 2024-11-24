import { formatQuantity } from "@/common/localFunction";
import Paginations from "@/components/common/Pagination";
import instance from "@/config/instance";
import { cn } from "@/lib/utils";
import { fetchPayments } from "@/types/payment";
import { ISearchObjectPayment } from "@/types/searchObjecTypes";
import { typeResponse } from "@/types/typeReponse";
import { Value } from "@radix-ui/react-select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type IPayment = {
	_id: string;
	bankCode?: string;
	codeOrder: string;
	amount: number;
	createdAt: string;
};

const PaymentIndex = () => {
	const [searchObject, setSearchObject] = useState<ISearchObjectPayment>({
		pageIndex: 1,
		pageSize: 6,
	});
	const { data } = useQuery({
		queryKey: ["payment", searchObject],
		queryFn: async () => {
			try {
				const { data } = await fetchPayments(searchObject);
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 60,
	});

	const handleChangePag = (value: any) => {
		console.log("value", value);
		try {
			setSearchObject((prev) => ({
				...prev,
				pageIndex: value.selected + 1,
			}));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{/* // min-[600px]:col-span-6 min-[900px]:col-span-4 h-[360px] */}
			<div className="px-4 md:px-10">
				<div className="text-base md:text-lg text-[#333333] font-medium">
					Các giao dịch online của bạn
				</div>
				<div className="grid grid-cols-12 gap-6 mt-5 ">
					{data?.content?.length <= 0 ? (
						<div className="justify-center h-full col-span-12">
						  <img
  							src="/no-data-search.png"
  							alt=""
  							className="mx-auto lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[200px] h-[200px] object-cover"
  						/>
              <p className="text-center">Bạn chưa có giao dịch nào.</p>
						</div>
					) : (
						data?.content?.map((item: IPayment, index: number) => {
							return (
								<div
									key={index}
									className="border border-blue-200 bg-white rounded-[8px] px-4 py-2 col-span-12  min-[900px]:col-span-6 "
								>
									<p className="pb-2 text-sm font-semibold">
										Mã đơn hàng: <span className="">{item?.codeOrder}</span>
									</p>
									<p className="">
										Có giao dịch thanh toán online với số tiền
										<span className="pl-1 font-semibold text-red-500">
											{formatQuantity(item?.amount, "₫")}
										</span>
										, vui lòng kiểm tra thông tin.
									</p>
									<p className="pt-2 text-sm text-right text-gray-500">
										{format(item?.createdAt || "", "hh:mm dd/MM/yyyy")}
									</p>
								</div>
							);
						})
					)}
				</div>
				<div
					className={cn(
						" py-6 w-full  justify-center",
						data?.content?.length ? "flex" : "hidden",
					)}
				>
					<Paginations
						forcePage={searchObject.pageIndex - 1}
						pageCount={data?.totalPage}
						handlePageClick={handleChangePag}
					/>
				</div>
			</div>
		</>
	);
};

export default PaymentIndex;
