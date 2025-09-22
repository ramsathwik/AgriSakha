import Navbar from "../components/Nav";
import { Outlet } from "react-router-dom";
import NotifyHeader from "../components/NotifyHeader";
function NotifyLayout() {
  return (
    <div>
      <NotifyHeader></NotifyHeader>
      <Outlet></Outlet>
      <Navbar></Navbar>
    </div>
  );
}
export default NotifyLayout;
