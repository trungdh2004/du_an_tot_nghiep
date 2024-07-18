import React, { useEffect, useState } from 'react'
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
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Input } from '@/components/ui/input';
import instance from '@/config/instance';
import { da } from 'date-fns/locale';
import useDebounce from '@/hooks/shared';
import { typeResponse } from '@/types/typeReponse';
import PaginatedItems from '@/components/Pagination';
import Paginations from '@/components/common/Pagination';
import { SearchObjectType } from '@/types/searchObjecTypes';
import { Link } from 'react-router-dom';

type IBlog = {
    _id?: string,
    title: string,
    content: string,
    isDeleted: string,
    published_at: string,
    user: {
        avatarUrl?: string,
        email: string,
        _id: string,
        full_name: string,

    },
    meta_description: string,
}

const BlogList = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [response, setResponse] = useState<typeResponse>({
        pageCount: 0,
        totalElement: 0,
        totalOptionPage: 0,
    })
    const [searchObject, setSearchObject] = useState<SearchObjectType>({
        pageIndex: 1,
        pageSize: 9,
        keyword: "",
        fieldSort: "",
        sort: 1,
        tab: 2,
    })
    const handleBlog = async () => {
        try {
            const { data } = await instance.post(`/blogs/pagingBlog`, searchObject);
            setBlogs(data.content);
            setResponse({
                pageCount: data.totalPage,
                totalElement: data.totalOptionPage,
                totalOptionPage: data.totalAllOptions,
            })
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        (async () => {
            handleBlog()
        })()
    }, [searchObject])
    const handleChangePageSize = (value: number) => {
        setSearchObject((prev) => ({
            ...prev,
            pageSize: value,
            pageIndex: 1,
        }));
    };
    const handleChangePag = (value: any) => {
        console.log("value change page", value);
        setSearchObject((prev) => ({
            ...prev,
            pageIndex: value.selected + 1,
        }));
    }
    // handleChangePag()
    console.log(blogs)

    return (
        <>
            <div className="">
                <div className="flex flex-col gap-3 mb-5">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold">Bài viết</h3>
                        <Link to="/admin/blogs/new-blog"
                            className='text-white bg-slate-900 px-5 py-[8px] rounded-xl border border-slate-900 hover:bg-white hover:text-black hover:border hover:border-slate-900 transition-all duration-300'>
                            Bài viết mới
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <Input
                                placeholder="Tìm kiếm bài viết"
                                className="w-[40%] md:text-base text-xs"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6 xl:gap-8 mt-10">
                {blogs.map((item: IBlog, index: number) => (
                    <>
                        <div key={index} className="col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-4 h-[360px] " >
                            <div className="h-[350px] grid grid-rows-2 border rounded-xl overflow-hidden relative" >
                                {/* card-head */}
                                <div className="absolute z-10 top-3 right-3">
                                    <DropdownMenu >
                                        <DropdownMenuTrigger><SlOptionsVertical /></DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem >Xóa</DropdownMenuItem>
                                            <DropdownMenuItem><Link className='w-full' to={`/admin/blogs/${item._id}/edit`}>Sửa</Link></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="h1/2">
                                    <img src="https://minimal-kit-react.vercel.app/assets/images/covers/cover_1.jpg" className='w-full h-full object-cover' alt="" />
                                    {/* <div className="-mt-5 pl-5">
                                        <img src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_1.jpg" className='w-[40px] h-[40px] border-[3px] border-white rounded-full' alt="" />
                                    </div> */}
                                    <div className="-mt-5 pl-5">
                                        <img src={item.user.avatarUrl} className='w-[40px] h-[40px] border-[3px] border-white rounded-full' alt="" />

                                    </div>
                                </div>
                                {/* card-content */}
                                <div className="h1/2 p-5">
                                    <p className="text-xs text-[#212B36] opacity-50 pt-1 pb-2">02 Apr 2024</p>
                                    <p className=" line-clamp-1 text-[#212B36] text-base font-semibold hover:underline transition-all duration-300">{item.title}</p>
                                    <p className="text-xs pt-2 text-gray-400 line-clamp-2">{item.meta_description}</p>
                                    <div className="flex space-x-4 min-[900px]:space-x-1 xl:space-x-4 absolute bottom-5 right-4">
                                        <span className="text-[#212B36] text-xs flex items-center gap-1"><FaCommentDots />94.34k</span>
                                        <span className="text-[#212B36] text-xs flex items-center gap-1"> <FaEye />24.34k</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}

            </div >
            <div className="flex justify-center mt-5">
                <Paginations pageCount={response.pageCount} handlePageClick={handleChangePag} />
            </div>
        </>
    )
}

export default BlogList