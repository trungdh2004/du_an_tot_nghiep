import Coupon from "@/components/common/Coupon/Coupon";
import Paginations from "@/components/common/Pagination";
import { getPaginatedVouchersClient } from "@/service/voucher";
import { SearchObjectType } from "@/types/searchObjecTypes";
import { typeResponse } from "@/types/typeReponse";
import { IVoucher } from "@/types/voucher";
import { useEffect, useState } from "react";

const VoucherIndex = () => {
	const [vouchers, setVouchers] = useState<IVoucher[]>([]);

	const [searchObject, setSearchObject] = useState<SearchObjectType>({
		pageIndex: 1,
		pageSize: 9,
		keyword: "",
		fieldSort: "",
		sort: 1,
		tab: 1,
	});

	const [response, setResponse] = useState<typeResponse>({
		pageCount: 0,
		totalElement: 0,
		totalOptionPage: 0,
	});

	const handleVouchers = async () => {
		try {
			const { data } = await getPaginatedVouchersClient(searchObject);
			setVouchers(data.content);
			setResponse({
				pageCount: data.totalPage,
				totalElement: data.totalAllOptions,
				totalOptionPage: data.totalOptionPage,
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		handleVouchers();
	}, [searchObject]);
	const handleChangePag = async (value: any) => {
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
		<div>
			<div className="padding">
				<div className="pt-6">
					<h3 className="text-xl font-semibold">Danh sách voucher của cửa hàng</h3>
				</div>
				<div className="pt-5 pb-10">
					<div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2  ">
						{vouchers?.map((voucher) => (
							<div className="" key={voucher?._id}>
								<Coupon voucher={voucher} className="w-full" />
							</div>
						))}
					</div>
					<div className="flex justify-center pt-8">
						<Paginations
							forcePage={searchObject.pageIndex - 1}
							pageCount={response.pageCount}
							handlePageClick={handleChangePag}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VoucherIndex;
