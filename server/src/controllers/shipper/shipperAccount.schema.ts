import { Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import { shipperValidation } from "../../validation/shipper.validation";
import ShipperModel from "../../models/shipper/Shipper.schema";

class ShipperController {
  async registerShipper(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { error } = shipperValidation.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }

      const {
        firstName,
        lastName,
        fullName,
        birthDate,
        address,
        idCitizen,
        avatar,
        phone,
      } = req.body;

      const existingShipper = await ShipperModel.findOne({
        user: user?.id,
      });

      if (existingShipper) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Tài khoản đã được đăng kí",
        });
      }

      const createShipper = await ShipperModel.create({
        firstName,
        lastName,
        fullName,
        birthDate,
        address,
        idCitizen,
        avatar,
        phone,
      });

      return res.status(STATUS.OK).json({
        message: "Đăng kí tài khoản thành công chờ ",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async checkUserAccount(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const existingShipper = await ShipperModel.findOne({
        user: user?.id,
      });

      if (existingShipper) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Tài khoản đã được đăng kí",
          active:true
        });
      }

      return res.status(STATUS.OK).json({
        active:false
      })
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

}
