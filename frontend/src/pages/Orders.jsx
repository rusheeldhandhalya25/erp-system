import { useEffect, useState } from "react";
import { fetchProducts, placeOrder } from "../api/api";

function Orders() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleOrder = async () => {
    if (!productId || !quantity) return;

    await placeOrder({ productId, quantity });
    alert("Order placed successfully");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      <select
        onChange={(e) => setProductId(e.target.value)}
        className="block mb-3 p-2 bg-gray-800"
      >
        <option value="">Select product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} (Stock: {p.stock})
          </option>
        ))}
      </select>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="block mb-3 p-2 bg-gray-800"
      />

      <button
        onClick={handleOrder}
        className="px-4 py-2 bg-blue-600"
      >
        Place Order
      </button>
    </div>
  );
}

export default Orders;
