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
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/notifications",
    element: <NotifyLayout />,
    children: [
      {
        index: true,
        element: <Notifications></Notifications>,
      },
    ],
  },
]);

export default router;
