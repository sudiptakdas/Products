import React from "react";
import Image from "next/image";

export interface BannerComponentType {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
}

const BannerComponent: React.FC<BannerComponentType> = ({
  id,
  title,
  description,
  image,
  rating,
}) => {

  return (
    <div className=" border h-full border-black bg-black px-20 py-5 flex gap-4 items-center rounded-lg">
      <div className=" min-w-[110px]">
        <Image
          src={image}
          width={100}
          height={100}
          className=" w-44 h-44 rounded-lg"
          alt="Picture of the author"
        />
      </div>
      <div className=" p-3">
        <h1 className=" text-white font-medium text-2xl">{title}</h1>
        <h1 className=" text-white text-base line-clamp-3">{description}</h1>
      </div>
    </div>
  );
};

export default BannerComponent;
