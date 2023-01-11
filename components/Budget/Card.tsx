import Link from "next/link";
import { useRouter } from "next/router";

interface BudgetCardProps {
  title: string;
  id: number;
}

export default function BudgetCard(props: BudgetCardProps) {
  const router = useRouter();

  const accessBudget = () => {
    router.push(`/budgets/${props.id}`);
  };

  return (
    <div
      className="bg-gray-500/50 rounded-xl p-10 m-5 min-w-[1.5em] min-h-[1em] cursor-pointer"
      onClick={accessBudget}
    >
      <h1>{props.title}</h1>
    </div>
  );
}
