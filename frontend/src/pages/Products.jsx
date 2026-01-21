import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct } from "../redux/slices/productSlices";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProduct({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      })
    );

    setForm({ name: "", price: "", stock: "" });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>

      {/* ADD PRODUCT CARD */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">
          Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="p-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="p-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* STATUS */}
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div
            key={p._id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              {p.name}
            </h3>

            <div className="text-sm text-gray-300 space-y-1">
              <p>
                Price:{" "}
                <span className="text-white font-medium">
                  ₹ {p.price}
                </span>
              </p>

              <p>
                Stock:{" "}
                <span
                  className={
                    p.stock > 0
                      ? "text-green-400 font-medium"
                      : "text-red-400 font-medium"
                  }
                >
                  {p.stock}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
