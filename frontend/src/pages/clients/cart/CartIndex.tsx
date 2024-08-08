import { formatQuantity } from '@/common/localFunction'
import InputQuantity from '@/components/common/InputQuantity'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { pagingCart } from '@/service/cart'
import { useQuery } from '@tanstack/react-query'
import Attribute from './Attribute'
import { useState } from 'react'

const CartIndex = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { data: dataCart } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const { data } = await pagingCart();
            // console.log(data.data.content);
            return data.data.content;
        },
        staleTime: 5 * 60 * 1000
    });
    const [quantity, setQuantity] = useState(1)
    return (
        <>
            <div className="padding bg-main min-h-[100vh]">
                <div className=""><h3 className="text-xl font-semibold uppercase py-8">Giỏ hàng</h3></div>
                <div className=" flex w-[100%] h-[50px] bg-white box-shadow   items-center gap-4 text-base font-medium *:text-center">
                    <div className="min-w-[3%]  ">
                        <Checkbox />
                    </div>
                    <div className="w-[45%] flex items-start">Sản phẩm</div>
                    <div className="w-[15%]">Đơn giá</div>
                    <div className="w-[12%]">Số lượng</div>
                    <div className="w-[12%]">Số tiền</div>
                    <div className="w-[13%]">Thao tác</div>
                </div>
                {dataCart && dataCart?.map((cart: any, index: number) => (
                    <div className="my-4" key={index} >
                        <div className="border-b flex w-[100%] h-[50px] bg-white box-shadow   items-center gap-4 text-base font-medium *:text-center">
                            <div className="min-w-[3%]  ">
                                <Checkbox />
                            </div>
                            <div className="">
                                <h3 className="">{cart.product.name}</h3>
                            </div>
                        </div>
                        {cart.items.map((item: any, index: number) => (
                            <div className="cart-item  flex w-[100%] py-5 border-b border-gray-200 bg-white box-shadow items-center gap-4 text-base font-medium *:text-center">
                                <div className="min-w-[3%]   ">
                                    <Checkbox />
                                </div>
                                <div className="w-[45%] flex ">
                                    <div className=""><img src={item.thumbnail} className='w-[100px] h-[100px] object-cover' alt="" /></div>
                                    <div className="flex  float-left flex-col lg:flex-row gap-x-10">
                                        <div className="line-clamp-2 text-left">{item.name}</div>
                                        <div className="w-full flex flex-col justify-start">
                                            <Attribute data={item.attributesProduct} open={open} />
                                            <div className="text-sm text-left text-gray-500">Đen,S</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] space-x-3">
                                    <span className="text-gray-400 line-through">{formatQuantity(item.attribute.price, "₫")}</span>
                                    <span className=""> {formatQuantity(item.attribute.discount, "₫")}</span>
                                </div>
                                <div className="w-[12%]"><InputQuantity getValue={(value) => { console.log(value); setQuantity(value) }} defaultValue={+item.quantity} /></div>
                                <div className="w-[12%] text-red-500">{formatQuantity(quantity * item.attribute.discount, "₫")}</div>
                                <div className="w-[13%] ">Xóa</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default CartIndex