
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, resetUrl) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL , // sender address
    to: to, // list of recipients
    subject: "Reset Password Link", // subject line
     // plain text body
    html: `<p> Click on the link to reset password ${resetUrl} , <br> This link is valid for 15 min </p>`, // HTML body
  });
}


export default sendMail


