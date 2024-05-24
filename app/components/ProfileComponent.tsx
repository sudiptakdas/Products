import React from "react";

export interface ProfileComponentType {
  id: number;
  image: string;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  phone: string;
  setSelectedProfileData: React.Dispatch<
    React.SetStateAction<ProfileComponentType[]>
  >;
  checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProfileComponent: React.FC<ProfileComponentType> = ({
  id,
  image,
  name,
  email,
  phone,
  checked,
  setChecked,
}) => {
  const handleCheckboxChange = () => {
    if (checked.includes(id.toString())) {
      setChecked(checked.filter((item) => item !== id.toString()));
    } else {
      setChecked([...checked, id.toString()]);
    }
  };

  return (
    <div className=" border border-black rounded-lg p-4 flex justify-between items-center bg-gray-700 group">
      <div>
        <img src={image} className=" w-20 h-20 rounded-full" />
      </div>
      <div>
        <h1 className=" text-white text-end">{`Name: ${name?.firstname} ${name?.lastname}`}</h1>
        <h1 className=" text-white text-end">{`Email: ${email}`}</h1>
        <h1 className=" text-white text-end">{`Phone: ${phone}`}</h1>
      </div>
      <div className=" hidden group-hover:block -mt-1">
        <input
          type="checkbox"
          checked={checked.includes(id.toString())}
          onChange={handleCheckboxChange}
          className=" cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProfileComponent;
