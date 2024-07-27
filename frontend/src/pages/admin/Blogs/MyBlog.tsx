import Paginations from '@/components/common/Pagination';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import instance from '@/config/instance';
import { SearchObjectBlog, SearchObjectType } from '@/types/searchObjecTypes';
import { typeResponse } from '@/types/typeReponse';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { FaCommentDots, FaEye } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';
import { MdOutlinePublic, MdOutlinePublicOff } from 'react-icons/md';
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { useDebounceCallback } from 'usehooks-ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { publishBlogs } from '@/service/blog';
import DialogConfirm from '@/components/common/DialogConfirm';
import { toast } from 'sonner';

type IBlog = {
    _id?: string,
    title: string,
    content: string,
    isDeleted: string,
    createdAt: string,
    published_at: string,
    isPublish: boolean,
    user: {
        avatarUrl?: string,
        email: string,
        _id: string,
        full_name: string,
    },
    views_count: number,
    comments_count: number,
    thumbnail_url?: string,
    meta_description: string,
}

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [response, setResponse] = useState<typeResponse>({
        pageCount: 0,
        totalElement: 0,
        totalOptionPage: 0,
    })
    const [searchObject, setSearchObject] = useState<SearchObjectBlog>({
        pageIndex: 1,
        pageSize: 9,
        keyword: "",
        fieldSort: "",
        sort: 1,
        tab: 1,
    });
    const handleBlog = async () => {
        try {
            const { data } = await instance.post(`/blogs/pagingBlogUser`, searchObject);
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
    // const handleChangePageSize = (value: number) => {
    //     setSearchObject((prev) => ({
    //         ...prev,
    //         pageSize: value,
    //         pageIndex: 1,
    //     }));
    // };
    const [isPublish, setIsPublish] = useState<string | boolean>(false);
    const handleChangePag = (value: any) => {
        console.log("value change page", value);
        setSearchObject((prev) => ({
            ...prev,
            pageIndex: value.selected + 1,
        }));
    }
    const debounced = useDebounceCallback((inputValue: string) => {
        setSearchObject((prev) => ({
            ...prev,
            pageIndex: 1,
            keyword: inputValue,
        }));
    }, 300);
    return (
        <>
            <div className="">
                <div className="flex flex-col gap-3 mb-5">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold">Bài viết của tôi</h3>
                        <Link to="/admin/blogs/new-blog"
                            className='text-white bg-slate-900 px-5 py-[8px] rounded-xl border border-slate-900 hover:bg-white hover:text-black hover:border hover:border-slate-900 transition-all duration-300'>
                            Bài viết mới
                        </Link>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                        <div className=" w-[40%]">
                            <Input
                                placeholder="Tìm kiếm bài viết"
                                className="w-[100%] md:text-base text-xs"
                                onChange={(event) => debounced(event.target.value)}
                            />
                        </div>
                        <div className="">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="cursor-pointer">
                                        <IoFilter size={20} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[180px]" align="end">
                                    <DropdownMenuLabel>Phân loại bài viết</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        className="cursor-pointer"
                                        value={`${searchObject.fieldSort}`}
                                        onValueChange={(e) => {
                                            setSearchObject((prev) => ({
                                                ...prev,
                                                pageIndex: 1,
                                                fieldSort: e,
                                            }));
                                        }}
                                    >
                                        <DropdownMenuRadioItem
                                            value=""
                                            className="cursor-pointer"
                                        >
                                            Bài viết đã hiển thị
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                            value=""
                                            className="cursor-pointer"
                                        >
                                            Bài viết chưa hiển thị
                                        </DropdownMenuRadioItem>

                                        <DropdownMenuRadioItem
                                            value=""
                                            className="cursor-pointer"
                                        >
                                            Bài viết của tôi
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>


                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs value={`${searchObject.tab}`} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="1"
                        onClick={() => setSearchObject((prev) => ({ ...prev, tab: 1 }))}

                    >
                        Bài viết đã đăng tải
                    </TabsTrigger>
                    <TabsTrigger
                        value="2"
                        onClick={() => setSearchObject((prev) => ({ ...prev, tab: 2 }))}

                    >
                        Bài viết chưa đăng tải
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-12 gap-6 xl:gap-8 mt-10">
                {blogs.map((item: IBlog, index: number) => (
                    <>
                        <div key={index} className="col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-4 h-[360px] " >
                            <div className="h-[350px] grid grid-rows-2 border rounded-xl overflow-hidden relative" >
                                {/* card-head */}

                                <div className="absolute z-10 top-4 right-2">
                                    <DropdownMenu >
                                        <DropdownMenuTrigger asChild>
                                            <div className='cursor-pointer'>
                                                <SlOptionsVertical size={20} color='white' />
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='min-w-[10px] cursor-pointer' align='end'>
                                            <DropdownMenuItem className='cursor-pointer'><Link className='w-full' to={`/admin/blogs/${item._id}/edit`}>Sửa</Link></DropdownMenuItem>
                                            <DropdownMenuItem className='cursor-pointer ' >Xóa</DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="h1/2 bg-gray-200 border-b border-gray-300">
                                    <img src={item.thumbnail_url || "/no-image.png"} className='w-full h-full object-cover' alt="" />
                                    <div className="-mt-5 pl-5">
                                        <img src={item.user.avatarUrl} className='w-[40px] h-[40px] border-[3px] border-white rounded-full' alt="" />
                                    </div>
                                </div>
                                {/* card-content */}
                                <div className="h1/2 p-5">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs text-[#212B36] opacity-50 pt-1 pb-2">{format(item.published_at || item.createdAt || "", "dd-MM-yyyy")}</p>
                                        <div className="" >
                                            <span className=""> {item.isPublish ? <MdOutlinePublic size={22} className='text-blue-500' /> : <MdOutlinePublicOff size={22} />}</span>
                                        </div>
                                    </div>
                                    <Link to={`/admin/blogs/${item._id}`} className=" line-clamp-1 text-[#212B36] text-base font-semibold hover:underline transition-all duration-300">{item.title || "Bài viết chưa có tiêu đề"}</Link>
                                    <p className="text-xs pt-2 text-gray-400 line-clamp-2">{item.meta_description}</p>
                                    <div className="flex space-x-4 min-[900px]:space-x-1 xl:space-x-4 absolute bottom-5 right-4">
                                        <span className="text-[#212B36] text-xs flex items-center gap-1"><FaCommentDots />{item.comments_count}</span>
                                        <span className="text-[#212B36] text-xs flex items-center gap-1"> <FaEye />{item.views_count}</span>
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

export default MyBlogs