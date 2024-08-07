import { formatQuantity } from '@/common/localFunction'
import InputQuantity from '@/components/common/InputQuantity'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { pagingCart } from '@/service/cart'
import { useQuery } from '@tanstack/react-query'
import Attribute from './Attribute'

const CartIndex = () => {
    const { data: dataCart } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const { data } = await pagingCart();
            // console.log(data.data.content);
            return data.data.content;
        }
    });

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
                            <div className="cart-item cborder-b flex w-[100%] py-5 bg-white box-shadow   items-center gap-4 text-base font-medium *:text-center">
                                <div className="min-w-[3%]  ">
                                    <Checkbox />
                                </div>
                                <div className="w-[45%] flex gap-3">
                                    <div className=""><img src={item.thumbnail} className='w-[100px] h-[100px] object-cover' alt="" /></div>
                                    <div className="flex flex-col lg:flex-row gap-2">
                                        <div className="text-sm line-clamp-2 text-left">{item.name}</div>
                                        <div className="text-left">
                                            <Attribute data={dataCart} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] space-x-3">
                                    <span className="text-gray-400 line-through">{formatQuantity(item.attribute.price, "₫")}</span>
                                    <span className=""> {formatQuantity(item.attribute.discount, "₫")}</span>
                                </div>
                                <div className="w-[12%]"><InputQuantity /></div>
                                <div className="w-[12%] text-red-500"></div>
                                <div className="w-[13%] ">Xóa</div>
                            </div>
                        ))}
                    </div>
                ))}




                <div className="my-4">
                    {/*  */}
                    <div className=" flex w-[100%] h-[50px] bg-white box-shadow   items-center gap-4 text-base font-medium *:text-center">
                        <div className="min-w-[3%]  ">
                            <Checkbox />
                        </div>
                        <div className="">
                            <h3 className="">Áo polo nam đẹp</h3>
                        </div>
                    </div>
                    <div className=" flex w-[100%] py-5 bg-white box-shadow   items-center gap-4 text-base font-medium *:text-center">
                        <div className="min-w-[3%]  ">
                            <Checkbox />
                        </div>
                        <div className="w-[45%] flex gap-3">
                            <div className=""><img src="https://onoff.vn/img/800/1000/resize/1/8/18is23s016-ma019-3d.webp" className='w-[100px] h-[100px] object-cover' alt="" /></div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <div className="text-sm line-clamp-2 text-left">Áo thun cộc tay nam Cotton Compact cổ tim</div>
                                <div className="text-left">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className='flex'>Phân loại sản phẩm </button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Set the dimensions for the layer.
                                                    </p>
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="width">Width</Label>
                                                        <Input
                                                            id="width"
                                                            defaultValue="100%"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="maxWidth">Max. width</Label>
                                                        <Input
                                                            id="maxWidth"
                                                            defaultValue="300px"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </div>
                            </div>
                        </div>
                        <div className="w-[15%] space-x-3">
                            <span className="text-gray-400 line-through">1111</span>
                            <span className="">9000</span>
                        </div>
                        <div className="w-[12%]"></div>
                        <div className="w-[12%] text-red-500">111</div>
                        <div className="w-[13%] ">Xóa</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CartIndex