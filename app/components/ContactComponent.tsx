"use client";

import React, { useState } from "react";

interface ContactFormType {
  name: string;
  email: string;
  address: string;
  phone: string;
  inquiry: string;
}

const ContactComponent = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: "",
    email: "",
    address: "",
    phone: "",
    inquiry: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push("Name is required.");
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.push("Valid email is required.");
    }
    if (!formData.address.trim()) {
      newErrors.push("Address is required.");
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.push("Valid 10-digit phone number is required.");
    }
    if (!formData.inquiry.trim()) {
      newErrors.push("Please select a reason for connecting.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formData);
    
    setFormData({ name: "", email: "", address: "", phone: "", inquiry: "" });
    setErrors([]);
  };

  return (
    <div className=" w-full p-4 flex flex-col gap-6">
      <div className=" flex justify-center">
        <h1 className=" text-3xl font-semibold">Contact Us</h1>
      </div>
      {errors.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error(s):</strong>
          <ul className="list-disc ml-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className=" w-full grid md:grid-cols-2 gap-4">
          <div className=" w-full flex flex-col gap-2">
            <h1>Name</h1>
            <input
              value={formData.name}
              className=" w-full border border-gray-600 rounded-lg p-4"
              placeholder="Write Name"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <h1>Email</h1>
            <input
              value={formData.email}
              className=" w-full border border-gray-600 rounded-lg p-4"
              placeholder="Write Email"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <h1>Address</h1>
            <input
              value={formData.address}
              className=" w-full border border-gray-600 rounded-lg p-4"
              placeholder="Write Address"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <h1>Phone</h1>
            <input
              value={formData.phone}
              className=" w-full border border-gray-600 rounded-lg p-4"
              placeholder=" Write Phone Number"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <h1>Why you want to connect?</h1>
            <select
              className=" border border-gray-600 rounded-lg p-4"
              value={formData.inquiry}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, inquiry: e.target.value }))
              }
            >
              <option value="" disabled>
                Select a value
              </option>
              <option value="INQUIRY">Inquiry</option>
              <option value="RELATIONSHIP">Develop relationships</option>
              <option value="ISSUES">Issues</option>
            </select>
          </div>
        </div>
        <div className=" flex justify-end">
          <button
            type="submit"
            className=" mt-4 mr-2 py-2 px-6 rounded-lg text-white bg-blue-700 max-w-fit border border-blue-700 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactComponent;
