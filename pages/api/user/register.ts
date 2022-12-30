import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import sql from "../../../lib/database";
import jwt from "jsonwebtoken";
import verificationMailer from "../../../lib/mailer";

const salt: string = process.env.PW_SALT || "";
const saltRounds: number = 10;

// TODO: figure out where to put this interface
export interface User {
  username: string;
  password: string;
  email: string;
}

export default async function userRegisterApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") return res.status(200).json({});
    if (salt === "") return res.status(400).json({});

    const { username, password, email }: User = req.body;
    const hashedPw: string = await bcrypt.hash(password + salt, saltRounds);

    // Validate request body
    if (!username || !password || !hashedPw || !email)
      return res.status(400).json({});

    const userExists =
      await sql`select email from users where email = ${email}`;

    if (userExists.length > 0)
      return res.status(400).json({
        success: false,
        message: `User already exists with that email!`,
      });

    const newUser = await sql`
    insert into users (username, password, email) values(${username}, ${hashedPw}, ${email}) returning id
  `;

    if (newUser.length <= 0)
      return res.status(400).json({
        success: false,
        message: "Error when trying to insert user into DB",
      });

    await verificationMailer(email, username, newUser[0].id);

    return res.status(200).json({
      success: true,
      message: "You have successfully registered to WNAB!",
    });
  } catch (e: any) {
    console.log(e.toString());
    return res.status(400).json({ success: false, error: e.toString() });
  }
}
