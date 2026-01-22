import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // login ke time jo user store kiya tha
  const user = JSON.parse(localStorage.getItem("user"));

  // agar login hi nahi ya admin nahi
  if (!user || user.role !== "admin") {
    return <Navigate to="/orders" replace />;
  }

  // admin hai → page allow
  return children;
};

export default AdminRoute;
