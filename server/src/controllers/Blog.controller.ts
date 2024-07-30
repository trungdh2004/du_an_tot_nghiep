import { Response } from "express";
import { RequestModel } from "../interface/models";
import STATUS from "../utils/status";
import BlogsModel from "../models/Blogs.schema";
import { BlogValidation } from "../validation/blog.validation";
import { truncateSentence, trunTextHtmlConvers } from "../utils/cutText";
import { formatDataPaging } from "../common/pagingData";
import TagsModel from "../models/Tags.schema";

class BlogController {
  async postBlogs(req: RequestModel, res: Response) {
    try {
      const user = req.user;

      if (!user?.id) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập",
        });
      }

      const newPos = await BlogsModel.create({
        user_id: user.id,
        ...req.body,
      });

      return res.status(STATUS.OK).json(newPos);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error?.message,
      });
    }
  }

  async putBlogs(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { id } = req.params;
      if (!user?.id) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập",
        });
      }
      if (!id) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa chọn blogs",
        });
      }

      const { content, title, thumbnail_url, selected_tags, published_at } =
        req.body;

      const existingBlog = await BlogsModel.findById(id);

      if (!existingBlog) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có bài blog nào",
        });
      }
      const meta_title = truncateSentence(title, 30) || "";
      const meta_description = trunTextHtmlConvers(content, 70) || "";
      const newPos = await BlogsModel.findByIdAndUpdate(
        existingBlog?._id,
        {
          content,
          title,
          thumbnail_url,
          selected_tags,
          published_at,
          meta_title,
          meta_description,
        },
        { new: true }
      );
      return res.status(STATUS.OK).json(newPos);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error?.message,
      });
    }
  }

  async showForEdit(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { id } = req.params;
      if (!user?.id) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập",
        });
      }
      if (!id) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa chọn blogs",
        });
      }

      const existingBlog = await BlogsModel.findById(id).populate(
        "selected_tags"
      );

      if (!existingBlog) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có bài blog nào",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy bài viết thành công",
        data: existingBlog,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error?.message,
      });
    }
  }

  async publish(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { id } = req.params;
      if (!user?.id) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập",
        });
      }
      if (!id) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa chọn blogs",
        });
      }

      const { error } = BlogValidation.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }

      const { title, content, thumbnail_url, tags } = req.body;

      const meta_title = truncateSentence(title, 30);
      const meta_description = truncateSentence(content, 50);

      const existingBlog = await BlogsModel.findById(id);

      if (!existingBlog) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có bài blog nào",
        });
      }

      const newBlog = await BlogsModel.findOneAndUpdate(
        existingBlog._id,
        {
          published_at: new Date(),
          isPublish: true,
          content,
          title,
          meta_title,
          meta_description,
          thumbnail_url: thumbnail_url,
          selected_tags: tags || [],
        },
        { new: true }
      );

      return res.status(STATUS.OK).json({
        message: "Đăng bài viết thành công",
        data: newBlog,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error?.message,
      });
    }
  }
  async pagingBlog(req: RequestModel, res: Response) {
    try {
      const {
        keyword,
        sort = -1,
        pageSize,
        pageIndex,
        tab = 1,
        tags
      } = req.body;

      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;
      let queryKeyword = keyword
        ? {
            name: {
              $regex: keyword,
              $options: "i",
            },
          }
        : {};
      let querySort = {};
      let queryTab = {}
      let queryTags = {}

      if(tab === 2) {
        queryTab = {
          isPublish:false
        }

        querySort= {
          createdAt:sort
        }
      }else {
        queryTab = {
          isPublish:true
        }
        querySort = {
          published_at:sort
        }
      }
      console.log("tags:",tags);
      
      if(tags) {
        const select = await TagsModel.findOne({
          slug:tags
        })

        queryTags = {
          selected_tags:{
           $in:select?._id
          }
        }
      }

      const listBlogs = await BlogsModel.find({
        ...queryKeyword,
        ...queryTab,
        ...queryTags
      })
        .sort(querySort)
        .skip(skip)
        .limit(limit)
        .populate([
          {
            path:"user_id",
            select:"_id full_name email avatarUrl"
          },
          "selected_tags"
        ])
        .exec();

      const countBlogs = await BlogsModel.countDocuments({
        ...queryKeyword,
        ...queryTab,
        ...queryTags
      });


      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listBlogs,
        count: countBlogs,
      });

      return res.status(STATUS.OK).json(data);
    } catch (error) {
      return res.status(STATUS.INTERNAL).json({ error: error });
    }
  }

  async getBlogById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn bài viết",
        });

      const existingBlog = await BlogsModel.findById(id).populate([
        {
          path: "user_id",
          model: "User",
          select: {
            _id: 1,
            full_name: 1,
            email: 1,
            avatarUrl: 1,
          },
        },
        {
          path: "selected_tags",
          model: "Tags",
        },
      ]);

      if (!existingBlog)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có bài viết nào",
        });

      return res.status(STATUS.OK).json({
        message: "Lấy thành công",
        data: existingBlog,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error?.message,
      });
    }
  }

  async pagingBlogMyUser(req: RequestModel, res: Response) {
    try {
      const {
        keyword,
        sort = -1,
        pageSize,
        pageIndex,
        tab = 1,
        tags
      } = req.body;
      const user = req.user

      if(!user?.id) return res.status(STATUS.BAD_REQUEST).json({
        message:"Bạn chưa đăng nhập"
      }) 
      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;
      let queryKeyword = keyword
        ? {
            name: {
              $regex: keyword,
              $options: "i",
            },
          }
        : {};
      let querySort = {};
      let queryTab = {}
      let queryTags = {}

      if(tab === 2) {
        queryTab = {
          isPublish:false
        }

        querySort= {
          createdAt:sort
        }
      }else {
        queryTab = {
          isPublish:true
        }
        querySort = {
          published_at:sort
        }
      }
      console.log("tags:",tags);
      
      if(tags) {
        const select = await TagsModel.findOne({
          slug:tags
        })

        queryTags = {
          selected_tags:{
           $in:select?._id
          }
        }
      }

      const listBlogs = await BlogsModel.find({
        ...queryKeyword,
        ...queryTab,
        ...queryTags,
        user_id:user.id
      })
        .sort(querySort)
        .skip(skip)
        .limit(limit)
        .populate([
          {
            path:"user_id",
            select:"_id full_name email avatarUrl"
          },
          "selected_tags"
        ])
        .exec();

      const countBlogs = await BlogsModel.countDocuments({
        ...queryKeyword,
        ...queryTab,
        ...queryTags,
        user_id:user.id
      });


      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listBlogs,
        count: countBlogs,
      });

      return res.status(STATUS.OK).json(data);
    } catch (error) {
      return res.status(STATUS.INTERNAL).json({ error: error });
    }
  }

  async deleteGetById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn bài viết",
        });

      const existingBlog = await BlogsModel.findById(id);

      if (!existingBlog)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có bài viết nào",
        });

      await BlogsModel.findByIdAndDelete(id);

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
        data: existingBlog,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error?.message,
      });
    }
  }
}

export default new BlogController();