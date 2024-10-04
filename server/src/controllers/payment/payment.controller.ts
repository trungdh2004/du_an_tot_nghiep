import { Response } from "express";
import { RequestModel } from "../../interface/models";
import PaymentModel from "../../models/order/Payment.schema";
import { formatDataPaging } from "../../common/pagingData";
import STATUS from "../../utils/status";

class PaymentController {
  async pagingClient(req: RequestModel, res: Response) {
    try {
      const { pageIndex = 1, pageSize } = req.body;
      const limit = pageSize || 20;
      const skip = (pageIndex - 1) * limit;
      const user = req.user;

      const listPayment = await PaymentModel.find({
        user: user?.id,
      })
        .skip(skip)
        .limit(limit)
        .sort({
          createdAt: -1,
        });

      const countPayment = await PaymentModel.countDocuments({
        user: user?.id,
      });

      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listPayment,
        count: countPayment,
      });

      return res.status(STATUS.OK).json(data);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        error: error.message,
      });
    }
  }

  async pagingAdmin(req: RequestModel, res: Response) {
    try {
      const { pageIndex = 1, pageSize } = req.body;
      const limit = pageSize || 10;
      const skip = (pageIndex - 1) * limit;

      const listPayment = await PaymentModel.find()
        .skip(skip)
        .limit(limit)
        .sort({
          createdAt: -1,
        });

      const countPayment = await PaymentModel.countDocuments();

      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listPayment,
        count: countPayment,
      });

      return res.status(STATUS.OK).json(data);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        error: error.message,
      });
    }
  }
}

export default new PaymentController();
