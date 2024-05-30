import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import {
  loginFormValidation,
  registerForm,
} from "../validation/auth.validation";
import STATUS from "../utils/status";
import UserModel from "../models/User.Schema";
import bcrypt from "bcrypt";
import jwt, { VerifyErrors } from "jsonwebtoken";
import RefreshTokenModel from "../models/RefreshToken";
import sendToMail from "../mail/mailConfig";
import OtpModel from "../models/Otp.schema";
import { RequestModel } from "../interface/models";
import { ObjectId } from "mongoose";

interface PayloadToken {
  id: any;
  email: string;
  is_admin: boolean;
}

interface ResponseData extends Response {
  user?: PayloadToken;
}

class AuthController {
  async generateAccessToken(value: PayloadToken | object | string) {
    return jwt.sign(value, process.env.SECRET_ACCESSTOKEN!, {
      expiresIn: "15m",
    });
  }
  async generateRefreshToken(value: PayloadToken | object | string) {
    return jwt.sign(value, process.env.SECRET_REFRESHTOKEN!, {
      expiresIn: "60d",
    });
  }

  loginForm = async (req: Request, res: Response) => {
    try {
      const { error } = loginFormValidation.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }

      const { email, password } = req.body;

      const existingEmail = await UserModel.findOne({
        email: email,
      });

      if (!existingEmail) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Email chưa được đăng kí , mời bạn đăng kí tài khoản",
        });
      }

      const isComparePass = await bcrypt.compare(
        password,
        existingEmail.password
      );

      if (!isComparePass) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Mật khẩu không đúng",
        });
      }

      const accessToken = await this.generateAccessToken({
        id: existingEmail._id,
        email: existingEmail.email,
        is_admin: existingEmail.is_admin,
      });
      const refreshToken = await this.generateRefreshToken({
        id: existingEmail._id,
        email: existingEmail.email,
        is_admin: existingEmail.is_admin,
      });
      const existingRefreshToken = await RefreshTokenModel.findOne({
        userId: existingEmail._id,
      });

      console.log("existingRefreshToken: ", existingRefreshToken);

      if (!existingRefreshToken) {
        await RefreshTokenModel.create({
          userId: existingEmail._id,
          token: refreshToken,
        });
      } else {
        await RefreshTokenModel.findOneAndUpdate(
          {
            userId: existingEmail._id,
          },
          {
            token: refreshToken,
          }
        );
      }

      res.cookie("token", refreshToken, {
        maxAge: 1000 * 60 * 24 * 60,
        httpOnly: true,
        path: "/",
      });

      delete existingEmail._doc.password;

      return res.status(STATUS.OK).json({
        message: "Đăng nhập thành công",
        accessToken: accessToken,
        user: existingEmail,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  };
  async registerForm(req: Request, res: Response) {
    try {
      const { error } = registerForm.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }

      const { email, password, forgotPassword, userName } = req.body;

      console.log("userName:", userName);

      if (password !== forgotPassword) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Nhập lại mật khẩu không trùng nhau",
        });
      }

      const existingEmail = await UserModel.findOne({
        email: email,
      });

      if (existingEmail) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Email này được đăng kí",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        email,
        password: hashPassword,
        full_name: userName,
      });

      return res.status(STATUS.OK).json({
        message: "Đăng kí tài khoản thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
        error: true,
      });
    }
  }
  async socialUser(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  refreshToken = async (req: Request, res: ResponseData) => {
    try {
      const refreshToken = req.cookies.token;
      if (!refreshToken) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập ",
        });
      }

      jwt.verify(
        refreshToken,
        process.env.SECRET_REFRESHTOKEN!,
        async (err: VerifyErrors | null, data?: object | string) => {
          if (err) {
            return res.status(STATUS.AUTHENTICATOR).json({
              message: "Token đã hết hạn mời bạn đăng nhập lại",
            });
          }
          if (!data) {
            return;
          }
          console.log("data:", (data as PayloadToken).id);
          console.log("refreshToken:", refreshToken);

          const refreshTokenDb = await RefreshTokenModel.findOne({
            userId: (data as PayloadToken).id as ObjectId,
            token: refreshToken,
          });

          if (!refreshTokenDb) {
            return res.status(STATUS.AUTHENTICATOR).json({
              message: "Mời bạn đăng nhập lại",
            });
          }
          const payload = {
            id: (data as PayloadToken).id,
            email: (data as PayloadToken).email,
            is_admin: (data as PayloadToken).is_admin,
          };

          const newAccessToken = await this.generateAccessToken(payload);
          const newRefreshToken = await this.generateRefreshToken(payload);
          await RefreshTokenModel.findByIdAndUpdate(refreshTokenDb._id, {
            token: newRefreshToken,
          });
          res.cookie("token", newRefreshToken, {
            maxAge: 24 * 60 * 60 * 1000 * 60,
            httpOnly: true,
            path: "/",
          });

          return res.status(STATUS.OK).json({
            message: "Tạo token thành công",
            accessToken: newAccessToken,
          });
        }
      );
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  };

  async logout(req: RequestModel, res: Response) {
    try {
      if (!req.user) {
        return res.status(STATUS.AUTHENTICATOR).json({
          message: "Bạn chưa đăng nhập",
        });
      }

      await RefreshTokenModel.findOneAndDelete({ userId: req.user.id });

      res.cookie("token", undefined, {
        maxAge: 0,
      });

      return res.status(STATUS.OK).json({
        message: "Bạn đã đăng xuất thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa nhập email tài khoản",
        });
      }

      const existing = await UserModel.findOne({
        email: email,
      });

      if (!existing) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Email chưa được đăng kí",
        });
      }

      const randomOtp = Math.floor(100000 + Math.random() * 900000);

      const data = {
        otp: randomOtp,
        email: existing.email,
        full_name: existing.full_name,
      };

      await sendToMail(existing?.email, "OTP xác thực mật khẩu", data);
      const now = new Date();

      now.setMinutes(now.getMinutes() + 5);
      const existingOtp = await OtpModel.findOne({
        email: existing.email,
      });

      if (existingOtp) {
        await OtpModel.findOneAndUpdate(
          {
            email: existingOtp.email,
          },
          {
            userId: existing._id,
            email: existing.email,
            otp: randomOtp,
            expired: now,
            completed: false,
          }
        );
      } else {
        await OtpModel.create({
          userId: existing._id,
          email: existing.email,
          otp: randomOtp,
          expired: now,
          completed: false,
        });
      }
      return res.status(STATUS.OK).json({
        message: "Gửi mã otp thành công mời bạn kiểm tra email",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async compareOtp(req: Request, res: Response) {
    try {
      const { otp, email } = req.body;
      if (!otp) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa nhập mã otp",
        });
      }
      if (!email) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa nhập email",
        });
      }

      const existingEmail = await UserModel.findOne({
        email: email,
      });

      if (!existingEmail) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Email chưa được đăng kí",
        });
      }

      const existingOtp = await OtpModel.findOne({
        email: existingEmail.email,
        userId: existingEmail._id,
      });

      if (!existingOtp) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Server chưa tạo mã Otp",
        });
      }

      const now = new Date();

      if (now.getTime() > existingOtp.expired.getTime()) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Mã otp đã hết hạn sử dụng",
        });
      }

      const check = otp === existingOtp.otp;

      if (!check) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Mã Otp không đúng",
        });
      }

      await OtpModel.findOneAndUpdate(
        {
          email: existingOtp.email,
        },
        {
          completed: true,
        }
      );
      res.status(STATUS.OK).json({
        message: "Mã Otp đúng",
        data: {
          otp: existingOtp.otp,
          email: existingOtp.email,
          userId: existingOtp.userId,
        },
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateForgotPassword(req: Request, res: Response) {
    try {
      const { password, confirmPassword, email } = req.body;

      if (!password || !confirmPassword || !email) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Mời bạn nhập đầy đủ giá trị",
        });
      }

      const existingEmail = await UserModel.findOne({
        email: email,
      });

      if (!existingEmail) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Xảy ra lỗi khi cập nhập mật khẩu",
        });
      }

      if (password !== confirmPassword) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Mật khẩu không trùng lập",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      await UserModel.findOneAndUpdate(
        {
          email: existingEmail,
          _id: existingEmail._id,
        },
        {
          password: hashPassword,
        }
      );

      return res.status(STATUS.OK).json({
        message: "Cập nhập mật khẩu thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new AuthController();
