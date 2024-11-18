import { pagingBlogs } from "@/service/blog";
import { IBlogs } from "@/types/blogs";
import { useQuery } from "@tanstack/react-query";
import { FaCommentDots, FaEye, FaRegHeart } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LatestNewsBlog = () => {
	const {data:newBlogs} = useQuery({
		queryKey:["listBlogHome"],
		queryFn: async () => {
			try {
				const { data } = await pagingBlogs({
					pageSize: 4,
					pageIndex: 1,
					fieldSort: "published_at",
					sort: -1,
					keyword: "",
				});

				return data?.content || []
			} catch (error) {
				return []
			}
		}
	})

	return (
		<div className="my-20 padding">
			<div className="flex items-center justify-between w-full">
				<div className="flex-1 text-header">Thông tin mới tại NUCSHOP</div>
			</div>
			<div className="grid grid-cols-12 min-h-[360px] gap-6 xl:gap-8 my-5">
				{newBlogs?.length ? (
					newBlogs?.map((item: IBlogs, index: number) => (
						<>
							<div
								key={index}
								className="col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-3 h-[360px] "
							>
								<div className="h-[350px] grid grid-rows-2 border rounded-xl overflow-hidden relative">
									{/* card-head */}

									<div className="bg-gray-200 border-b border-gray-300 ">
										<img
											src={item.thumbnail_url || "/no-image.png"}
											className="object-cover w-full h-full"
											alt=""
										/>
									</div>
									{/* card-content */}
									<div className="px-4 pt-2 bg-white">
										<div className="flex items-center gap-1 pb-2">
											<img
												src={item.user_id.avatarUrl || "/avatar_25.jpg"}
												className="w-[40px] h-[40px] border-[3px] border-white rounded-full"
												alt=""
											/>
											<div className="">
												<h3 className="text-sm font-medium">
													{item.user_id.full_name}
												</h3>
												{/* <p className="text-xs text-[#212B36] opacity-50 ">{format(item.published_at || item.createdAt || "", "dd-MM-yyyy")}</p> */}
											</div>
										</div>
										<div className="flex items-center justify-between ">
											<Link
												to={`/blogDetail/${item._id}`}
												className="line-clamp-1 text-[#212B36] text-[18px] font-semibold hover:underline transition-all duration-300"
											>
												{item.title || "Bài viết chưa có tiêu đề"}
											</Link>
										</div>
										<p className="pt-1 text-xs text-gray-400 line-clamp-2">
											{item.meta_description}
										</p>
										<div className="flex space-x-4 min-[900px]:space-x-1 xl:space-x-4 absolute bottom-4 right-4">
											<div className="flex gap-3">
												<span className="text-[#212B36] text-xs flex items-center gap-1">
													<FaRegHeart size={16} />
													{item.countLike}
												</span>
												<span className="text-[#212B36] text-xs flex items-center gap-1">
													<FaCommentDots size={16} />
													{item.comments_count}
												</span>
												<span className="text-[#212B36] text-xs flex items-center gap-1">
													{" "}
													<FaEye size={16} />
													{item.views_count}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					))
				) : (
					<div className="flex items-center justify-center w-full h-full col-span-12 mt-0 mt-10">
						<h3 className=" text-lg text-[#1A1E26]">Chưa có bài viết nào.</h3>
					</div>
				)}
			</div>

			<div className="text-center ">
				<Link to={"/blogs"} className="inline-flex items-center justify-center gap-2 group">
					<span className="font-medium text-gray-500">Xem thêm</span>

					<span className="duration-200 group-hover:translate-x-4">
						<FaAnglesRight size={16} className="text-gray-300" />
					</span>
				</Link>
			</div>
		</div>
	);
};

export default LatestNewsBlog;
