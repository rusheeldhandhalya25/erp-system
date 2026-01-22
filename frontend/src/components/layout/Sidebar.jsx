import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-60 bg-slate-800 p-4">
      <h2 className="text-xl font-bold mb-6">ERP</h2>

      <nav className="flex flex-col gap-3">
        {user?.role === "admin" && (
          <>
            <NavLink to="/" className="hover:text-blue-400">
              Dashboard
            </NavLink>

            <NavLink to="/products" className="hover:text-blue-400">
              Products
            </NavLink>
          </>
        )}

        <NavLink to="/orders" className="hover:text-blue-400">
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
