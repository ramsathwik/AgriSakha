import { NavLink } from "react-router-dom";
import {
  CiCalendar,
  RiPlantFill,
  FaShield,
  AiOutlineScissor,
} from "../components/icons";
function TipsNav() {
  const linkClasses = ({ isActive }) =>
    `flex flex-col items-center text-sm ${
      isActive
        ? "bg-green-600 text-white px-5 py-2 rounded"
        : "bg-gray-600 text-white px-5 py-2 rounded"
    }`;
  return (
    <div className="flex px-2 py-2 space-x-4 text-sm font-medium flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
      <NavLink to="seasonal" className={linkClasses}>
        <div className="flex items-center gap-1">
          <CiCalendar className="text-lg" />
          Seasonal Tips
        </div>
      </NavLink>
      <NavLink to="cropcare" className={linkClasses}>
        <div className="flex items-center gap-1">
          <RiPlantFill className="text-lg" />
          Crop Care
        </div>
      </NavLink>
      <NavLink to="protection" className={linkClasses}>
        <div className="flex items-center gap-1">
          <FaShield className="text-lg" />
          protection
        </div>
      </NavLink>
      <NavLink to="harvest" className={linkClasses}>
        <div className="flex items-center gap-1">
          <AiOutlineScissor className="text-lg" />
          Harvest
        </div>
      </NavLink>
    </div>
  );
}
export default TipsNav;
