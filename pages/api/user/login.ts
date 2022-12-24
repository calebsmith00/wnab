import { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../lib/database";
import bcrypt from "bcrypt";
const salt = process.env.PW_SALT;

export default async function userLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(200).json({});
  if (!req.body.username || !req.body.password) return res.status(400).json({});

  const { username, password } = req.body;
  const possibleUsers =
    await sql`select username, password from users where username=${username}`;

  let foundUser = undefined;
  for (let i = 0; i < possibleUsers.length; ++i) {
    const possiblePass = possibleUsers[i].password;
    if (await bcrypt.compare(password + salt, possiblePass))
      foundUser = possibleUsers[i];
  }

  if (!foundUser) return res.status(400).json({});

  return res.status(200).json({
    success: true,
    message: `You have successfully logged in as ${foundUser.username}`,
  });
}
