import { Response } from "express";
import { RequestModel } from "../../interface/models";
import UserModel from "../../models/User.Schema";
import STATUS from "../../utils/status";
import { formatDataPaging } from "../../common/pagingData";

class UserAdmin {
  async listCurrentUsers(req: RequestModel, res: Response) {
    try {
      console.log("file:",req.file);
      
      const {
        pageIndex = 1,
        pageSize,
        fieldSort,
        sort = -1,
        keyword,
        provider,
      } = req.body;
      const user = req.user;
      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;

      let pipeline: any[] = [];
      // search
      if (keyword) {
        pipeline.push({
          $match: {
            full_name: { $regex: keyword, $options: "i" },
          },
        });
      }

      if (provider) {
        pipeline.push({
          $match: {
            provider: provider,
          },
        });
      }
      // skip
      pipeline.push({ $skip: skip }, { $limit: limit });

      // sắp xếp
      if (fieldSort) {
        pipeline.push({
          $sort: { [fieldSort]: sort },
        });
      } else {
        pipeline.push({
          $sort: { createdAt: sort },
        });
      }

      pipeline.push({
        $project: {
          _id: 0, // Loại bỏ trường _id
          full_name: 1, // Trường name
          email: 1, // Trường age
          provider: 1, // Trường email
          avatarUrl: 1, // Trường email
          is_admin: 1, // Trường email
          blocked_at: 1, // Trường email
          createdAt: 1, // Trường email
        },
      });

      console.log("pipeline:", pipeline);
      const countListUser = await UserModel.countDocuments();

      const listUser = await UserModel.aggregate(pipeline).collation({
        locale: "en_US",
        strength: 1,
      });

      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listUser,
        count: countListUser,
      });

      return res.status(STATUS.OK).json(data);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async getAdminCurrentById(req: RequestModel, res: Response) {
    
  };
}

export default new UserAdmin();
