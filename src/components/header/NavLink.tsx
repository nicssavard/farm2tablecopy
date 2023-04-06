"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function NavLink(props: Props) {
  const path = usePathname()?.split("/").pop();
  const isActive = props.href === path;

  return (
    <Link
      href={`/${props.href}`}
      className={`${
        isActive && "underline decoration-green-light underline-offset-8"
      } px-3 py-1 text-2xl font-medium text-gold-500 hover:text-green-light`}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
}
