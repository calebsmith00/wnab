import { NextPageContext } from "next";
import BudgetCard from "../components/Budget/Card";
import { getBudgets } from "./api/budget/retrieveByUser";

export default function Budgets(props: any) {
  const renderBudgets = () => {
    return props.budgets.map((budget: any, idx: number) => {
      if (!budget) return;
      return <BudgetCard key={idx} title={budget.title} />;
    });
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl pt-10">Budgets</h1>
      <div className="flex flex-wrap justify-center">
        {props.budgets.length > 0 && renderBudgets()}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const budgets = await getBudgets(1);

  return {
    props: { budgets },
  };
}
