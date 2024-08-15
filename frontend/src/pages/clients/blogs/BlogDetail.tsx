import { Dialog } from "@/components/ui/dialog";
import { getBlogDetailClient } from "@/service/blog";
import { DialogContent } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { Remarkable } from "remarkable";

const BlogDetail = () => {
	const { id } = useParams();
	const { data: blog } = useQuery({
		queryKey: ["blogDetail", id],
		queryFn: async () => {
			try {
				const { data } = await getBlogDetailClient(id as string);
				return data;
			} catch (error) {
				console.log(error);
			}
		},
	});
	const md = new Remarkable({
		html: true, // Cho phép HTML bên trong Markdown
		xhtmlOut: false, // Xuất ra HTML với các tag tự đóng
		breaks: false, // Tự động ngắt dòng thành <br>
		langPrefix: "language-", // Tiền tố cho class của các khối code
		linkify: true, // Tự động chuyển đổi URL thành liên kết
		typographer: true, // Thay thế các ký tự đặc biệt như quotes, dashes thành kiểu typographic
	});
	const markdownContent = blog?.data?.content;
	const htmlContent = md.render(markdownContent as any);
	return (
		<div className="padding mx-auto py-12">
			<div className="grid grid-cols-12 gap-5 w-full  ">
				<div className="col-span-3 hidden lg:block pr-5">
					<h3 className="text-base pb-2 font-medium hidden lg:block">
						{blog?.data?.user_id?.full_name}
					</h3>
					<div className="flex  gap-6 pt-2 border-t border-gray-300">
						<div className="flex items-center gap-2 text-[#757575] ">
							<span>
								<FaRegHeart size={20} />
							</span>
							<span className="text-lg font-medium">
								{blog?.data?.countLike}
							</span>
						</div>
						<div className="flex items-center gap-2 text-[#757575]">
							<span>
								<FaRegComment size={20} />
							</span>
							<span className="text-lg font-medium">
								{blog?.data?.countLike}
							</span>
						</div>
					</div>
				</div>

				<div className="col-span-12 lg:col-span-6 ">
					<h3 className="text-xl md:text-2xl md:font-bold text-[#222222] ">
						{blog?.data?.title}
					</h3>
					{/* user-information */}
					<div className="flex my-[30px] justify-between items-center">
						{/*  */}
						<div className="flex items-center gap-5">
							<div className="border border-slate-900 w-[50px] h-[50px] rounded-full overflow-hidden">
								<img
									src={blog?.data?.user_id?.avatarUrl || "/avatar_25.jpg"}
									className="w-full h-full object-cover"
									alt=""
								/>
							</div>
							<div className="flex-row">
								<h3 className="text-[#292929] text-base font-medium ">
									{blog?.data?.user_id?.full_name}
								</h3>
								<p className="text-[#757575] text-sm">
									{(blog?.data &&
										format(
											blog?.data?.published_at || blog?.data?.createdAt || "",
											"dd-MM-yyyy",
										)) ||
										""}
								</p>
							</div>
						</div>
					</div>
					{/* blog?.data-content */}
					<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
					{/* Related-blog?.data */}
					<div className="mt-10">
						<hr />
					</div>
					<div className="flex  gap-6 pt-3 text-[#757575]">
						<div className="flex items-center gap-2 ">
							<span>
								<FaRegHeart size={20} />
							</span>
							<span className="text-lg font-medium">
								{blog?.data?.countLike}
							</span>
						</div>
						<div className="flex items-center gap-2 ">
							<span>
								<FaRegComment size={20} />
							</span>
							<span className="text-lg font-medium">
								{blog?.data?.countLike}
							</span>
						</div>
					</div>
				</div>

				<div className="col-span-12 lg:col-span-3">
					<h3 className="text-base pb-2 font-medium mt-4 lg:mt-0 border-b border-gray-300">
						Bài viết khác
					</h3>
					<div className="gap-6 mt-2 ">
						{blog?.orther &&
							blog?.orther?.map((item: IBlog) => (
								<Link to={`/blogDetail/${item._id}`}>
									<div className="border rounded-md w-full p-2 flex hover:shadow mt-2">
										<div className="w-20 h-20   overflow-hidden">
											<img
												src={item?.thumbnail_url || "/avatar_25.jpg"}
												alt=""
												className="w-full h-full border rounded-sm object-cover"
											/>
										</div>
										<div className="flex-1 pl-2 flex flex-col justify-between ">
											<div>
												<h3 className="line-clamp-1 leading-4 font-medium">
													{item?.meta_title}
												</h3>
												<p className="text-sm text-gray-400 line-clamp-2 leading-4 mt-1">
													{item?.meta_description}
												</p>
											</div>
											<div className="flex items-end">
												<img
													src={item.user_id.avatarUrl || "/avatar_25.jpg"}
													alt=""
													className="w-6 h-6 border rounded-full"
												/>
												<span className="text-xs pl-2">
													{item.user_id.full_name}
												</span>
											</div>
										</div>
									</div>
								</Link>
							))}
					</div>
				</div>
			</div>
			<div className="">
				<Dialog>
					<DialogContent className="sm:max-w-[425px]">
						dâdadadadadada
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default BlogDetail;
