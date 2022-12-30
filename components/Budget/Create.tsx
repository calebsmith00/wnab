import { useRouter } from "next/router";

export default function BudgetCreate() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/budgets/create");
  };

  return (
    <div
      className="bg-gray-500/50 rounded-xl p-10 m-5 cursor-pointer"
      onClick={handleCreate}
    >
      <div>Create New Budget</div>
    </div>
  );
}
