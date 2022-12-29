import Link from "next/link";

interface NavLinkProps {
  link: string;
  label: string;
  isMenuOpen: boolean;
}

export default function NavLink(props: NavLinkProps) {
  if (!props.isMenuOpen) return <></>;

  return (
    <div className="my-2 lg:my-0 lg:mx-4">
      <Link href={props.link}>{props.label}</Link>
    </div>
  );
}
