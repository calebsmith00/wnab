import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function getVerificationCode(userID: string | number) {
  const id = Number(userID);
  const secret = process.env.JWT_SECRET;
  if (!secret) return;

  const token = jwt.sign({ userID: id }, secret.toString());

  return token;
}

export default async function verificationMailer(
  to: string,
  username: string,
  id: string | number
) {
  try {
    const verifyID = await getVerificationCode(id);

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
  } catch (e: any) {
    console.log(e.toString());
  }
}
