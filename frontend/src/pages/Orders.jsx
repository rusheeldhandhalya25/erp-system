import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, addOrder } from "../redux/slices/orderSlice";
import { fetchProducts } from "../redux/slices/productSlices";

const Orders = () => {
  const dispatch = useDispatch();

  const { items: orders, loading, error } = useSelector(
    (state) => state.orders
  );
  const { items: products } = useSelector(
    (state) => state.products
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [qtyError, setQtyError] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductChange = (e) => {
    const product = products.find(
      (p) => p._id === e.target.value
    );
    setSelectedProduct(product);
    setQuantity("");
    setQtyError("");
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value);

    if (value > selectedProduct.stock) {
      setQtyError("Quantity exceeds available stock");
    } else if (value <= 0) {
      setQtyError("Quantity must be at least 1");
    } else {
      setQtyError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || qtyError) return;

    dispatch(
  addOrder({
    productId: selectedProduct._id,
    quantity,
  })
);


    setSelectedProduct(null);
    setQuantity("");
    setQtyError("");
  };

  const total =
    selectedProduct && quantity
      ? quantity * selectedProduct.price
      : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* CREATE ORDER */}
      <div className="bg-slate-800 p-5 rounded border border-slate-700">
        <h2 className="font-semibold mb-4">Create Order</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* PRODUCT SELECT */}
          <select
            onChange={handleProductChange}
            value={selectedProduct?._id || ""}
            required
            className="p-2 rounded bg-slate-700 text-white"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option
                key={p._id}
                value={p._id}
                disabled={p.stock === 0}
              >
                {p.name} {p.stock === 0 && "(Out of Stock)"}
              </option>
            ))}
          </select>

          {/* QUANTITY */}
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            disabled={!selectedProduct}
            className="p-2 rounded bg-slate-700 text-white"
          />

          {/* ERROR */}
          {qtyError && (
            <p className="text-red-400 md:col-span-2">
              {qtyError}
            </p>
          )}

          {/* SUMMARY */}
          {selectedProduct && !qtyError && quantity > 0 && (
            <div className="md:col-span-2 bg-slate-900 p-4 rounded border border-slate-700 text-sm space-y-1">
              <p>
                <span className="text-gray-400">Product:</span>{" "}
                {selectedProduct.name}
              </p>
              <p>
                <span className="text-gray-400">Available Stock:</span>{" "}
                {selectedProduct.stock}
              </p>
              <p>
                <span className="text-gray-400">Unit Price:</span>{" "}
                ₹ {selectedProduct.price}
              </p>
              <p className="font-semibold text-lg">
                Total: ₹ {total}
              </p>

              {selectedProduct.stock <= 5 && (
                <p className="text-yellow-400">
                  ⚠ Low stock warning
                </p>
              )}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              disabled={!selectedProduct || qtyError || !quantity}
              className="bg-blue-600 disabled:bg-gray-600 px-6 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* ORDER LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-slate-800 p-4 rounded border border-slate-700"
          >
            <h3 className="font-semibold">{o.productName}</h3>
            <p>Qty: {o.quantity}</p>
            <p>Unit Price: ₹ {o.price}</p>
            <p className="font-bold">
              Total: ₹ {o.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
