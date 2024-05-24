"use client";

import React, { useEffect, useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { ProfileComponentType } from "./ProfileComponent";

async function getData() {
  const res = await fetch("https://fakestoreapi.com/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data;
}

const AboutComponent = () => {
  const [data, setData] = useState([]);
  const [selectedProfileData, setSelectedProfileData] = useState<
    ProfileComponentType[]
  >([]);
  const [checked, setChecked] = useState<string[]>([]);

  const handleSubmit = () => {
    const selectedProfiles = data.filter((profile: any) =>
      checked.includes(profile.id.toString())
    );
    const names = selectedProfiles.map((profile: any) => {
      return {
        Name: `${profile.name.firstname} ${profile.name.lastname}`,
        Phone: `${profile.phone}`,
      };
    });
    console.log("Selected Names:", names);
    setChecked([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (err) {
        console.log(`Error is ${err}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <div className=" flex justify-center">
        <h1 className=" text-gray-700 text-4xl font-semibold mb-2">About Us</h1>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((item: any) => (
          <ProfileComponent
            key={item?.id}
            id={item?.id}
            image={`https://picsum.photos/${item?.id + 100}`}
            email={item?.email}
            name={{
              firstname: item?.name?.firstname,
              lastname: item?.name?.lastname,
            }}
            phone={item?.phone}
            setSelectedProfileData={setSelectedProfileData}
            checked={checked}
            setChecked={setChecked}
          />
        ))}
      </div>
      <div className=" flex justify-end">
        <button
          disabled={checked.length === 0}
          className={` text-white px-4 py-2 w-24 rounded-lg ${
            checked.length > 0 ? "bg-red-700" : "bg-red-300"
          }`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AboutComponent;
