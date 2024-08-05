import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'

const CartIndex = () => {
    return (
        <>
            <div className="padding bg-main min-h-[100vh]">
                <div className=""><h3 className="text-xl font-semibold uppercase py-8">Giỏ hàng</h3></div>
                <div className="flex w-[100%] h-[50px] bg-white box-shadow   items-center gap-4 text-base font-medium *:text-center">
                    <div className="min-w-[5%]  ">
                        <Checkbox />
                    </div>
                    <div className="w-[45%] flex items-start">Sản phẩm</div>
                    <div className="w-[15%]">Đơn giá</div>
                    <div className="w-[12%]">Số lượng</div>
                    <div className="w-[10%]">Số tiền</div>
                    <div className="w-[13%] ">Thao tác</div>
                </div>
                <div className="">
                    <div className="min-w-[5%]  ">
                        <Checkbox />
                    </div>
                    {/* sản phẩm */}
                    <div className="">
                        <div className="">
                            <img src="" alt="" className="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartIndex