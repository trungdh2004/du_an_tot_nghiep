import { Dialog } from '@/components/ui/dialog';
import { getBlogDetail } from '@/service/blog';
import { DialogContent } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { FaRegComment } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { Remarkable } from "remarkable";

const BlogDetail = () => {
    const { id } = useParams()
    const { data: blog } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            try {
                const { data } = await getBlogDetail(id as string);
                return data.data
            } catch (error) {
                console.log(error)
            }
        }
    })
    const md = new Remarkable({
        html: true,        // Cho phép HTML bên trong Markdown
        xhtmlOut: false,    // Xuất ra HTML với các tag tự đóng
        breaks: false,      // Tự động ngắt dòng thành <br>
        langPrefix: 'language-',  // Tiền tố cho class của các khối code
        linkify: true,      // Tự động chuyển đổi URL thành liên kết
        typographer: true,  // Thay thế các ký tự đặc biệt như quotes, dashes thành kiểu typographic
    });
    const markdownContent = blog?.content;
    const htmlContent = md.render(markdownContent as any);
    return (
        <div className="padding mx-auto py-12">
            <div className="flex  gap-5 w-full  ">
                <div className="w-[200px] hidden lg:block pl-5">
                    <h3 className="text-base pb-2 font-medium hidden lg:block">{blog?.user_id?.full_name}</h3>
                    <div className="flex  gap-6 pt-2 border-t border-gray-300">
                        <div className="flex items-center gap-2 text-[#757575] ">
                            <span><FaRegHeart size={20} /></span>
                            <span className='text-lg font-medium'>{blog?.countLike}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#757575]">
                            <span><FaRegComment size={20} /></span>
                            <span className='text-lg font-medium'>{blog?.countLike}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1000px] mx-auto ">
                    <h3 className="text-xl md:text-2xl md:font-bold text-[#222222] ">{blog?.title}</h3>
                    {/* user-information */}
                    <div className="flex my-[30px] justify-between items-center">
                        {/*  */}
                        <div className="flex items-center gap-5">
                            <div className="border border-slate-900 w-[50px] h-[50px] rounded-full overflow-hidden">
                                <img src={blog?.user_id?.avatarUrl || ""}
                                    className='w-full h-full object-cover' alt="" />
                            </div>
                            <div className="flex-row">
                                <h3 className="text-[#292929] text-base font-medium ">{blog?.user_id?.full_name}</h3>
                                <p className='text-[#757575] text-sm'>{blog && format(blog?.published_at || blog?.createdAt || "", "dd-MM-yyyy") || ""}</p>
                            </div>
                        </div>

                    </div>
                    {/* blog-content */}
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    {/* Related-blog */}
                    <div className="mt-10">
                        <hr />
                    </div>
                    <div className="flex  gap-6 pt-3 text-[#757575]">
                        <div className="flex items-center gap-2 ">
                            <span><FaRegHeart size={20} /></span>
                            <span className='text-lg font-medium'>{blog?.countLike}</span>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <span><FaRegComment size={20} /></span>
                            <span className='text-lg font-medium'>{blog?.countLike}</span>
                        </div>
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
    )
}

export default BlogDetail