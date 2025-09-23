import MsgNav from "../components/MessageNav";
import { Outlet } from "react-router-dom";
function Notifications() {
  return (
    <div className="h-screen flex flex-col">
      <div className="fixed left-0 right-0 top-0 flex justify-between bg-green-600 text-white py-5 px-4 items-center z-50">
        <h1 className="font-semibold text-lg sm:text-xl">Notifications</h1>
        <p className="text-green-500 text-xs">mark all read</p>
      </div>
      <div className="overflow-y-auto space-y-4 pb-20 no-scrollbar">
        <MsgNav />
        <Outlet />
      </div>
    </div>
  );
}
export default Notifications;
