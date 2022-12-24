import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import sql from "../../../lib/database";

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
  if (req.method !== "POST") return res.status(200).json({});
  if (salt === "") return res.status(400).json({});

  const { username, password, email }: User = req.body;
  const hashedPw: string = await bcrypt.hash(password + salt, saltRounds);

  // Validate request body
  if (!username || !password || !hashedPw || !email)
    return res.status(400).json({});

  await sql`
    insert into users (username, password, email) values(${username}, ${hashedPw}, ${email})
  `;

  return res.status(200).json({
    success: true,
    message: "You have successfully registered to WNAB!",
  });
}
