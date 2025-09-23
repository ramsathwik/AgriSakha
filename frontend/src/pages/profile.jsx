import { AiFillEdit } from "../components/icons";

import { NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="h-screen bg-green-50 flex flex-col">
      {/* Fixed Top Bar */}
      <div className="fixed left-0 right-0 top-0 flex justify-between bg-green-600 text-white py-5 px-4 items-center z-50">
        <h1 className="font-semibold text-lg sm:text-xl">Profile</h1>
        <NavLink to="/notifications">
          <AiFillEdit className="text-xl" />
        </NavLink>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 pt-20 pb-16 px-4 overflow-y-auto space-y-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
