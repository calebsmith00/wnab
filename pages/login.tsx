import { ChangeEvent, MouseEvent, useState } from "react";
import InputGroup from "../components/Input/Group";

export default function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { username, password } = user;
    if (!username || !password) return;

    const login = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const response = await login.json();

    console.log(response);
  };

  return (
    <div className="text-center">
      <form>
        <InputGroup
          for="username"
          text="Username"
          handleChange={handleChange}
        />

        <InputGroup
          for="password"
          text="Password"
          type="password"
          handleChange={handleChange}
        />

        <div className="mt-5">
          <button
            className="text-xl font-bold bg-green-500/75 px-5 py-2"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
