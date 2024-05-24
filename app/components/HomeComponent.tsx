"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BannerComponent from "./BannerComponent";
import { BannerComponentType } from "./BannerComponent";
import { Carousel } from "flowbite-react";

async function getData(rating: number) {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.filter((item: any) => item.rating.rate <= rating);
}

const HomeComponent = () => {
  const [rating, setRating] = useState<number>(6);
  const [data, setData] = useState<BannerComponentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(rating);
        setData(result);
      } catch (err) {
        console.log(`Error is ${err}`);
      }
    };

    fetchData();
  }, [rating]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(Number(event.target.value));
  };

  return (
    <div className=" p-4 flex flex-col justify-center gap-4 h-full ">
      <div className=" flex justify-center gap-4 -mt-4">
        <Link
          className=" cursor-pointer text-base text-blue-400 font-medium text-center underline "
          href="/about"
        >
          About Us
        </Link>
        <Link
          className=" cursor-pointer text-base text-blue-400 font-medium text-center underline "
          href="/contact"
        >
          Contact Us
        </Link>
      </div>
      <div>
        <h1 className=" text-4xl font-bold text-center ">Products</h1>
      </div>
      <div className=" flex justify-end px-4">
        <select
          onChange={handleChange}
          className=" border border-black font-medium"
        >
          <option value={6}>All</option>
          <option value={2}>1-2 Rating</option>
          <option value={3}>1-3 Rating</option>
          <option value={4}>1-4 Rating</option>
          <option value={4.4}>1-4.5 Rating</option>
        </select>
      </div>
      <div
        id="controls-carousel"
        className="relative w-full"
        data-carousel="static"
      >
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel className=" ">
            {data?.map((item: BannerComponentType) => (
              <BannerComponent
                key={item?.id}
                id={item?.id}
                title={item?.title}
                description={item?.description}
                image={item?.image}
                rating={item?.rating}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
