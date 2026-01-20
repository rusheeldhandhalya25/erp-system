import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64 bg-gray-900 text-gray-200 p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold mb-8">
          ERP System
        </h2>

        <nav className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${
              isActive("/dashboard")
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/products"
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${
              isActive("/products")
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            Products
          </Link>

          <Link
            to="/orders"
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${
              isActive("/orders")
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            Orders
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
