import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { pagingCart } from '@/service/cart'
import { ICart } from '@/types/cart'
import { useQuery } from '@tanstack/react-query'
type Props = {
    data: ICart[],

}

const Attribute = ({ data }: Props) => {
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
            <Popover>
                <PopoverTrigger asChild>
                    <button className='flex'>Phân loại sản phẩm </button>
                </PopoverTrigger>
                <PopoverContent className='w-auto'>
                    <div className="grid gap-4">
                        <div className="flex gap-7 lg:gap-10">
                            <h3 className="lg:text-[15px] text-[13px] font-bold ">Màu</h3>
                            <div className="flex gap-3 items-center">
                                <button className="lg:w-[65px] lg:h-[25px] w-[40px] h-[15px] bg-red-500 rounded-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"></button>
                                <button className="lg:w-[65px] lg:h-[25px] w-[40px] h-[15px] bg-blue-500 rounded-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"></button>
                                <button className="lg:w-[65px] lg:h-[25px] w-[40px] h-[15px] bg-yellow-500 rounded-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"></button>
                                <button className="lg:w-[65px] lg:h-[25px] w-[40px] h-[15px] bg-green-500 rounded-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"></button>
                            </div>
                        </div>
                        <div className="flex gap-7 lg:gap-10">
                            <h3 className="lg:text-[15px] text-[13px] font-bold ">Size</h3>
                            <div className="grid lg:grid-cols-4 grid-cols-3 gap-4 w-full">
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 inline-block bg-primary-100 text-xs font-medium uppercase leading-normal text-primary-700 transition ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    S
                                </button>
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 hover:border-gray-300 hover:bg-slate-100/70 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    M
                                </button>
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 hover:border-gray-300 hover:bg-slate-100/70 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    XL
                                </button>
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 hover:border-gray-300 hover:bg-slate-100/70 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    XXL
                                </button>
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 hover:border-gray-300 hover:bg-slate-100/70 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    3XL
                                </button>
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 hover:border-gray-300 hover:bg-slate-100/70 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    4XL
                                </button>
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 hover:border-gray-300 hover:bg-slate-100/70 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    5XL
                                </button>
                                <button className="lg:w-full rounded-[7px] border-2 border-gray-300 hover:border-gray-300 hover:bg-slate-100/70 py-1 duration-200 lg:text-[14px] text-[10px]">
                                    6XXL
                                </button>
                            </div>
                        </div>

                    </div>
                </PopoverContent>
            </Popover>

        </>
    )
}

export default Attribute