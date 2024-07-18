import { TooltipComponent } from "@/components/common/TooltipComponent";
import { showBlogsEdit } from "@/service/blog";
import { useEffect, useState } from "react";
import { LuFileEdit } from "react-icons/lu";
import { useParams } from "react-router-dom";
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

const BlogDetail = () => {
    const [blog, setBlog] = useState<IBlog>();
    const [user, setUser] = useState();
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            const { data } = await showBlogsEdit(id as string);
            console.log('blog', data.data)
            setBlog(data.data)
        })()
    }, [id])

    // console.log(blog?.published_at)
    // const pareDate = parseISO(blog.published_at)
    // const formattedDate = format(pareDate, "dd/MM/yyyy");
    return (
        <>
            <div className="w-[900px] mx-auto">
                {/* title */}
                <h3 className="text-3xl font-bold text-[#222222] mt-5">{blog?.title}</h3>
                {/* user-information */}
                <div className="flex my-[30px] justify-between items-center">
                    {/*  */}
                    <div className="flex items-center gap-5">
                        <div className="border border-slate-900 w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img src={blog?.user?.avatarUrl}
                                className='w-full h-full object-cover  ' alt="" />
                        </div>
                        <div className="flex-row">
                            <h3 className="text-[#292929] text-base font-medium ">{blog?.user?.full_name}</h3>
                            <p className='text-[#757575] text-sm'>{blog?.published_at}</p>
                        </div>
                    </div>
                    <div className="">
                        <TooltipComponent label="Chỉnh sửa bài viết" >
                            <div className=" cursor-pointer"><LuFileEdit size={20} /></div>
                        </TooltipComponent>
                    </div>
                </div>
                {/* blog-content */}
                <div className="">
                    <p className="">Xin chào mọi người và anh Sơn. Em tên là Lý Cao Nguyên Vào năm 2022 em có vô tình lướt thấy những video dạy học của anh trên Youtube,
                        vì niềm đam mê với lập trình em đã chuyển từ Scratch, Pascal, Python sang học HTML, CSS, JavaScrip khoá cơ bản của anh. Càng học em thấy càng hay và em đã tạo ra được dự án đầu tay của mình là Website hỗ trợ học tốt Ngữ văn "Conquer Literature" (frontend).</p>
                    <img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/10657/665daf9a949fd.png" alt="" />
                </div>
                {/* Related-blog */}
                <div className="mt-10">
                    <h3 className="text-sm text-[#757575] uppercase">Xem cái bài viết theo chủ đề</h3>
                    <div className="flex">
                        #tag
                    </div>
                </div>

            </div>
        </>
    )
}

export default BlogDetail