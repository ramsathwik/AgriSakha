import { NavLink } from "react-router-dom";
import { IoHome, IoChatbox } from "react-icons/io5";
import { FaCamera, FaUser } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";

function Navbar() {
  const linkClasses = ({ isActive }) =>
    `flex flex-col items-center text-sm ${
      isActive ? "text-green-600" : "text-gray-400"
    }`;

  return (
    <div className="flex fixed bottom-0 left-0 right-0 justify-evenly bg-gray-200 py-2">
      <NavLink to="/" className={linkClasses} end>
        <IoHome size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/chat" className={linkClasses}>
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
