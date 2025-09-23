import React from "react";
import { FaPhoneAlt, FaSms } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { LuMessageSquareMore } from "react-icons/lu";

function ContactCard({ officer }) {
  let { title, department, location, specialization, phone } = officer;
  return (
    <div className="flex flex-col shadow-lg bg-white mt-5">
      <div className="flex justify-between items-center p-2">
        <div className="flex flex-col">
          <p className="text-gray-800 font-bold">{title}</p>
          <p className="text-green-500 text-sm">{department}</p>
          <p className="text-gray-500 text-xs">{location}</p>
        </div>
        <div className="p-3 bg-green-600 rounded-full">
          <a href={`tel:${phone}`}>
            <IoMdCall className="text-white font-bold text-lg" />
          </a>
        </div>
      </div>
      <hr />
      <div className="p-2 flex flex-col gap-3">
        <div>
          <p className="text-xs text-gray-600">
            specialization: {specialization}
          </p>
          <p className="text-xs text-gray-600">{phone}</p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-green-600  text-white flex justify-center gap-1 items-center  py-1 rounded-3xl">
            <a href={`tel:${phone}`}>
              <IoMdCall className="font-bold text-lg" />
            </a>
            <p>call</p>
          </div>
          <div className="flex-1 bg-blue-600  text-white flex justify-center gap-1 items-center  py-1 rounded-3xl">
            <a href={`sms:${phone}`}>
              <LuMessageSquareMore className="font-bold text-lg" />
            </a>
            <p>SMS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
