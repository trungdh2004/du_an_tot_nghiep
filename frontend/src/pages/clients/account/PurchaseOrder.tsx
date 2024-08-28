import { cn } from '@/lib/utils'
import { Banknote, FileText, Inbox, Star, Truck } from 'lucide-react';
import { useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs'
type StatusHistoryItem = {
  status?: string;
  date?: string;
  _id?: string;
};
type StatusHistoryObject = {
  [key: string]: StatusHistoryItem;
};
const PurchaseOrder = () => {
  const [process, setProcess] = useState({
    index: 1,
    percent: 35,
  });
  const [statusOrder, setStatusOrder] = useState<StatusHistoryObject>({});

  const steps = [
    {
      status: "pending",
      label: "Đơn hàng đã đặt",
      icon: FileText,
      time: statusOrder?.pending?.date,
    },
    {
      status: "confirmed",
      label: "Đã xác nhận thông tin thanh toán",
      // order?.payment?.method === "cash_on_delivery"
      //   ? "Đã xác nhận thông tin thanh toán"
      //   : `Đơn hàng đã thanh toán (${formatMoney(order?.finalAmount || 0)})`,
      icon: Banknote,
      time: statusOrder?.confirmed?.date,
    },
    { status: "shipped", label: "Đã giao cho ĐVVC", icon: Truck },
    { status: "delivered", label: "Đã nhận được hàng", icon: Inbox },
    { status: "reviewed", label: "Đánh giá", icon: Star },
  ];
  return (
    <>
      <div className="w-full px-20">
        <div className="">
          <div className="bg-white py-5 px-5 border-b-2 box-shadow border-dotted border-gray-300  rounded flex justify-between items-center">
            <div className=""><button className="text-sm md:text-lg  flex  items-center gap-1 text-gray-500 uppercase"><BsChevronLeft size={16} /> Trở lại</button></div>
            <div className="flex md:gap-x-3 xl:gap-x-5 uppercase ">
              <p className="flex gap-1 ">Mã đơn hàng: <span className="">JSAdadkada</span></p>
              <span className="">|</span>
              <span className="text-red-500">Đơn hàng đã hoàn thành</span>
            </div>
          </div>
          {/*  */}
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
            <div className="bg-[#FFFCF5] py-7 px-5 border-b-2 box-shadow border-dotted border-gray-300">
              <div className="flex w-full justify-end items-center">
                <button className="px-5 py-2 lg:px-8 lg:py-3 text-white bg-red-500 border border-orange-700 hover:bg-red-600 transition-all  duration-300    rounded-sm text-sm lg:text-[18px]">Hủy đơn hàng</button>
              </div>
            </div>
          </div>
          {/* information */}
          <div className="bg-white">
            <div className="px-5 py-5 border-b-2 border-dotted border-gray-300  rounded">
              <h3 className="text-lg lg:text-xl font-medium pb-2">Địa Chỉ Nhận Hàng</h3>
              <p className="text-sm md:text-base leading-[160%] py-1">Nguyễn Tuấn Đức</p>
              <p className="text-[rgba(0,0,0,.68)] leading-[160%]">0377760889</p>
              <p className="text-[rgba(0,0,0,.68)] leading-[160%]">Số 6, Ngõ 33 Đường Bờ Đa, Xã Dị Nậu, Huyện Thạch Thất, Hà Nội</p>
            </div>
            <div className="box-shadow">
              <div className="w-full h-[200px]">Sản phẩm</div>
              <div className="flex border-t border-gray-200">
                <div className="w-[75%] flex flex-col text-right ">
                  <span className="py-4 px-3 border-b-2 border-r-2  border-dotted text-sm md:text-base rounded text-[rgba(0,0,0,.68)] leading-[160%]">Tổng tiền hàng</span>
                  <span className="py-4 px-3 border-b-2  border-r-2 border-dotted text-sm md:text-base rounded text-[rgba(0,0,0,.68)] leading-[160%]">Phí vận chuyển</span>
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted text-sm md:text-base rounded text-[rgba(0,0,0,.68)] leading-[160%]">Giảm giá phí vận chuyển                  </span>
                  <span className="py-6 px-3 border-b-2 border-r-2 border-dotted rounded text-lg md:text-xl text-[rgba(0,0,0,.68)] leading-[160%]">Thành tiền</span>
                </div>
                <div className="w-[25%] flex flex-col text-right">
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted rounded text-sm md:text-base text-[rgba(0,0,0,.68)] leading-[160%]">₫10.900</span>
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted rounded text-sm md:text-base text-[rgba(0,0,0,.68)] leading-[160%]">₫5.000</span>
                  <span className="py-4 px-3 border-b-2 border-r-2 border-dotted rounded text-sm md:text-base  text-[rgba(0,0,0,.68)] leading-[160%]">-₫5.000 </span>
                  <span className="py-6 px-3 border-b-2 border-r-2 border-dotted rounded text-red-500 text-lg md:text-xl leading-[160%]">₫10.900</span>
                </div>
              </div>
              <div className="border border-[rgba(224,168,0,.4)] rounded w-full px-5 py-2 text-[rgba(0,0,0,.68)] leading-[160%]">
                Vui lòng thanh toán <span className="text-red-500">₫10.900</span> khi nhận hàng
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