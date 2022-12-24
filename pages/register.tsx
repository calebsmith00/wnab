import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useState } from "react";
import InputGroup from "../components/Input/Group";
import { User } from "./api/user/register";

export default function RegisterPage() {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    email: "",
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const property = e.target.name;
    const value = e.target.value;

    setUser((prevUser) => {
      return {
        ...prevUser,
        [property]: value,
      };
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { username, password, email }: User = user;
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // TODO: Properly display invalid entries
    if (!username || !password || !email) return;
    if (!email.match(validEmailRegex)) return;

    const register = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const response = await register.json();

    if (response.success) {
      setIsRegistered(true);
      router.push("/");
    }
  };

  if (isRegistered) return <></>;

  return (
    <div className="text-center">
      <div className="text-3xl text-center mt-5 font-serif">Register Now</div>
      <form className="mt-5">
        <InputGroup
          for="username"
          text="Username"
          handleChange={handleChange}
          required={true}
          value={user.username}
        />

        <InputGroup
          for="password"
          text="Password"
          type="password"
          handleChange={handleChange}
          required={true}
        />

        <InputGroup
          for="email"
          text="Email"
          type="email"
          handleChange={handleChange}
          required={true}
        />

        <div>
          <button
            type="submit"
            className="bg-green-500/75 mt-5 px-5 py-2 text-xl"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
