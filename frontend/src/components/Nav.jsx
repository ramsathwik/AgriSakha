import { NavLink } from "react-router-dom";
import { IoHome, IoChatbox, FaCamera, FaUser, RiPlantFill } from "./icons";

function Navbar() {
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

  const linkClasses = ({ isActive }) =>
    `flex flex-col items-center text-sm ${
      isActive ? "text-green-600" : "text-gray-400"
    }`;

  return (
    <div className="flex fixed bottom-0 left-0 right-0 justify-evenly bg-gray-200 py-2 z-50">
      <NavLink to="/home" className={linkClasses} end>
        <IoHome size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/chat" className={linkClasses} state={chatSuggestions}>
        <IoChatbox size={20} />
        <span>Chat</span>
      </NavLink>

      <NavLink to="/camera" className={linkClasses}>
        <FaCamera size={20} />
        <span>Camera</span>
      </NavLink>

      <NavLink to="/tips" className={linkClasses}>
        <RiPlantFill size={20} />
        <span>Tips</span>
      </NavLink>

      <NavLink to="/profile" className={linkClasses}>
        <FaUser size={20} />
        <span>Profile</span>
      </NavLink>
    </div>
  );
}

export default Navbar;
