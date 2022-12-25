import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function mailer(to: string, username: string) {
  try {
    const verifyID = crypto.randomBytes(20).toString("hex");

    const transporter = nodemailer.createTransport({
      name: "example.com",
      host: "127.0.0.1",
      port: 587,
      secure: false,
    });

    const verifyLink = `http://localhost:3000/verify/${verifyID}`;
    const body = `
      <h3>Verification needed for ${username}</h3>
      <p>Please follow the link below to verify!</p>
      <a href="${verifyLink}">Verify Here</a>
      <br><br>
      <a href="${verifyLink}">${verifyLink}</a> if the link above does not work
    `;

    const info = await transporter.sendMail({
      from: '"Do Not Reply" <donot@reply.com>',
      to,
      subject: "Account Verification Required",
      html: body,
    });
  } catch (e) {
    console.log(`Error has occurred ${e}`);
  }
}
