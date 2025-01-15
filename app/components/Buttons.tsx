"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
interface btnProps {
  name: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

interface callToActionBtnProps {
  className?: string;
  onClick?: () => void;
}

type UserData = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
};

const CallToActionButton: React.FC<callToActionBtnProps> = ({
  className,
  onClick,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("api/user");
        console.log(res.data.data);
        setUserData(res.data.data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getUserDetails();
  }, []);

  const buttonClass = `dark:text-black text-blue font-semibold text-sm bg-yellow dark:bg-pink py-[0.6rem] px-5 rounded-lg ${className}`;

  if (userData?._id && pathname === "/") {
    return (
      <button className={buttonClass}>
        <Link href="/dashboard">Dashboard</Link>
      </button>
    );
  }

  if (!userData?._id && pathname === "/") {
    return (
      <button className={buttonClass}>
        <Link href="/login">Login</Link>
      </button>
    );
  }

  if (userData?._id && pathname === "/dashboard") {
    return (
      <button onClick={onClick} className={buttonClass}>
        Logout
      </button>
    );
  }
};

const Button: React.FC<btnProps> = ({ name, href, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`dark:text-black text-blue font-semibold text-sm bg-yellow dark:bg-pink py-3 px-4 rounded-lg ${className}`}
    >
      {href ? <Link href={href}>{name}</Link> : name}
    </button>
  );
};

export { CallToActionButton, Button };
