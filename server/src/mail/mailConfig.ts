import nodemailer from "nodemailer";
import dotenv from "dotenv"
import ejs from "ejs"

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

ejs.renderFile(__dirname + "/requestOTP.ejs", (err, template) => {
  
  const sendMail = (to: string, from: string) => {
    const mailOptions = {
      from: from,
      to: to,
      subject: "Mail nhận mã OTP quên mật khẩu",
      html: template,
    };
  };

  // transporter.sendMail(sen)
});

