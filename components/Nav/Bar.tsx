import { useEffect, useState } from "react";
import NavLink from "./Link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsMenuOpen(false);
      else setIsMenuOpen(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="grid justify-items-end grid-rows-auto grid-cols-2 items-center text-2xl">
      <div className="pl-5 pt-3 justify-self-start">Logo</div>
      <div className="pr-5 pt-3 grid lg:grid-cols-4">
        <NavLink link="/" label="Home" isMenuOpen={isMenuOpen} />
        <NavLink link="/login" label="Login" isMenuOpen={isMenuOpen} />
        <NavLink link="/register" label="Register" isMenuOpen={isMenuOpen} />
        <NavLink link="/budgets" label="Budgets" isMenuOpen={isMenuOpen} />
        <div onClick={handleMenu} className={`lg:hidden cursor-pointer`}>
          {(isMenuOpen && "Close") || "Open"}
        </div>
      </div>
    </div>
  );
}
