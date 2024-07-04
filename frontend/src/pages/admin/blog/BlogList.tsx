import React from 'react'
import { FaCommentDots, FaEye, FaShareAlt } from 'react-icons/fa';
import { SlOptionsVertical } from "react-icons/sl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
const BlogList = () => {

    return (
        <>
            <div className="">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">Bài viết</h3>
                    <Button className='px-5 rounded-xl hover:opacity-90 transition-all duration-300'>Bài viết mới</Button>
                </div>
            </div>
            <div className="grid grid-cols-8 gap-6 xl:gap-8 mt-10">
                <div className="col-span-8 min-[600px]:col-span-4 min-[900px]:col-span-2 h-[360px] ">
                    <div className="h-[350px] grid grid-rows-2 border rounded-xl overflow-hidden relative" >
                        {/* card-head */}
                        <div className="absolute z-10 top-3 right-3">
                            <DropdownMenu >
                                <DropdownMenuTrigger><SlOptionsVertical /></DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    {/* <DropdownMenuLabel>Xóa</DropdownMenuLabel>
                                    <DropdownMenuSeparator /> */}
                                    <DropdownMenuItem >Xóa</DropdownMenuItem>
                                    <DropdownMenuItem>Sửa</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="h1/2">
                            <img src="https://minimal-kit-react.vercel.app/assets/images/covers/cover_1.jpg" className='w-full h-full object-cover' alt="" />
                            <div className="-mt-5 pl-5">
                                <img src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_1.jpg" className='w-[40px] h-[40px] border-[3px] border-white rounded-full' alt="" />
                            </div>
                        </div>
                        {/* card-content */}
                        <div className="h1/2 p-5">
                            <p className="text-xs text-[#212B36] opacity-50 pt-1 pb-2">02 Apr 2024</p>
                            <p className=" line-clamp-1 text-[#212B36] text-base font-semibold hover:underline transition-all duration-300">
                                Designify Agency Landing Page Design</p>
                            <p className="text-xs pt-2 text-gray-400 line-clamp-2">Description dhakjdah akhdfakdhakda akdhakdadkahdak.dadadda....</p>
                            <div className="flex space-x-4 min-[900px]:space-x-1 xl:space-x-4 absolute bottom-5 right-4">
                                <span className="text-[#212B36] text-xs flex items-center gap-1"><FaCommentDots />94.34k</span>
                                <span className="text-[#212B36] text-xs flex items-center gap-1"> <FaEye />24.34k</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogList