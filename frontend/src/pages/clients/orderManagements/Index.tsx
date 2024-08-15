import { cn } from '@/lib/utils';
import React, { useState } from 'react'

const Index = () => {
    const [active, setActive] = useState(7);
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
    return (
        <>
            <div className="padding py-10 bg-main">
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

                        <div className="w-full bg-white box-shadow my-5 min-h-[1000px]">
                            <div className="">Ao polo</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Index