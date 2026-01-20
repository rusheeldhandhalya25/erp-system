import { useLocation } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/products") return "Products";
    if (location.pathname === "/orders") return "Orders";
    return "ERP System";
  };

  return (
    <div className="h-14 bg-gray-900 border-b border-white/10 flex items-center px-4 md:px-6 relative">

      {/* ☰ Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-2xl text-white"
      >
        ☰
      </button>

      {/* Title (always centered) */}
      <h1 className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-semibold text-gray-200">
        {getTitle()}
      </h1>

    </div>
  );
}

export default Navbar;
