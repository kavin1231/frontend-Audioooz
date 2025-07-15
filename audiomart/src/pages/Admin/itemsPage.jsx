import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(`${API_BASE_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setItems(res.data);
          setItemsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load products:", err);
        });
    }
  }, [itemsLoaded, API_BASE_URL]);

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = localStorage.getItem("token");

      // Optimistically remove item from UI
      setItems((prev) => prev.filter((item) => item.key !== key));

      axios
        .delete(`${API_BASE_URL}/api/products/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setItemsLoaded(false); // trigger reload to sync
        })
        .catch((err) => {
          console.error("Failed to delete product:", err);
          // On error, reload items to recover state
          setItemsLoaded(false);
        });
    }
  };

  return (
    <div className="w-full h-full p-4 relative flex flex-col items-center">
      {!itemsLoaded && (
        <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px]" />
      )}
      {itemsLoaded && (
        <div className="overflow-x-auto w-full max-w-7xl">
          <table className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="p-3 border">Key</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Dimensions</th>
                <th className="p-3 border">Availability</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product, index) => (
                <tr
                  key={product.key}
                  className={`border ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200 transition-all`}
                >
                  <td className="p-3 border">{product.key}</td>
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 border">LKR.{product.price.toFixed(2)}</td>
                  <td className="p-3 border">{product.category}</td>
                  <td className="p-3 border">{product.dimensions}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        product.availability
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.availability ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="p-3 border flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate("/admin/items/edit", { state: product })
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      aria-label={`Edit ${product.name}`}
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.key)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      aria-label={`Delete ${product.name}`}
                    >
                      <FaTrashAlt className="inline mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link
        to="/admin/items/add"
        className="fixed bottom-6 right-6"
        aria-label="Add new item"
      >
        <CiCirclePlus className="text-[70px] text-blue-600 hover:text-red-900 transition duration-200 cursor-pointer" />
      </Link>
    </div>
  );
}
