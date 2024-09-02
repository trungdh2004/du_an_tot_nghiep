import { formatQuantity } from '@/common/localFunction';
import { cn } from '@/lib/utils'
import { fetchOrderDetail } from '@/service/order';
import { IListStatusOrderDate, IOrderItemDetail } from '@/types/order';
import { useQuery } from '@tanstack/react-query';
import { Banknote, FileText, Inbox, Star, Truck } from 'lucide-react';
import { useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom';
import LoadingTable from './LoadingTable';
import { format } from 'date-fns';

type StatusHistoryItem = {
  status?: string;
  date?: string;
  _id?: string;
};
type StatusHistoryObject = {
  [key: string]: StatusHistoryItem;
};
const PurchaseOrder = () => {
  const [status, setStatus] = useState(null);
  const menuList = [
    {
      "index": 7,
      "name": "Tất cả",
    },
    {
      "index": 1,
      "name": "Chờ xác nhận",
    },
    {
      "index": 2,
      "name": "Chờ lấy hàng",
    },
    {
      "index": 3,
      "name": "Chờ giao hàng",
    },
    {
      "index": 5,
      "name": "Đã giao",
    },
    {
      "index": 6,
      "name": "Đã hủy",
    },
  ];
  const statusList = [
    {
      index: 1,
      percent: 35,
    },
    {
      index: 2,
      percent: 35,
    },
    {
      index: 3,
      percent: 60,
    },
    {
      index: 4,
      percent: 80,
    },
    {
      index: 5,
      percent: 100,
    },
  ]
  const [process, setProcess] = useState({
    index: 0,
    percent: 0,
  });
  const [statusOrder, setStatusOrder] = useState<StatusHistoryObject>({});

  const { id } = useParams();
  const handleStatus = async (status: number) => {
    const percent = data?.data?.status + 1 == 1 ? data?.data?.status : ((data?.data?.status + 1) / 6) * 100;
    setProcess({ index: data?.data?.status + 1, percent });
  }
  const { data, isLoading } = useQuery({
    queryKey: ['purchase', id],
    queryFn: async () => {
      const { data } = await fetchOrderDetail(id as string);
      setStatus(data?.data.status);
      handleStatus(data?.data.status)
      return data;
    }
  });
  const steps = [
    {
      status: "pending",
      label: "Đơn hàng đã đặt",
      icon: FileText,
      time: data?.listStatusOrderDate?.date,
    },
    {
      status: "confirmed",
      label: "Đã xác nhận",
      // order?.payment?.method === "cash_on_delivery"
      //   ? "Đã xác nhận thông tin thanh toán"
      //   : `Đơn hàng đã thanh toán (${formatMoney(order?.finalAmount || 0)})`,
      icon: Banknote,
      time: statusOrder?.confirmed?.date,
    },
    { status: "shipped", label: "Đang vận chuyển", icon: Truck },
    { status: "delivered", label: "Đã nhận được hàng", icon: Inbox },
    { status: "reviewed", label: "Đánh giá", icon: Star },
  ];
  // console.log("order detail", data)
  // console.log("dadadadadad", data?.data?.status)
  return (
    <>
      <div className="w-full px-0 lg:px-20">
        <div className="h-[500px">
          {isLoading && (<div className=''><LoadingTable /></div>)}
        </div>
        <div className="">
          <div className="bg-white py-5 px-2 md:px-5 border-b-2 box-shadow border-dotted border-gray-300  rounded flex justify-between items-center">
            <div className="">
              <Link to={`/account/purchase`}>
                <button className="text-sm lg:text-lg  flex  items-center gap-1 text-gray-500 uppercase"><BsChevronLeft size={16} /> Trở lại</button>
              </Link>
            </div>
            <div className="hidden md:flex md:gap-x-3 xl:gap-x-5 uppercase ">
              <p className="flex gap-1 ">Mã đơn hàng: {data?.data.code}  <span className=""></span></p>
              <span className="">|</span>
              <span className="text-red-500">{menuList.find((item) => item.index === status)?.name}</span>
            </div>
          </div>
          {/* status */}
          <div className="">
            <div
              className={cn(
                "w-full overflow-x-auto scrollbar-hide border-b-2 box-shadow border-dotted border-gray-300 rounded",
                // order?.status == "cancelled" && "hidden"
              )}
            >
              <div className="min-w-[963px] py-10 px-6 bg-white border-t border-gray-300 border-dotted rounded">
                <div className="relative stepper flex justify-between items-start">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="z-10 w-36 stepper__step flex flex-col justify-center items-center"
                    >
                      <div
                        className={cn(
                          "w-14 h-14 bg-white flex items-center justify-center border-[4px]  rounded-full",
                          process.index == index + 1
                            ? "bg-[#2dc258] border-none"
                            : process.index > index + 1
                              ? "border-[#2dc258]"
                              : "border-gray-100"
                        )}
                      >
                        {
                          <step.icon
                            size={30}
                            className={cn(
                              process.index == index + 1
                                ? "text-white"
                                : process.index > index + 1
                                  ? "text-[#2dc258]"
                                  : "text-[#ccc]"
                            )}
                          />
                        }
                      </div>
                      <div className="capitalize mt-5 text-center">
                        <p className="text-wrap max-w-40">{step.label}</p>
                        <span className="text-xs text-[#00000042]">
                          {step?.time
                            ? new Date(step.time).toLocaleString("vi-VN")
                            : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div
                    style={{ width: `${process.percent}%` }}
                    className={cn("absolute  top-6 h-1")}
                  >
                    <span className="absolute h-full bg-[#2dc258] w-[calc(100%_-_130px)] ml-12"></span>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}

          </div>
          {/* information */}
          <div className="bg-white">
            {/* customer */}
            <div className="p-5 border-b-2 border-dotted border-gray-300  rounded">
              <h3 className="text-lg lg:text-xl font-medium pb-2 ">Địa Chỉ Nhận Hàng</h3>
              <div className="flex">
                <div className="min-w-[300px] md:pr-10 py-3">
                  <p className="text-sm md:text-base leading-[160%] uppercase py-1">{data?.data?.address?.username}</p>
                  <p className="text-[rgba(0,0,0,.68)] leading-[160%]">{data?.data?.address?.phone}</p>
                  <p className="text-[rgba(0,0,0,.68)] leading-[160%]">{data?.data?.address?.address}</p>
                </div>
                <div className="flex flex-col w-[60%]">
                  {data?.listStatusOrderDate?.map((item: IListStatusOrderDate, index: number) => {
                    if (!item) return null;
                    return (
                      <>
                        <div className="px-5 flex gap-5 border-l border-gray-200 ">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 flex justify-center items-center border border-gray-200 bg-[#26aa99] rounded-full"><FileText size={16} color='white' /></div>
                            <div className={cn("w-[2px] h-14 bg-gray-200", (data?.listStatusOrderDate.length - 1) === index && "hidden")}></div>
                          </div>
                          <div className="">
                            {item?.date && format(new Date(item?.date), "hh:mm dd/MM/yyyy")}
                            {/* {new Date(item?.date)} */}
                          </div>
                          <div className="">
                            <h3 className="text-[#26aa99] font-bold">{item?.message}</h3>
                            <p className="">{item?.sub}</p>
                          </div>
                        </div >
                      </>
                    )
                  })}
                </div>


              </div>
            </div>
            {/* product */}
            <div className="box-shadow ">
              <div className="w-full ">
                {data?.data?.orderItems?.map((itemOrder: IOrderItemDetail, index: number) => {
                  return (
                    <>
                      <div key={itemOrder._id} className="w-full flex justify-between gap-3 md:gap-5 px-5 py-4 border-b border-dotted border-gray-300 ">
                        <div className="size-[100px] bg-gray-100 p-2">
                          <img src={itemOrder?.product.thumbnail} className='w-full h-full' alt="" />
                        </div>
                        <div className="flex flex-1 flex-col md:flex-row md:justify-between gap-2">
                          <div className="">
                            <h3 className="text-base md:text-[18px] font-medium line-clamp-1 ">{itemOrder?.product.name}</h3>
                            <p className="text-base text-[#0000008A] flex gap-x-1">Phân loại hàng:
                              <span className="text-gray-700 font-normal">{itemOrder?.color.name},</span>
                              <span className="text-gray-700 font-normal">{itemOrder?.size}</span>
                            </p>
                            <span>x{itemOrder?.quantity}</span>
                          </div>
                          <div className="text-red-500 flex items-end md:items-center font-medium ">
                            <span className="text-gray-500 line-through pr-3">{formatQuantity(itemOrder?.product.price, "₫")}</span>
                            <span className="">{formatQuantity(itemOrder?.price, "₫")}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
              <div className="flex border-t border-gray-200">
                <div className="w-[75%] flex flex-col text-right ">
                  <span className="py-4 px-3 border-b-2 border-r-2  border-dotted text-sm md:text-base rounded text-[rgba(0,0,0,.68)] leading-[160%]">Tổng tiền hàng</span>
                  <span className="py-4 px-3 border-b-2  border-r-2 border-dotted text-sm md:text-base rounded text-[rgba(0,0,0,.68)] leading-[160%]">Phí vận chuyển</span>
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted text-sm md:text-base rounded text-[rgba(0,0,0,.68)] leading-[160%]">Giảm giá phí vận chuyển                  </span>
                  <span className="py-6 px-3 border-b-2 border-r-2 border-dotted rounded text-lg md:text-xl text-[rgba(0,0,0,.68)] leading-[160%]">Thành tiền</span>
                </div>
                <div className="w-[25%] flex flex-col text-right">
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted rounded text-sm md:text-base text-[rgba(0,0,0,.68)] leading-[160%]">{formatQuantity(data?.data?.totalMoney, "₫")}</span>
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted rounded text-sm md:text-base text-[rgba(0,0,0,.68)] leading-[160%]">₫5.000</span>
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted rounded text-sm md:text-base  text-[rgba(0,0,0,.68)] leading-[160%]">-₫5.000 </span>
                  <span className="py-6 px-3 border-b-2 border-r-2 border-dotted rounded text-red-500 text-lg md:text-xl leading-[160%]">{formatQuantity(data?.data?.totalMoney, "₫")}</span>
                </div>
              </div>
              <div className="border border-[rgba(224,168,0,.4)] rounded w-full px-5 py-2 text-[rgba(0,0,0,.68)] leading-[160%]">
                Vui lòng thanh toán <span className="text-red-500">{formatQuantity(data?.data?.totalMoney, "₫")}</span> khi nhận hàng
              </div>
              <div className="flex ">
                <div className="w-[75%] flex flex-col text-right">
                  <span className="py-5 px-3 border-b-2 border-r-2  border-dotted text-lg md:text-xl rounded text-[rgba(0,0,0,.68)] leading-[160%]">
                    Phương thức Thanh toán
                  </span>
                </div>
                <div className="w-[25%] flex flex-col text-right">
                  <span className="py-5 px-3 border-b-2 border-r-2 border-dotted rounded  text-lg md:text-xl  text-[rgba(0,0,0,0.83)] leading-[160%]">Thanh toán khi nhận hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PurchaseOrder