import LabelChecked from '@/components/common/LabelChecked'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ICart } from '@/types/cart'
import { IColor } from '@/types/typeProduct'
import { ISize } from '@/types/variants'
import { useState } from 'react'
type Props = {
    dataColor: any,
    dataSize: any,
    open?: boolean,
}
const Attribute = ({ dataColor, dataSize }: Props) => {
    console.log("Attribute", dataColor);
    const [size, setSize] = useState<ISize>();
    const [color, setColor] = useState<IColor>();
    console.log(color)
    const handleChangeSize = (size: ISize) => {
        setSize(size);
    }
    const handleChangeColor = (color: IColor) => {
        setColor(color);
    }
    return (
        <>
            <Popover >
                <PopoverTrigger asChild >
                    <button className='text-sm text-left text-gray-500'>Phân loại sản phẩm  </button>
                </PopoverTrigger>
                <PopoverContent className='w-auto text-gray-500'>
                    <div className="grid gap-4">
                        <div className="flex gap-7 lg:gap-10">
                            <h3 className="lg:text-[15px] text-[13px] font-semibold ">Màu</h3>
                            <div className="flex gap-3 items-center">
                                {dataColor.map((color: any, index: number) => {
                                    return (
                                        // <button key={color?.colorId}>{color.colorName}</button>
                                        // <button style={{ background: color.colorCode }} onClick={() => handleChangeColor(color.colorName)}
                                        //     className="lg:w-[65px] lg:h-[25px] w-[40px] h-[15px] bg-red-500 rounded-full align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs   text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"></button>
                                        <LabelChecked
                                            isOneChecked
                                            value={color.colorId}
                                            nameInput='choosColor'
                                            haxColor={color.colorCode}
                                            key={color.colorId}
                                            onChange={() => handleChangeColor(color.colorName)}
                                            className='px-2'
                                        >
                                            {color.colorName}
                                        </LabelChecked>
                                    )
                                })}

                            </div>
                        </div>
                        <div className="flex gap-7 lg:gap-10">
                            <h3 className="lg:text-[15px] text-[13px] font-semibold ">Size</h3>
                            <div className="grid lg:grid-cols-4 grid-cols-3 gap-4 w-full">
                                {dataSize?.map((size: any, index: number) => {
                                    return (
                                        <LabelChecked
                                            isOneChecked
                                            value={size.sizeId}
                                            nameInput='chooseSize'
                                            key={size.sizeId}
                                            onChange={() => handleChangeSize(size.sizeName)}
                                            className='px-2'
                                        >
                                            {size.sizeName}
                                        </LabelChecked>
                                        // <button key={size.sizeId} className="lg:w-full rounded-[7px] border-2 border-gray-300 inline-block bg-primary-100 text-xs font-medium uppercase leading-normal text-primary-700 transition ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400 py-1 duration-200 lg:text-[14px] text-[10px]">
                                        //     {size.sizeName}
                                        // </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <div className="text-sm text-left text-gray-500">{color as any}, {size}</div>

        </>
    )
}

export default Attribute