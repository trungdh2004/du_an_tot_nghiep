import { pagingBlogs } from "@/service/blog";
import { IBlogs } from "@/types/blogs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Remarkable } from "remarkable";
const BlogNews = () => {
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
	});
  const md = new Remarkable({
		html: true, // Cho phép HTML bên trong Markdown
		xhtmlOut: false, // Xuất ra HTML với các tag tự đóng
		breaks: false, // Tự động ngắt dòng thành <br>
		langPrefix: "language-", // Tiền tố cho class của các khối code
		linkify: true, // Tự động chuyển đổi URL thành liên kết
		typographer: true, // Thay thế các ký tự đặc biệt như quotes, dashes thành kiểu typographic
	});
	const markdownContent = newBlogs?.[0]?.content;
	const htmlContent = md.render(markdownContent as any);
  return (
   <div className="padding">
    <h2 className="mb-5 text-header">Thông tin mới tại NUCSHOP</h2>
      <div className="flex flex-wrap gap-5 mb-16 space-x-0 md:flex-nowrap ">
      <div className="relative block w-full p-4 mb-4 rounded lg:mb-0 lg:p-0 md:w-2/3" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 16px"}}>
        <img
          src={newBlogs?.[0]?.thumbnail_url}
          className="object-cover w-full h-64 rounded-md"
        />
        <div className="p-2.5">
          <span className="hidden mt-4 text-sm text-green-700 md:block">
            {" "}
            Technology{" "}
          </span>
          <h1 className="mt-2 mb-2 text-4xl font-bold leading-tight text-gray-800">
          {newBlogs?.[0]?.meta_title}
          </h1>
          <p className="mb-2.5 text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: htmlContent?.replace(/<img[^>]*>/g, "") }}>
          </p>
          <Link 
            to="#"
            className="inline-block px-6 py-3 mt-1 text-gray-100 bg-blue-700 rounded-md"
          >
            Đọc thêm
          </Link>
        </div>
      </div>
      <div className="flex-1 w-full space-y-5">
        {newBlogs?.map((blog:IBlogs,index:number) =>{
          if(index === 0){
            return null
          }
          return <div key={blog?._id} className="flex flex-col h-[calc(100%_/_3_-14px)] w-full  rounded md:flex-row" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 16px"}}>
          <img
            src={blog?.thumbnail_url}
            className="block h-64 m-4 rounded-md md:hidden lg:block md:h-[154.98px] md:m-0"
          />
          <div className="w-full px-4 py-2 bg-white rounded">
            <span className="hidden text-sm text-green-700 md:block">
              {" "}
              Gadgets{" "}
            </span>
            <div className="mb-2 text-xl font-semibold text-gray-800 md:mt-0">
            {blog?.meta_title}
            </div>
            <p className="block p-2 pt-1 pl-0 text-sm text-gray-600 md:hidden">
            {blog?.meta_description}
            </p>
          </div>
        </div>
        })}
  
      </div>
    </div>
   </div>
  )
}

export default BlogNews