import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Sidebar from "./components/layout/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminRoute from "./routes/AdminRoute";

const PrivateRoute = ({ children }) => {
  const user = useSelector((s) => s.auth.user);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div className="flex bg-slate-900 min-h-screen text-white">
              <Sidebar />
              <div className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<AdminRoute><Dashboard /></AdminRoute>} />
                  <Route path="/products" element={<AdminRoute><Products /></AdminRoute>} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
