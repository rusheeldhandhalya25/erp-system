import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/slices/orderSlice";
import { reduceStock } from "../redux/slices/productSlices";
import { useState } from "react";

function Orders() {

  const dispatch = useDispatch();

  // Redux data
  const products = useSelector(
    (state) => state.products.list
  );

  const orders = useSelector(
    (state) => state.orders.list
  );

  // Local state
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handlePlaceOrder = () => {
    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) return;

    if (quantity > product.stock) {
      alert("Not enough stock");
      return;
    }

    // 1️⃣ Add order
    dispatch(
      addOrder({
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity
      })
    );

    // 2️⃣ Reduce inventory
    dispatch(
      reduceStock({
        productId: product.id,
        quantity: quantity
      })
    );

    // reset form
    setProductId("");
    setQuantity(1);
  };

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold text-gray-100 mb-6">
        Orders
      </h2>

      {/* Order Form */}
      <div className="mb-8">

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded mb-3 block w-64"
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-gray-800 px-3 py-2 rounded mb-3 block w-64"
        />

        <button
          onClick={handlePlaceOrder}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Place Order
        </button>

      </div>

      {/* Orders Table */}
      {orders.length > 0 && (
        <div>

          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Orders List
          </h3>

          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="border border-gray-700 px-3 py-2">
                  Product
                </th>
                <th className="border border-gray-700 px-3 py-2">
                  Price
                </th>
                <th className="border border-gray-700 px-3 py-2">
                  Quantity
                </th>
                <th className="border border-gray-700 px-3 py-2">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border border-gray-700 px-3 py-2">
                    {order.productName}
                  </td>
                  <td className="border border-gray-700 px-3 py-2">
                    ₹{order.price}
                  </td>
                  <td className="border border-gray-700 px-3 py-2">
                    {order.quantity}
                  </td>
                  <td className="border border-gray-700 px-3 py-2">
                    ₹{order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  );
}

export default Orders;
