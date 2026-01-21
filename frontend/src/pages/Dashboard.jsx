import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlices";
import { fetchOrders } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products } = useSelector(
    (state) => state.products
  );
  const { items: orders } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const lowStockProducts = products.filter(
    (p) => p.stock <= 5
  );

  const totalSales = orders.reduce(
    (sum, o) => sum + o.total,
    0
  );

  const today = new Date().toDateString();
  const todaysOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  );

  const todaysSales = todaysOrders.reduce(
    (sum, o) => sum + o.total,
    0
  );

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Stat title="Products" value={totalProducts} />
        <Stat title="Orders" value={totalOrders} />
        <Stat title="Low Stock" value={lowStockProducts.length} danger />
        <Stat title="Sales" value={`₹ ${totalSales}`} />
        <Stat title="Today Sales" value={`₹ ${todaysSales}`} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          ➕ Add Product
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="bg-green-600 px-4 py-2 rounded"
        >
          ➕ Create Order
        </button>
      </div>

      {/* LOW STOCK TABLE */}
      <div className="bg-slate-800 p-5 rounded border border-slate-700">
        <h2 className="font-semibold mb-3">
          ⚠ Low Stock Products
        </h2>

        {lowStockProducts.length === 0 ? (
          <p className="text-gray-400">
            All products are sufficiently stocked
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left py-1">Product</th>
                <th className="text-left py-1">Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td className="text-red-400">
                    {p.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-slate-800 p-5 rounded border border-slate-700">
        <h2 className="font-semibold mb-3">
          🕒 Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400">No orders yet</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((o) => (
              <div
                key={o._id}
                className="flex justify-between border-b border-slate-700 pb-1"
              >
                <span>
                  {o.productName} × {o.quantity}
                </span>
                <span className="font-medium">
                  ₹ {o.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Stat = ({ title, value, danger }) => (
  <div
    className={`p-4 rounded border ${
      danger
        ? "bg-red-900/30 border-red-700"
        : "bg-slate-800 border-slate-700"
    }`}
  >
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
