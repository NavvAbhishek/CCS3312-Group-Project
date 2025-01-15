import React from "react";
import Image from "next/image";
import AboutImg from "@/public/about_us.png";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-5xl text-blue font-bold mb-8 text-center">About Us</h1>
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl">
        <div className="w-full lg:w-1/2">
          <Image src={AboutImg} alt="About us image" />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <p className="text-lg">
            Welcome to{" "}
            <span className="font-bold text-pink">Hustle Hub</span>, your
            ultimate productivity partner! We aim to empower individuals and
            teams to achieve their goals efficiently with our intuitive and
            powerful tools. At Hustle Hub, we believe in turning dreams into
            actionable plans and making productivity an enjoyable journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
