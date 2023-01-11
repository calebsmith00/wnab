import { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../lib/database";

export async function requestBudget(id: number) {
  const budget =
    await sql`SELECT id, name FROM public.categories WHERE budget_id = ${id}`;

  return budget;
}

export default async function getBudgetById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({});
}
