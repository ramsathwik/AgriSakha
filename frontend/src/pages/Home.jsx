import { IoChatbubble } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { Sprout } from "lucide-react";
import {
  RiPlantFill,
  FaBug,
  CiCloud,
  RiGovernmentFill,
  FaRupeeSign,
  BsCloudSunFill,
} from "../components/icons";
import { NavLink } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";

function Home() {
  const cards = [
    {
      title: "Pest Control",
      icon: <FaBug className="w-6 h-6 text-red-600" />,
      bg: "bg-red-100",
    },
    {
      title: "Weather Update",
      icon: <CiCloud className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-100",
    },
    {
      title: "Fertilizer Tips",
      icon: <Sprout className="w-6 h-6 text-green-500" />,
      bg: "bg-green-100",
    },
    {
      title: "Crop Care",
      icon: <RiPlantFill className="w-6 h-6 text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Government Schemes",
      icon: <RiGovernmentFill className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Market Prices",
      icon: <FaRupeeSign className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <div className="fixed left-0 right-0 top-0 flex justify-between bg-green-600 text-white py-5 px-4 items-center z-50">
        <h1 className="font-semibold text-lg sm:text-xl">AgriSakha</h1>
        <NavLink to="/notifications">
          <IoIosNotifications className="text-xl" />
        </NavLink>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 pt-20 pb-16 px-2 overflow-y-auto space-y-4">
        {/* Hero Section */}
        <div className="relative bg-[url('images/agri.avif')] bg-cover bg-center h-36 flex items-end p-4 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative text-white">
            <p className="font-semibold text-lg sm:text-xl">Welcome Farmer!</p>
            <p className="text-sm sm:text-base text-opacity-80">
              Ask me anything about farming
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white flex flex-col items-center justify-center rounded-xl shadow-md cursor-pointer p-3 hover:shadow-lg transition">
            <div className="p-4 bg-green-100 rounded-full mb-3">
              <IoChatbubble className="text-green-600 text-xl" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">Ask Question</p>
              <p className="text-xs text-gray-500">Type your question</p>
            </div>
          </div>

          <div className="bg-white flex flex-col items-center justify-center rounded-xl shadow-md cursor-pointer p-3 hover:shadow-lg transition">
            <div className="p-4 bg-blue-100 rounded-full mb-3">
              <FaMicrophone className="text-blue-600 text-xl" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">Voice Query</p>
              <p className="text-xs text-gray-500">Speak Your Question</p>
            </div>
          </div>

          <div className="bg-white flex items-center justify-start gap-4 rounded-xl shadow-md cursor-pointer p-6 hover:shadow-lg transition col-span-2">
            <div className="p-4 bg-orange-100 rounded-full flex items-center justify-center">
              <IoMdCamera className="text-orange-600 text-xl" />
            </div>
            <div className="text-start">
              <p className="text-sm font-medium text-gray-800">Crop Analysis</p>
              <p className="text-xs text-gray-500">
                Upload photo for instant analysis
              </p>
            </div>
          </div>
        </div>

        {/* Quick Help Section */}
        <div className="bg-green-50 p-4 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Quick Help</h2>
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white flex flex-col items-center justify-center rounded-xl shadow-md cursor-pointer p-3 hover:shadow-lg transition"
              >
                <div className={`p-4 ${card.bg} rounded-full mb-3`}>
                  {card.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Weather Card */}
          <div className="mt-4 p-4 rounded-xl shadow bg-white">
            <h3 className="text-sm font-semibold text-gray-600">
              Today's Weather
            </h3>
            <p className="text-xs text-gray-500">Kochi, Kerala</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-800">28°C</span>
              <div className="flex flex-col items-center">
                <BsCloudSunFill className="w-8 h-8 text-orange-500 mb-1" />
                <p className="font-medium text-gray-700 text-sm">
                  Partly Cloudy
                </p>
                <p className="text-green-600 text-xs font-semibold">
                  Good for farming
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
