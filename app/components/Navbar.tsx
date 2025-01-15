"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo_removebg.png";
import Link from "next/link";
import { Button, CallToActionButton } from "./";
import { RiMenu3Fill, RiCloseLargeFill } from "react-icons/ri";
import useAOS from "../../utils/aosSetup";
import ThemeSwitcher from "./ThemeSwitcher";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About Us" },
];

const Navbar = () => {
  useAOS();
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful");
      console.log("Logout successful");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <nav>
      <div className="bg-blue dark:bg-gray-950">
        <div className="flex items-center justify-between w-[95%] md:w-[80%] mx-auto">
          <Link href="/" className="flex items-center cursor-pointer">
            <Image src={logo} alt="logo" className="w-[6rem] h-full" priority />
            <h1 className="text-white dark:text-pink text-xl font-bold">
              Hustle Hub
            </h1>
          </Link>
          <div className="hidden sm:block">
            <ul className="flex justify-center items-center gap-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="text-white dark:text-pink transition hover:scale-110"
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="hidden sm:block">
              <CallToActionButton onClick={logout} />
            </div>
            <div className="block sm:hidden">
              {!mobileMenu && (
                <RiMenu3Fill
                  className="text-white dark:text-pink text-3xl cursor-pointer"
                  onClick={() => setMobileMenu(!mobileMenu)}
                />
              )}
              {mobileMenu && (
                <RiCloseLargeFill
                  className="text-white dark:text-pink text-3xl cursor-pointer"
                  onClick={() => setMobileMenu(!mobileMenu)}
                />
              )}
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      {mobileMenu && (
        <div
          data-aos="fade-down"
          className="bg-white dark:bg-black block sm:hidden"
          style={{ transform: "translateY(0px)" }}
        >
          <ul className="flex flex-col gap-5 ml-5">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="text-blue dark:text-pink hover:scale-110 hover:ml-5"
              >
                {" "}
                {/* Text color for light and dark mode */}
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <Button
            href="/login"
            name="Login"
            className="ml-5 mb-5 mt-5 py-[10px] px-[15px]"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
