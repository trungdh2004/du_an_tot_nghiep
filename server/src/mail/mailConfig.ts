import nodemailer from "nodemailer";
import dotenv from "dotenv"

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = (to:string, from:string) => {
  const mailOptions = {
    from: from,
    to: to,
    subject: "Mail nhận mã OTP quên mật khẩu",
    html: `
    <h1>Hello!</h1>
    <p>This is a test email sent using <b>Nodemailer</b>.</p>
    <p><a href="https://example.com">Visit our site</a></p>
  `,
  };
};
