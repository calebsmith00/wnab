import { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../lib/database";

export default async function createBudget(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { budgetTitle } = req.body;

  if (!budgetTitle)
    return res.status(400).json({
      success: false,
      error: "A title must be supplied to create a budget",
    });

  await sql`INSERT INTO public.budgets(user_id, title) VALUES(1, ${budgetTitle})`;
  return res.status(200).json({ success: true });
}
