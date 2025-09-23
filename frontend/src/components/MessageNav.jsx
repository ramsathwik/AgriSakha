import { NavLink } from "react-router-dom";
function MsgNav() {
  const linkClasses = ({ isActive }) =>
    `flex flex-col items-center text-sm ${
      isActive
        ? "bg-green-600 text-white px-5 py-2 rounded-3xl"
        : "bg-gray-600 text-white px-5 py-2 rounded-2xl"
    }`;
  return (
    <div className="flex-1 pt-20 pb-4 px-2 overflow-y-auto space-y-4">
      <div className="flex items-center justify-evenly ">
        <NavLink to="all" className={linkClasses}>
          <p className="text-white font-semibold">All(6)</p>
        </NavLink>
        <NavLink to="unread" className={linkClasses}>
          <div className="text-white font-semibold">Unread(2)</div>
        </NavLink>
        <NavLink to="urgent" className={linkClasses}>
          <div className="text-white font-semibold">Urgent(2)</div>
        </NavLink>
      </div>
    </div>
  );
}
export default MsgNav;
