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
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isListening, setIsListening] = useState(false);
  const timeoutRef = useRef(null);
  let navigate = useNavigate();
  function handleOnClick(suggestions) {
    navigate("/chat", { state: suggestions });
  }

  const handleVoiceClick = () => {
    setIsListening(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setIsListening(false);
      timeoutRef.current = null; // reset
    }, 3000);
  };
  const chatSuggestions = [
    "Track current market prices for major crops.",
    "Plan selling based on peak price periods.",
    "Compare prices across local and nearby markets.",
    "Store crops properly to avoid post-harvest losses.",
    "Monitor crops for pests and diseases.",
    "Use organic compost or fertilizers.",
    "Irrigate crops early morning or late evening.",
    "Rotate crops each season.",
    "Check local weather forecasts.",
  ];

  const cards = [
    {
      title: "Pest Control",
      icon: <FaBug className="w-6 h-6 text-red-600" />,
      bg: "bg-red-100",
      suggestions: [
        "Check for early signs of pest infestation in your crops.",
        "Use neem oil or bio-pesticides to control common pests.",
        "Rotate crops to prevent pest buildup in the soil.",
        "Keep field edges clean to avoid pest hiding spots.",
      ],
    },
    {
      title: "Weather Update",
      icon: <CiCloud className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-100",
      suggestions: [
        "Check daily rainfall forecasts to plan irrigation.",
        "Protect seedlings from heavy winds or storms.",
        "Adjust fertilizer application according to upcoming rain.",
        "Monitor temperature fluctuations for sensitive crops.",
      ],
    },
    {
      title: "Fertilizer Tips",
      icon: <Sprout className="w-6 h-6 text-green-500" />,
      bg: "bg-green-100",
      suggestions: [
        "Apply fertilizers based on soil nutrient tests.",
        "Split fertilizer doses to avoid nutrient loss.",
        "Use organic compost along with chemical fertilizers.",
        "Ensure proper irrigation after applying fertilizers.",
      ],
    },
    {
      title: "Crop Care",
      icon: <RiPlantFill className="w-6 h-6 text-yellow-600" />,
      bg: "bg-yellow-100",
      suggestions: [
        "Regularly monitor crop growth stages.",
        "Ensure proper spacing between plants for healthy growth.",
        "Mulch soil to retain moisture and reduce weeds.",
        "Prune damaged leaves and branches promptly.",
      ],
    },
    {
      title: "Government Schemes",
      icon: <RiGovernmentFill className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
      suggestions: [
        "Check for subsidies available for irrigation equipment.",
        "Apply for crop insurance before sowing season.",
        "Explore schemes for organic farming support.",
        "Stay updated on government loans and grants for farmers.",
      ],
    },
    {
      title: "Market Prices",
      icon: <FaRupeeSign className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100",
      suggestions: [
        "Track current market prices for major crops.",
        "Plan selling based on peak price periods.",
        "Compare prices across local and nearby markets.",
        "Store crops properly to avoid post-harvest losses.",
      ],
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
          <NavLink
            to="/chat"
            className="bg-white flex flex-col items-center justify-center rounded-xl shadow-md cursor-pointer p-3 hover:shadow-lg transition"
            state={chatSuggestions}
          >
            <div className="p-4 bg-green-100 rounded-full mb-3">
              <IoChatbubble className="text-green-600 text-xl" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">Ask Question</p>
              <p className="text-xs text-gray-500">Type your question</p>
            </div>
          </NavLink>

          <div
            className="flex flex-col items-center justify-center rounded-xl shadow-md cursor-pointer p-3 hover:shadow-lg transition bg-white text-gray-800"
            onClick={handleVoiceClick}
          >
            {/* Mic Circle */}
            <div
              className={`p-4 rounded-full mb-3 transition-colors duration-300
      ${
        isListening
          ? "bg-red-600 text-white animate-pulse"
          : "bg-blue-100 text-blue-600"
      }`}
            >
              <FaMicrophone className="text-xl" />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="text-sm font-medium">
                {isListening ? "Recording..." : "Voice Query"}
              </p>
              <p className="text-xs text-gray-500">Speak Your Question</p>
            </div>
          </div>

          <NavLink
            to="/camera"
            className="bg-white flex items-center justify-start gap-4 rounded-xl shadow-md cursor-pointer p-6 hover:shadow-lg transition col-span-2"
          >
            <div className="p-4 bg-orange-100 rounded-full flex items-center justify-center">
              <IoMdCamera className="text-orange-600 text-xl" />
            </div>
            <div className="text-start">
              <p className="text-sm font-medium text-gray-800">Crop Analysis</p>
              <p className="text-xs text-gray-500">
                Upload photo for instant analysis
              </p>
            </div>
          </NavLink>
        </div>

        {/* Quick Help Section */}
        <div className="bg-green-50 p-4 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Quick Help</h2>
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white flex flex-col items-center justify-center rounded-xl shadow-md cursor-pointer p-3 hover:shadow-lg transition"
                onClick={() => {
                  handleOnClick(card.suggestions);
                }}
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
