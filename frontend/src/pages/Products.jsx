import { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {products.map((p) => (
        <div key={p._id} className="mb-2">
          {p.name} – ₹{p.price} – Stock: {p.stock}
        </div>
      ))}
    </div>
  );
}

export default Products;
