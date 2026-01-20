import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../redux/slices/productSlices";
import { useState } from "react";

function Products() {

  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.list
  );

  // local form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    if (!form.name) return;

    dispatch(
      addProduct({
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category
      })
    );

    setForm({
      name: "",
      price: "",
      stock: "",
      category: ""
    });
  };

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold text-gray-100 mb-6">
        Products
      </h2>

      {/* Add Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="bg-gray-800 px-3 py-2 rounded"
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="bg-gray-800 px-3 py-2 rounded"
        />

        <input
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="bg-gray-800 px-3 py-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="bg-gray-800 px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleAdd}
        className="mb-6 px-4 py-2 bg-blue-600 rounded"
      >
        Add Product
      </button>

      {/* Product List */}
      <div className="space-y-3">
        {products.map((item) => (
          <div
            key={item.id}
            className="flex justify-between bg-gray-800 px-4 py-2 rounded"
          >
            <div>
              <p className="font-semibold break-words">{item.name}</p>
              <p className="text-sm text-gray-400">
                ₹{item.price} | Stock: {item.stock} | {item.category}
              </p>
            </div>

            <button
              onClick={() => dispatch(removeProduct(item.id))}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Products;
