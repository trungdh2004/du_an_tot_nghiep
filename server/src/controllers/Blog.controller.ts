import { Response } from "express";
import { RequestModel } from "../interface/models";
import STATUS from "../utils/status";
import BlogsModel from "../models/Blogs.schema";


class BlogController {
    async postBlogs(req:RequestModel,res:Response) {
        try {
            const user = req.user

            if (!user?.id) {
                return res.status(STATUS.AUTHENTICATOR).json({
                    message:"Bạn chưa đăng nhập"
                })
            }

            const newPos = await BlogsModel.create({
                user_id: user.id,
                ...req.body
            })

            return res.status(STATUS.OK).json(newPos)
        } catch (error:any) {
            return res.status(STATUS.INTERNAL).json({
                message: error?.message
            })
        }
    }


    async putBlogs(req:RequestModel,res:Response) {
        try {
            const user = req.user
            const {id} = req.params
            if (!user?.id) {
                return res.status(STATUS.AUTHENTICATOR).json({
                    message:"Bạn chưa đăng nhập"
                })
            }
            if (!id) {
                return res.status(STATUS.AUTHENTICATOR).json({
                    message:"Bạn chưa chọn blogs"
                })
            }

            const {content,title,thumbnail_url} = req.body

            const existingBlog = await BlogsModel.findById(id)

            if (!existingBlog) { 
                return res.status(STATUS.BAD_REQUEST).json({
                    message:"Không có bài blog nào"
                })
            }
            const newPos = await BlogsModel.findByIdAndUpdate(existingBlog?._id, {
                content,
                title,
                thumbnail_url
            },{new :true})
            return res.status(STATUS.OK).json(newPos)
        } catch (error:any) {
            return res.status(STATUS.INTERNAL).json({
                message: error?.message
            })
        }
    }


    async showForEdit(req:RequestModel,res:Response) {
        try {
            const user = req.user
            const {id} = req.params
            if (!user?.id) {
                return res.status(STATUS.AUTHENTICATOR).json({
                    message:"Bạn chưa đăng nhập"
                })
            }
            if (!id) {
                return res.status(STATUS.AUTHENTICATOR).json({
                    message:"Bạn chưa chọn blogs"
                })
            }

            const existingBlog = await BlogsModel.findById(id)

            if (!existingBlog) { 
                return res.status(STATUS.BAD_REQUEST).json({
                    message:"Không có bài blog nào"
                })
            }


            return res.status(STATUS.OK).json({
                message:"Lấy bài viết thành công",
                data:existingBlog
            })
        } catch (error:any) {
            return res.status(STATUS.INTERNAL).json({
                message: error?.message
            })
        }
    }
}

export default new BlogController();