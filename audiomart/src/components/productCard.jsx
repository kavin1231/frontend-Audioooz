import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  if (!item) return null;

  return (
    <div className="flex flex-col bg-white shadow-md w-72 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={item.image?.[0] || "/placeholder.jpg"}
        alt={item.name || "Product Image"}
      />

      <div className="p-4 text-sm flex flex-col justify-between h-full">
        <p className="text-green-600 font-semibold text-base">
          LKR {Number(item.price).toFixed(2)}
        </p>

        <p className="text-slate-800 text-lg font-medium mt-1">
          {item.name}
        </p>

        <p className="text-slate-500 mt-1 line-clamp-2">
          {item.description}
        </p>

        <p className="text-xs text-gray-600 mt-2">
          <span className="font-medium">Dimensions:</span> {item.dimensions}
        </p>

        <span
          className={`mt-2 inline-block w-max text-xs font-medium px-3 py-1 rounded-full ${
            item.availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.availability ? "In Stock" : "Out of Stock"}
        </span>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="bg-slate-100 text-slate-600 py-2 rounded hover:bg-slate-200 transition">
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
