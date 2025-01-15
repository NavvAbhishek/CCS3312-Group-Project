"use client"
import React from "react";

const Profile = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg text-pink font-semibold mb-4">Name: John</h2>
        <h2 className="mb-4 text-lg text-pink font-semibold">
          Email: john@gmail.com
        </h2>
        <button
          className="w-full bg-purple text-white py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
