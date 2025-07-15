import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductCard({ item }) {
  if (!item) return null;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((product) => product.key === item.key);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item added to cart!");
  };

  return (
    <div className="flex flex-col bg-white shadow-md w-72 h-[480px] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <img
        className="w-full h-48 object-cover"
        src={item.image?.[0] || "/placeholder.jpg"}
        alt={item.name || "Product Image"}
      />

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Price */}
        <p className="text-green-600 font-semibold text-base">
          LKR {Number(item.price).toFixed(2)}
        </p>

        {/* Name */}
        <p className="text-slate-800 text-lg font-medium mt-1 line-clamp-1">
          {item.name}
        </p>

        {/* Description */}
        <p className="text-slate-500 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>

        {/* Dimensions */}
        <p className="text-xs text-gray-600 mt-2 line-clamp-1">
          <span className="font-medium">Dimensions:</span> {item.dimensions}
        </p>

        {/* Availability Badge */}
        <span
          className={`mt-2 inline-block w-max text-xs font-medium px-3 py-1 rounded-full ${
            item.availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.availability ? "In Stock" : "Out of Stock"}
        </span>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            className="bg-slate-100 text-slate-600 py-2 rounded hover:bg-slate-200 transition"
            onClick={handleAddToCart}
            disabled={!item.availability}
          >
            Add to cart
          </button>
          <Link
            to={`/product/${item.key}`}
            className="bg-slate-800 text-white py-2 text-center rounded hover:bg-slate-900 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
