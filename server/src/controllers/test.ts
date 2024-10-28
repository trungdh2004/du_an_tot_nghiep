import { Request, Response } from "express";
import { socketNotificationAllClient } from "../socket/socketNotifycationClient.service";
import { getFullSocketAdmin } from "../socket";
import { socketNotificationAdmin } from "../socket/socketNotifycationServer.service";
import { TYPE_NOTIFICATION_ADMIN } from "../config/typeNotification";
import STATUS from "../utils/status";
import { formatDataPaging } from "../common/pagingData";

export const TestSocket = async (req: Request, res: Response) => {
  try {
    const listSocket = getFullSocketAdmin();
    socketNotificationAdmin(
      "XIn chào test nè",
      TYPE_NOTIFICATION_ADMIN.ORDER,
      "123456"
    );
    return res.json("hihhi");
  } catch (error) {}
};

export const pagingTest = async (req: Request, res: Response) => {
  try {
    const array = Array.from({ length: 100 }, (_, i) => ({
      value: i + 1,
      name: i + 1,
    }));

    const { pageIndex } = req.body;

    const limit = 10;

    const skip = (pageIndex - 1) * limit || 0;

    const listData = array.splice(skip, limit);

    const data = formatDataPaging({
      limit: limit,
      pageIndex: pageIndex,
      data: listData,
      count: 100,
    });

    return res.status(STATUS.OK).json(data);
  } catch (error) {}
};
