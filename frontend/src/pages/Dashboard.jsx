import { useSelector } from "react-redux";

function Dashboard() {

  // Redux data
  const products = useSelector(
    (state) => state.products.list
  );

  const orders = useSelector(
    (state) => state.orders.list
  );

  // Analytics (derived data)
  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const lowStockCount = products.filter(
    (p) => p.stock <= 5
  ).length;

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold text-gray-100 mb-6">
        Dashboard
      </h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Total Products</p>
          <p className="text-2xl font-bold text-white">
            {totalProducts}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Total Orders</p>
          <p className="text-2xl font-bold text-white">
            {totalOrders}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Total Revenue</p>
          <p className="text-2xl font-bold text-white">
            ₹{totalRevenue}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Low Stock Items</p>
          <p className="text-2xl font-bold text-red-400">
            {lowStockCount}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
