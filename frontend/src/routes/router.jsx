import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Chat from "../pages/Chat";
import Camera from "../pages/Camera";
import Tips from "../pages/Tips";
import Profile from "../pages/profile";
import NotifyLayout from "../pages/NotifyLayout.jsx";
import Notifications from "../pages/Notifications.jsx";
import ProtectedRoute from "../components/Protected.jsx";
import Signup from "../components/signup.jsx";
import Login from "../components/login.jsx";
import SeasonalTips from "../pages/Tips/Seasonaltips.jsx";
import ProtectionTips from "../pages/Tips/Protectiontips.jsx";
import CropcareTips from "../pages/Tips/Cropcaretips.jsx";
import HarvestTips from "../pages/Tips/HarvestTips.jsx";
import All from "../pages/Notifications/All.jsx";
import Unread from "../pages/Notifications/Unread.jsx";
import Urgent from "../pages/Notifications/Urgent.jsx";
import Profiletabs from "../components/ProfileTabs.jsx";
import SavedTips from "../pages/Profile/Saved.jsx";
import Contacts from "../pages/Profile/Contacts.jsx";
import { Navigate } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <Navigate to="/home" replace />,
          },

          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/chat",
            element: <Chat />,
          },
          {
            path: "/camera",
            element: <Camera />,
          },
          {
            path: "/tips",
            element: <Tips />,
            children: [
              {
                index: true,
                element: <Navigate to="seasonal" replace />,
              },
              {
                path: "seasonal",
                element: <SeasonalTips />,
              },
              {
                path: "cropcare",
                element: <CropcareTips />,
              },
              {
                path: "protection",
                element: <ProtectionTips />,
              },
              {
                path: "harvest",
                element: <HarvestTips />,
              },
            ],
          },
          {
            path: "/profile",
            element: <Profile />,
            children: [
              {
                path: "",
                element: <Profiletabs />,
              },
              {
                path: "saved-tips",
                element: <SavedTips />,
              },
              {
                path: "emergency-contacts",
                element: <Contacts />,
              },
            ],
          },
          {
            path: "/notifications",
            element: <Notifications />,
            children: [
              {
                index: true,
                element: <Navigate to="all" replace />,
              },
              ,
              {
                path: "all",
                element: <All />,
              },
              {
                path: "unread",
                element: <Unread />,
              },
              {
                path: "urgent",
                element: <Urgent />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
