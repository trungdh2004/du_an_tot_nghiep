import { formatQuantity } from '@/common/localFunction';
import { cn } from '@/lib/utils';
import { fetchOrder } from '@/service/order';
import { IItemOrder, IItemOrderList, IOrderList } from '@/types/order';
import { Item } from '@radix-ui/react-dropdown-menu';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import LoadingTable from './LoadingTable';
import { Link } from 'react-router-dom';

const OrderManagements = () => {
  const queryClient = useQueryClient();
  const [active, setActive] = useState(7);
  const [status, setStatus] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [statusLists, setStatusLists] = useState<number[]>([0]);
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
      "index": 8,
      "name": "Đã giao",
    },
    {
      "index": 6,
      "name": "Đã hủy",
    },
  ];
  // console.log("status", status)
  const handleMenuClick = (item: any) => {
    setActive(item.index);
    setStatus(item.index === 7 ? null : item.index);
  }
  const { data: orderData, isLoading } = useQuery({
    queryKey: ['purchase', status],
    queryFn: async () => {
      const { data } = await fetchOrder({ status: status });
      // console.log("---------------------", data.data?.content.statusList)
      // setStatus(data.data?.content.statusList)
      // console.log("------", data.data.content)
      return data?.data.content;
    },
    staleTime: 5 * 60 * 60,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoading]);
  // console.log("dladalndalfndalfdjanldkans", statusLists)
  return (
    <>
      <div className="">
        <div className="">
          <div className="w-full">
            <div className="sticky top-0">
              <ul className="flex scroll-custom  no-scrollbar text-base bg-white md:border md:border-gray-200 rounded box-shadow scroll-custom overflow-x-auto">
                {menuList.map((item: any) => (
                  <li key={item.index} onClick={() => handleMenuClick(item)} className={cn(`flex-1 text-nowrap px-5 cursor-pointer font-medium flex justify-center py-5 border-b-2 border-gray-200 hover:border-b-2
                                 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 `, active === item.index && `border-blue-500 text-blue-500`)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-[500px">
              {isLoading && (<div className=''><LoadingTable /></div>)}
            </div>
            {!isLoading && orderData && orderData?.map((item: IOrderList) => {
              return (
                <>
                  <div key={item._id} className="my-5">
                    <div className="">
                      {/* head-order */}
                      <div className="w-full bg-white box-shadow flex justify-between items-center rounded-sm border border-gray-200 px-5 py-5">
                        <div className="text-sm md:text-base font-semibold">Mã đơn hàng: <span className='text-gray-900 font-medium'>{item?.code} </span></div>
                        <div className="text-sm md:text-base text-red-500 font-medium">{menuList.find((status) => status.index === item.status)?.name}</div>
                      </div>
                      {/* end head */}

                      {/*  order item*/}
                      <Link to={`/account/purchase/order/${item?._id}`}>
                        {item?.itemList?.map((itemOrderList: IItemOrderList) => {
                          // console.log("itemOrderList: ", itemOrderList)
                          return (
                            <div key={itemOrderList.productId} className="w-full bg-white box-shadow  border border-gray-200 rounded-sm px-4 lg:px-8 py-2 ">
                              <div className="py-4 space-y-4">
                                {itemOrderList?.items?.map((itemOrder: IItemOrder) => {
                                  // console.log("itemOrderList: ", itemOrder)
                                  return (
                                    <div key={itemOrder._id} className="w-full flex justify-between gap-3 md:gap-5 pb-4 border-b border-gray-300 ">
                                      <div className="size-[80px] md:size-[100px] bg-gray-100 p-2">
                                        <img src={itemOrder?.product.thumbnail} className='w-full h-full' alt="" />
                                      </div>
                                      <div className="flex flex-1 flex-col md:flex-row md:justify-between gap-2">
                                        <div className="">
                                          <h3 className="text-base md:text-[18px] font-medium line-clamp-1 ">{itemOrder?.product.name}</h3>
                                          <div className="flex flex-row md:flex-col gap-x-3">
                                            <p className="text-base text-[#0000008A] flex gap-x-1"><span className="hidden md:text-block">Phân loại hàng:</span>
                                              <span className="text-gray-500 text-sm md:text-base font-normal">{itemOrder?.color.name},</span>
                                              <span className="text-gray-500 text-sm md:text-base font-normal">{itemOrder?.size}</span>
                                            </p>
                                            <span className='text-sm text-gray-900 md:text-base'>x{itemOrder?.quantity}</span>
                                          </div>
                                        </div>
                                        <div className="text-red-500 text-sm md:text-base flex items-end md:items-center font-medium ">
                                          <span className="text-gray-500 line-through pr-3">{formatQuantity(itemOrder?.product.price, "₫")}</span>
                                          <span className="">{formatQuantity(itemOrder?.price, "₫")}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}

                                <div className="w-full flex justify-between items-center pt-2">
                                  {/*  */}
                                  {item.status === 6 && (
                                    <div className="w-full">
                                      <button className="px-5 py-2 md:px-8 lg:py-3 text-white bg-blue-500 border border-blue-500 rounded-sm text-sm lg:text-[18px]">Đánh giá</button>
                                    </div>
                                  )}
                                  <div className="flex  justify-end w-full">
                                    <p className="text-right text-sm md:text-base lg:font-medium lg:flex gap-x-3">Tổng số tiền ({itemOrderList?.items.length as number} sản phẩm):
                                      <span className="text-red-500 font-medium lg:font-semibold text-sm lg:text-[18px] pl-2 lg:pl-0">{formatQuantity(itemOrderList.totalMoney, "₫")}</span></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </Link>
                    </div>
                    <div className="bg-[#FFFCF5] box-shadow border border-gray-200 px-4 lg:px-8 py-3 md:py-6">
                      <div className="flex justify-between items-center">
                        {/* change */}
                        {[1].includes(item.status) && (
                          <button className="px-3 py-2 lg:px-8 lg:py-3 text-white bg-red-500 border border-orange-700 hover:bg-red-600 transition-all  duration-300    rounded-sm text-xs lg:text-[16px]">Hủy đơn hàng</button>
                        )}
                        {[4].includes(item.status) && (
                          <button className="px-3 py-2 lg:px-8 lg:py-3 text-white bg-blue-500 border border-blue-600 hover:bg-blue-600 transition-all  duration-300    rounded-sm text-xs lg:text-[16px]">Đã nhận hàng</button>
                        )}
                        {[2, 3].includes(item.status) && (
                          <div className=" text-sm lg:text-base font-medium ">Thời gian dự kiến nhận hàng: <span className="">{item?.estimatedDeliveryDate}</span></div>

                        )}
                        <div className="text-sm lg:text-base font-medium">Thành tiền: <span className="text-sm lg:text-[18px] font-medium lg:font-semibold text-red-500">{formatQuantity(item.totalMoney, "₫")}</span></div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
            {orderData?.length === 0 && (
              <div className="w-full h-[300px] flex flex-col justify-center items-center">
                <div className="w-20">
                  <img src="https://toinh-ecommerce.vercel.app/images/no-order.png" alt="" className="" />
                </div>
                <h3 className="">Chưa có đơn hàng.</h3>

              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default OrderManagements