import { cn } from '@/lib/utils';
import React, { useState } from 'react'

const Index = () => {
    const [active, setActive] = useState(7);
    const [status, setStatus] = useState('')
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
    ]
    const handleMenuClick = (item: any) => {

    }
    return (
        <>
            <div className="padding py-20 bg-main">
                <div className="flex gap-8">
                    <div className="w-[300px] hidden lg:block">
                        <h3 className="">Nguyễn Tuấn Đức</h3>
                    </div>
                    <div className="w-full">
                        <div className="sticky top-0">
                            <ul className="flex scroll-custom  no-scrollbar text-base bg-white box-shadow scroll-custom overflow-x-auto">
                                {menuList.map((item: any) => (
                                    <li key={item.index} onClick={() => setActive(item.index)} className={cn(`flex-1 text-nowrap px-5 cursor-pointer font-medium flex justify-center py-4 border-b-2 border-gray-300 hover:border-b-2
                                 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 `, active === item.index && `border-blue-500 text-blue-500`)}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full bg-white box-shadow my-5 border border-gray-200 rounded-sm px-4 lg:px-8 py-2 ">
                            <div className="flex justify-between items-center border-b border-gray-300 py-3">
                                <div className="text-sm md:text-base font-semibold">Mã đơn hàng: <span className='text-gray-500 '>00122323 </span></div>
                                <div className="text-sm md:text-base text-red-500 font-medium">Chờ xác nhận</div>
                            </div>
                            <div className="py-4">
                                <div className="flex justify-between gap-3 md:gap-5 ">
                                    <div className="size-[100px]">
                                        <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhkarqtaf4ch9e_tn" className='w-full h-full' alt="" />
                                    </div>
                                    <div className="flex flex-1 flex-col md:flex-row gap-2">
                                        <div className="">
                                            <h3 className="text-base md:text-[18px] font-medium line-clamp-1 ">Ốp lưng iphone TPU Silicon Mềm Bảo Vệ Bốn Góc Màu Trong Suốt Siêu Chống Sốc 7plus/8plus/xs/11/12/13/14/15/pro//promax</h3>
                                            <p className="text-base text-[#0000008A]">Phân loại hàng: Trắng đen</p>
                                            <span>x1</span>
                                        </div>
                                        <div className="text-red-500 flex items-end md:items-center ">
                                            <span className="text-gray-500 line-through pr-3">100.000đ</span>89.000đ
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="bg-white box-shadow border border-gray-200 px-4 lg:px-8 py-7 md:py-10">
                            <div className="flex justify-between">
                                <div className=" text-sm md:text-base font-normal ">Thời gian dự kiến nhận hàng: <span className="">3-4 ngày</span></div>
                                <div className="text-sm md:text-base font-normal">Thành tiền: <span className="text-[18px] text-red-500">8000đ</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Index