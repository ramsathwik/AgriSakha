import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("expiry");

  const isValid = token && expiry && new Date().getTime() < Number(expiry);
  return <>{isValid ? <Outlet /> : <Navigate to="/signup" replace />}</>;
}

export default ProtectedRoute;
