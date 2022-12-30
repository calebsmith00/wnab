import { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../lib/database";

export async function getBudgets(userID: number) {
  const budgets =
    await sql`SELECT title FROM public.budgets WHERE user_id = ${userID}`;

  if (budgets.length <= 0) throw new Error("No budget found with that user ID");

  return budgets;
}

export default async function retrieveBudgetByUserID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  if (!id || isNaN(id)) return res.status(400).json({});

  try {
    const budgets = await getBudgets(id);

    return res.status(200).json(budgets);
  } catch (e: any) {
    return res.status(400).json({ error: e.toString() });
  }
}
