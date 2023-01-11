import { NextPageContext } from "next";
import { requestBudget } from "../api/budget";

export default function budgetID() {
  return <div>Budget by ID</div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  if (!ctx.query.id) return { props: {} };
  const id: number = Number(ctx.query.id);

  const budget = await requestBudget(id);

  console.log(budget);
  return {
    props: {},
  };
}
