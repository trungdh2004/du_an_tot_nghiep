import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";

const BlogDetail = () => {
    return (
        <>
            <div className="w-[700px] mx-auto">
                {/* title */}
                <h3 className="text-3xl font-bold text-[#222222] mt-5">Config Zsh bằng Oh-my-zsh và P10k trên WSL cực ngầu </h3>
                {/* user-information */}
                <div className="flex my-[30px] justify-between items-center">
                    {/*  */}
                    <div className="flex items-center gap-5">
                        <div className="">
                            <img src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_1.jpg"
                                className='w-[50px] h-[50px]   rounded-full' alt="" />
                        </div>
                        <div className="flex-row">
                            <h3 className="text-[#292929] text-base font-medium ">Nguyễn Tuấn Đức</h3>
                            <p className='text-[#757575] text-sm'>một tháng trước</p>
                        </div>
                    </div>
                    <div className="">

                        <DropdownMenu >
                            <DropdownMenuTrigger><SlOptions /></DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                {/* <DropdownMenuLabel>Xóa</DropdownMenuLabel>
                                    <DropdownMenuSeparator /> */}
                                <DropdownMenuItem >Xóa</DropdownMenuItem>
                                <DropdownMenuItem>Sửa</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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