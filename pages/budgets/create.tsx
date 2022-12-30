import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useState } from "react";
import InputGroup from "../../components/Input/Group";

export default function CreateNewBudget() {
  const [budget, setBudget] = useState<unknown>();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const createRequest = await fetch("/api/budget/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
    });
    const createResponse = await createRequest.json();

    if (createResponse.success) router.push("/budgets");
  };

  return (
    <div className="text-center">
      <form>
        <InputGroup
          for="budgetTitle"
          text="Budget Title"
          handleChange={handleChange}
        />

        <div className="mt-5">
          <button
            className="text-xl font-bold bg-green-500/75 px-5 py-2"
            onClick={handleCreate}
          >
            Create Budget
          </button>
        </div>
      </form>
    </div>
  );
}
