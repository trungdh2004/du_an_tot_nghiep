import { Request, Response } from "express";
import { generateOrderCode } from "../middlewares/generateSlug";
import VoucherModel from "../models/order/Voucher.schema";
import STATUS from "../utils/status";
import { RequestModel } from "../interface/models";
import OrderModel from "../models/order/Order.schema";
import { voucherValidation } from "../validation/voucher.validation";
import { formatDataPaging } from "../common/pagingData";

const generateCode = async (code: string): Promise<string> => {
  const existingCode = await VoucherModel.findOne({
    code: code,
  });
  if (existingCode) {
    let codeNew = generateOrderCode();
    return generateCode(codeNew as string);
  }
  return code;
};

class VoucherController {
  async addVoucher(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { error } = voucherValidation.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const {
        name,
        description,
        startDate,
        endDate,
        discountType,
        discountValue,
        usageLimit,
      } = req.body;

      let code = generateOrderCode();
      code = await generateCode(code);

      const newVoucher = await VoucherModel.create({
        name,
        description,
        startDate,
        endDate,
        discountType,
        discountValue,
        usageLimit,
        code,
        user: user?.id,
      });

      return res.status(STATUS.OK).json({
        message: "Tạo thành công",
        data: newVoucher,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async getVoucherCode(req: RequestModel, res: Response) {
    try {
      const { code } = req.body;
      const user = req.user;

      if (!code)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa nhập code",
        });

      const existingVoucher = await VoucherModel.findOne({
        code: code,
      });

      if (!existingVoucher)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có voucher nào !!",
        });

      if (existingVoucher.status === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Voucher không hoạt động",
        });
      }

      const dateNow = new Date().getTime();
      const stopVoucher = existingVoucher.endDate;

      if (dateNow > new Date(stopVoucher).getTime()) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Voucher đã hết hạn",
        });
      }

      if (existingVoucher.usageCount >= existingVoucher.usageLimit) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Voucher đã hết lượt sử dụng",
        });
      }

      const existingOrderVoucher = await OrderModel.findOne({
        user: user?.id,
        voucher: existingVoucher?.id,
        voucherVersion: existingVoucher.version,
      });

      if (existingOrderVoucher) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Voucher này bạn đã sử dụng",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy voucher thành công",
        data: existingVoucher,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async stopAction(req: RequestModel, res: Response) {
    try {
      const {id} = req.params

      if(!id) return res.status(STATUS.BAD_REQUEST).json({
        message:"Bạn chưa chọn giá trị"
      })

      const existingAction = await VoucherModel.findById(id)

      if(!existingAction) return res.status(STATUS.BAD_REQUEST).json({
        message:"Không có voucher"
      })

      const update = await VoucherModel.findByIdAndUpdate(id,{
        status:2
      })

      return res.status(STATUS.OK).json({
        message:"Ngừng sử dụng thành công"
      })
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async startAction(req:RequestModel,res:Response) {
    try {
      const {id} = req.params

      if(!id) return res.status(STATUS.BAD_REQUEST).json({
        message:"Bạn chưa chọn giá trị"
      })

      const existingAction = await VoucherModel.findById(id)

      if(!existingAction) return res.status(STATUS.BAD_REQUEST).json({
        message:"Không có voucher"
      })

      const update = await VoucherModel.findByIdAndUpdate(id,{
        status:1,
        version:existingAction.version + 1
      })

      return res.status(STATUS.OK).json({
        message:"Sử dụng thành công"
      })
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateVoucher(req: RequestModel, res: Response) {
    try {
      const {
        name,
        description,
        startDate,
        endDate,
        discountType,
        discountValue,
        usageLimit,
      } = req.body;
      const { id } = req.params;
      const { error } = voucherValidation.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn voucher",
        });
      }

      const existingVoucher = await VoucherModel.findById(id);

      if (existingVoucher) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có voucher nào",
        });
      }

      const newVoucher = await VoucherModel.findByIdAndUpdate(id, {
        name,
        description,
        startDate,
        endDate,
        discountType,
        discountValue,
        usageLimit,
      });

      return res.status(STATUS.OK).json({
        message: "Tạo thành công",
        data: newVoucher,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async findOneVoucher(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa nhập id",
        });

      const existingVoucher = await VoucherModel.findById(id);

      if (!existingVoucher) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có voucher",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy sản phẩm thành công",
        data: existingVoucher,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async pagingVoucher(req: RequestModel, res: Response) {
    try {
      const {
        pageIndex,
        pageSize,
        keyword,
        startDate,
        tab,
        discountType,
        usageLimit,
        sort,
        fieldSort
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
      let queryStartDate = {};
      let queryDiscountType = {};
      let queryUsageLimit = {};
      let queryTab = {};
      let querySort = {};

      if (tab === 2) {
        queryTab = {
          status: 2,
        };
      } else {
        queryTab = {
          status: 1,
        };
      }

      if(startDate) {
        queryStartDate = {
          startDate:{
            $gte:startDate
          }
        }
      }

      if(discountType) {
        queryDiscountType = {
          discountType:discountType
        }
      }

      if(usageLimit) {
        queryUsageLimit={
          usageLimit:usageLimit
        }
      }

      if (fieldSort) {
        querySort = {
          [fieldSort]: sort,
        };
      } else {
        querySort = {
          createdAt: sort,
        };
      }

      const listVoucher = await VoucherModel.find({
        ...queryTab,
        ...queryStartDate,
        ...queryDiscountType,
        ...queryUsageLimit,
        ...queryStartDate,
      }).sort(querySort).skip(skip).limit(limit)

      const countVoucher = await VoucherModel.countDocuments({
        ...queryTab,
        ...queryStartDate,
        ...queryDiscountType,
        ...queryUsageLimit,
        ...queryStartDate,
      })

      const result = formatDataPaging({
        limit,
        pageIndex,
        data: listVoucher,
        count: countVoucher,
      });


      return res.status(STATUS.OK).json(result)
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }


}

export default new VoucherController();