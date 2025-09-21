import { IoIosNotifications } from "react-icons/io";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="flex justify-between bg-green-600 text-white py-2 items-center px-1">
      <h1>AgriSakha</h1>
      <NavLink to="/notifications">
        <IoIosNotifications className="text-xl" />
      </NavLink>
    </div>
  );
}
export default Header;
