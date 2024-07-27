import { Response } from "express";
import { RequestModel } from "../interface/models";
import STATUS from "../utils/status";
import BlogsModel from "../models/Blogs.schema";
import { BlogValidation } from "../validation/blog.validation";
import { truncateSentence, trunTextHtmlConvers } from "../utils/cutText";
import { formatDataPaging } from "../common/pagingData";

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
        sort,
        fieldSort,
        published_at,
        tags,
        pageSize,
        pageIndex,
        tab = 1,
      } = req.body;

      const user = req.user;
      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;

      let pipeline: any[] = [];
      // search
      if (keyword) {
        pipeline.push({
          $match: {
            title: { $regex: keyword, $options: "i" },
          },
        });
      }

      pipeline.push({
        $lookup: {
          from: "users", // Collection to join
          localField: "user_id", // Field from the input documents
          foreignField: "_id",
          as: "user", // Field from the documents of the "from" collection
        },
      });

      pipeline.push({
        $lookup: {
          from: "tags", // Collection to join
          localField: "selected_tags", // Field from the input documents
          foreignField: "_id", // Field from the documents of the "from" collection
          as: "selected_tags", // Output array field
        },
      });

      // skip
      // pipeline.push({ $skip: skip }, { $limit: limit });
      // sắp xếp
      // if (fieldSort) {
      //   pipeline.push({
      //     $sort: { [fieldSort]: sort },
      //   });
      // } else {
      //   pipeline.push({
      //     $sort: { published_at: sort },
      //   });
      // }

      if (tab === 1) {
        pipeline.push({
          $match: {
            isPublish: true,
          },
        });
      } else if (tab === 2) {
        pipeline.push({
          $match: {
            isPublish: false,
          },
        });
      }

      pipeline.push({
        $project: {
          _id: 1, // Loại bỏ trường _id
          meta_title: 1, // Trường name
          title: 1, // Trường name
          meta_description: 1, // Trường age
          views_count: 1, // Trường email
          isPublish: 1,
          published_at: 1, // Trường email
          comments_count: 1, // Trường email
          countLike: 1, // Trường email
          createdAt: 1,
          updatedAt: 1,
          thumbnail_url: 1,
          selected_tags: 1,
          "user._id": 1,
          "user.full_name": 1,
          "user.email": 1,
          "user.avatarUrl": 1,
        },
      });

      const countDocuments = await BlogsModel.aggregate([
        ...pipeline,

        {
          $count: "total",
        },
      ]);

      const listBlogs = await BlogsModel.aggregate([
        ...pipeline,
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
        .collation({
          locale: "en_US",
          strength: 1,
        })
        .skip(skip)
        .limit(limit);

      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listBlogs,
        count: countDocuments[0]?.total || 0,
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
        sort,
        fieldSort,
        published_at,
        tags,
        pageSize,
        pageIndex,
        tab = 1,
      } = req.body;

      const user = req.user;
      console.log(user?.id);

      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;

      let pipeline: any[] = [
        {
          $match: {
            user_id: user?.id,
          },
        },
      ];
      // search
      if (keyword) {
        pipeline.push({
          $match: {
            title: { $regex: keyword, $options: "i" },
          },
        });
      }

      pipeline.push({
        $lookup: {
          from: "users", // Collection to join
          localField: "user_id", // Field from the input documents
          foreignField: "_id",
          as: "user", // Field from the documents of the "from" collection
        },
      });

      pipeline.push({
        $lookup: {
          from: "tags", // Collection to join
          localField: "selected_tags", // Field from the input documents
          foreignField: "_id", // Field from the documents of the "from" collection
          as: "selected_tags", // Output array field
        },
      });

      if (tab === 1) {
        pipeline.push({
          $match: {
            isPublish: true,
          },
        });
      } else if (tab === 2) {
        pipeline.push({
          $match: {
            isPublish: false,
          },
        });
      }

      pipeline.push({
        $project: {
          _id: 1, // Loại bỏ trường _id
          meta_title: 1, // Trường name
          title: 1, // Trường name
          meta_description: 1, // Trường age
          views_count: 1, // Trường email
          isPublish: 1,
          published_at: 1, // Trường email
          comments_count: 1, // Trường email
          countLike: 1, // Trường email
          createdAt: 1,
          updatedAt: 1,
          thumbnail_url: 1,
          selected_tags: 1,
          "user._id": 1,
          "user.full_name": 1,
          "user.email": 1,
          "user.avatarUrl": 1,
        },
      });

      const countDocuments = await BlogsModel.aggregate([
        ...pipeline,

        {
          $count: "total",
        },
      ]);

      const listBlogs = await BlogsModel.aggregate([
        ...pipeline,
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
        .collation({
          locale: "en_US",
          strength: 1,
        })
        .skip(skip)
        .limit(limit);

      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listBlogs,
        count: countDocuments[0]?.total || 0,
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