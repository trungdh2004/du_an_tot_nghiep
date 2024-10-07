import { formatQuantity } from "@/common/localFunction";
import Paginations from "@/components/common/Pagination";
import instance from "@/config/instance";
import { fetchPayments } from "@/types/payment";
import { ISearchObjectPayment } from "@/types/searchObjecTypes";
import { typeResponse } from "@/types/typeReponse";
import { Value } from "@radix-ui/react-select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react"

type IPayment = {
  _id: string;
  bankCode?: string;
  codeOrder: string;
  amount: number;
  createdAt: string;
}

const PaymentIndex = () => {
  // const [response, setResponse] = useState<typeResponse>({
  //   pageCount: 0,
  //   totalElement: 0,
  //   totalOptionPage: 0,
  // });
  const [searchObject, setSearchObject] = useState<ISearchObjectPayment>({
    pageIndex: 1,
    pageSize: 1,
  })
  const { data } = useQuery({
    queryKey: ['payment', searchObject],
    queryFn: async () => {
      try {
        const { data } = await fetchPayments(searchObject);
        return data;
      } catch (error) {
        console.log(error)
      }
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 60,
  })
  console.log("data", data);
  // useEffect(() => {
  //   setSearchObject((prev))
  // })
  const handleChangePag = (value: any) => {
    console.log("value", value)
    try {
      setSearchObject((prev) => ({
        ...prev,
        pageIndex: value.selected + 1,
      }))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {/* // min-[600px]:col-span-6 min-[900px]:col-span-4 h-[360px] */}
      <div className="px-10" >
        <div className="text-[18px] font-medium">Các giao dịch online của bạn</div>
        <div className="grid grid-cols-12 gap-6 xl:gap-8 mt-5 ">
          {data?.content?.map((item: IPayment, index: number) => {
            return (
              <div key={index} className="border border-blue-200 bg-gray-100 rounded-[8px] px-4 py-2 col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-6 ">
                <p className="text-sm font-semibold pb-2 ">Mã đơn hàng: <span className="">{item?.codeOrder}</span></p>
                <p className="">Có giao dịch thanh toán online với số tiên
                  <span className="text-red-500 font-semibold pl-1">{formatQuantity(
                    item?.amount, "₫",)}</span>
                  , vui long kiểm tra thông tin.</p>
                <p className="text-gray-500 text-sm text-right">{format(item?.createdAt || "", "hh:mm dd/MM/yyyy")}</p>
              </div>
            )
          })}
        </div>
        <div className=" py-6 w-full flex justify-center">
          <Paginations
            forcePage={searchObject.pageIndex - 1}
            pageCount={data?.totalPage}
            handlePageClick={handleChangePag} />
        </div>
      </div>
    </>
  )
}

export default PaymentIndex