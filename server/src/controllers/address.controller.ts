import { Request, Response } from "express";
import AddressModel from "../models/Address.schema";
import UserModel from "../models/User.Schema";
import { addressValidation } from "../validation/address.validation";
import STATUS from "../utils/status";
import { IAddress } from "../interface/address";
import { RequestModel } from "../interface/models";
import { ObjectId } from "mongoose";

class AddressController {
  async paddingAddress(req: Request, res: Response) {
    try {
      const { pageIndex, pageSize } = req.body;

      let limit = pageSize || 2;
      let skip = (pageIndex - 1) * limit || 0;

      const address = await AddressModel.find()
        // .populate("user")
        .skip(skip)
        .limit(limit);
      const addressLength = await AddressModel.countDocuments();
      const totalPage =
        addressLength === 0 ? 0 : Math.ceil(addressLength / limit);
      const totalOptionPage = address.length;
      const totalAllOptions = addressLength;
      const result = {
        pageIndex: pageIndex,
        pageSize: limit,
        totalPage,
        totalOptionPage,
        totalAllOptions,
        content: address,
      };
      res.json({
        ...result,
      });
    } catch (error) {}
  }

  async postAddress(req: RequestModel, res: Response) {
    try {
      const { error } = addressValidation.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }

      const { username, phone, city, district, commune, address }: IAddress =
        req.body;

      const location = `${commune?.name},${district?.name},${city?.name}`;
      if (!req.user) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Mời bạn đăng nhập",
        });
      }

      const existingUser = await UserModel.findById(req.user.id);

      if (!existingUser) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập",
        });
      }

      const newAddress = await AddressModel.create({
        user: existingUser._id,
        username,
        phone,
        city,
        district,
        commune,
        address,
        location,
      });

      return res.status(STATUS.OK).json({
        message: "Tạo địa chỉ mới thành công",
        data: newAddress,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async deleteAddress(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { id } = req.params;

      if (!user) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập",
        });
      }

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa truyền id địa chỉ",
        });
      }

      const existingAddress = await AddressModel.findById(id);

      if (!existingAddress) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có địa chỉ nào ",
        });
      }

      if (
        existingAddress.user.toString() !== user.id.toString() ||
        user.is_admin
      ) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn không có quyền xóa",
        });
      }

      await AddressModel.findByIdAndDelete(existingAddress._id);

      return res.status(STATUS.OK).json({
        message: "Xóa địa chỉ thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new AddressController();
