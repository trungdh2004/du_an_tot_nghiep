import Paginations from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { getBlogPaging } from '@/service/blog';
import { getAllTags } from '@/service/tags-admin';
import { SearchObjectBlog } from '@/types/searchObjecTypes';
import { typeResponse } from '@/types/typeReponse';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaCommentDots, FaEye, FaRegHeart } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
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
    countLike: number,
    comments_count: number,
    thumbnail_url?: string,
    meta_description: string,
}

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries())
    console.log(paramsObject)

    const [searchObject, setSearchObject] = useState<SearchObjectBlog>({
        pageIndex: 1,
        pageSize: 6,
        keyword: "",
        fieldSort: "",
        sort: 1,
        tab: 1,
        tags: searchParams.get("tags") || ""
    });

    const [response, setResponse] = useState<typeResponse>({
        pageCount: 0,
        totalElement: 0,
        totalOptionPage: 0,
    })
    const queryClient = useQueryClient();
    const { data: blogs, isLoading, isError } = useQuery({
        queryKey: ['blogs', searchObject],
        queryFn: async () => {
            try {
                const { data } = await getBlogPaging(searchObject);
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        placeholderData: keepPreviousData,
    });
    const { data: tags } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            try {
                const { data } = await getAllTags();
                console.log(data)
                return data.data;
            } catch (error) {
                console.log(error);
            }
        }
    })

    const handleChangePag = async (value: any) => {
        console.log("value", value);
        try {
            setSearchObject((prev) => ({
                ...prev,
                pageIndex: value.selected + 1,
            }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* {isLoading && (
                <div className='absolute w-screen h-screen z-[1000] bg-red-400/20'></div>
            )} */}
            <div className="padding py-7">
                <div className="mb-3">
                    <h3 className="text-xl font-semibold">Danh sách bài viết</h3>
                </div>
                <div className="">
                    <div className="space-x-2">
                        {tags && tags.map((tag: any, index: number) => {
                            return (
                                <Button onClick={() => {
                                    searchParams.set("tags", tag.slug)
                                    setSearchParams(searchParams)
                                }} variant="outline" className="">{tag.name}</Button>
                            )
                        })}
                    </div>
                </div>
                {/* blogs-lít */}
                <div className="grid grid-cols-12 gap-6 xl:gap-8 my-5">
                    {blogs && blogs?.content?.map((item: IBlog, index: number) => (
                        <>
                            <div key={index} className="col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-3 h-[360px] " >
                                <div className="h-[350px] grid grid-rows-2 border rounded-xl overflow-hidden relative" >
                                    {/* card-head */}

                                    <div className=" bg-gray-200 border-b border-gray-300">
                                        <img src={item.thumbnail_url || "/no-image.png"} className='w-full h-full object-cover' alt="" />
                                    </div>
                                    {/* card-content */}
                                    <div className="px-4 pt-2">
                                        <div className="flex items-center gap-1 pb-2">
                                            <img src={item.user.avatarUrl} className='w-[40px] h-[40px] border-[3px] border-white rounded-full' alt="" />
                                            <div className="">
                                                <h3 className="text-sm font-medium">{item.user.full_name}</h3>
                                                {/* <p className="text-xs text-[#212B36] opacity-50 ">{format(item.published_at || item.createdAt || "", "dd-MM-yyyy")}</p> */}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Link to={`/admin/blogs/${item._id}`} className="line-clamp-1 text-[#212B36] text-[18px] font-semibold hover:underline transition-all duration-300">{item.title || "Bài viết chưa có tiêu đề"}</Link>
                                        </div>
                                        <p className="text-xs pt-1 text-gray-400 line-clamp-2">{item.meta_description}</p>
                                        <div className="flex space-x-4 min-[900px]:space-x-1 xl:space-x-4 absolute bottom-4 right-4">

                                            <div className="flex gap-3">
                                                <span className="text-[#212B36] text-xs flex items-center gap-1"><FaRegHeart size={16} />{item.countLike}</span>
                                                <span className="text-[#212B36] text-xs flex items-center gap-1"><FaCommentDots size={16} />{item.comments_count}</span>
                                                <span className="text-[#212B36] text-xs flex items-center gap-1"> <FaEye size={16} />{item.views_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div >
                <div className="flex justify-center mt-5">
                    <Paginations pageCount={blogs?.totalPage} handlePageClick={handleChangePag} />
                </div>
            </div>
            {/* tags-;íst */}


        </>
    )
}

export default BlogPage