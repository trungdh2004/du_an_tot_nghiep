import jwt, { VerifyErrors } from "jsonwebtoken";
import STATUS from "../utils/status";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User.Schema";
import { RequestModel } from "../interface/models";

interface PayloadToken {
  id: any;
  email: string;
  is_admin: boolean;
}

const authorization = async (
  req: RequestModel,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(STATUS.AUTHORIZED).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    jwt.verify(
      token,
      process.env.SECRET_ACCESSTOKEN!,
      async (err: VerifyErrors | null, data?: object | string) => {
        if (err) {
          let message = "Lỗi token";

          if (err.message === "invalid token") {
            message = "Token không hợp lệ";
          }
          if (err.message === "jwt expired") {
            message = "Token đã hết hạn";
          }

          return res.status(STATUS.AUTHORIZED).json({
            message: message,
          });
        }

        const existingUser = await UserModel.findById(
          (data as PayloadToken).id
        );

        if (!existingUser) {
          return res.status(STATUS.AUTHORIZED).json({
            message: "Tài khoản không thỏa mãn",
          });
        }

        if (!existingUser?.is_admin) {
          return res.status(STATUS.AUTHORIZED).json({
            message: "Bạn không có quyền",
          });
        }

        req.user = {
          id: existingUser._id,
          email: existingUser.email,
          is_admin: existingUser.is_admin,
        };

        next();
      }
    );
  } catch (error: any) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
