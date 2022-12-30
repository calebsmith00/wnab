interface BudgetCardProps {
  title: string;
}

export default function BudgetCard(props: BudgetCardProps) {
  return (
    <div className="bg-gray-500/50 rounded-xl p-10 m-5 min-w-[200px]">
      <h1>{props.title}</h1>
    </div>
  );
}
