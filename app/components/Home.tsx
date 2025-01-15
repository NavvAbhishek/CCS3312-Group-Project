import React from "react";
import { Button, Footer, Navbar } from ".";
import Image from "next/image";
import heroImg from "../../public/hustle_hub_hero.png"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="dark:bg-black bg-white flex flex-grow flex-col sm:flex-row justify-center items-center gap-14 sm:gap-32 py-[36px] px-10 lg:px-20">
        <div className="shrink">
          <h1 className="text-4xl font-bold pb-8 text-balck dark:text-pink">
            Organize, Track, Achieve
          </h1>
          <p className="text-sm md:text-lg mb-8 leading-7">
            Transform your productivity with our powerful todo app. Whether
            it&apos;s personal projects or professional deadlines, our tool lets
            you manage, track, and prioritize effortlessly. Achieve more every
            day.
          </p>
          <Button href="/login" name="Get Started" />
        </div>
        <div className="shrink-0">
          <Image
            src={heroImg}
            alt="heroImg"
            priority
            className="w-[25rem] sm:w-[20rem] md:w-[25rem] lg:w-[37rem] pb-10 sm:pb-0 rounded-lg"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
