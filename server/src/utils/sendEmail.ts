import { oAuth2Client } from "../OAuth2Client";
import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      //@ts-ignore
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "ProgressPal <progresspal.app@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "Confirmation Email ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<a href="${url}">${url}</a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (e) {
    console.log(e);
  }
}
