import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import Header from "../../header";
import Footer from "../../footer";
import AOS from "aos";
import "aos/dist/aos.css";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ProductPage() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    if (state === "loading") {
      axios
        .get(`${BackendUrl}/api/products`)
        .then((res) => {
          setItems(res.data);
          setFilteredItems(res.data); // initially show all
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  // Search filter logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, items]);

  return (
    <>
      <Header />

      {/* Search Input */}
      <div className="bg-white py-8 px-6 md:px-16 lg:px-24 xl:px-32">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-3xl mx-auto block px-4 py-2 rounded-full border border-black text-black bg-transparent placeholder-black outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
        />
      </div>

      <main
        className="min-h-[calc(100vh-160px)] w-full bg-cover bg-center flex flex-wrap justify-center items-start gap-6 pt-16 pb-16 px-4"
        style={{ backgroundImage: "url('/listingbg.jpg')" }}
      >
        {state === "loading" && (
          <div
            className="flex justify-center items-center min-h-[60vh] w-full"
            data-aos="fade-in"
          >
            <div className="w-12 h-12 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {state === "success" && filteredItems.length > 0 &&
          filteredItems.map((item, index) => (
            <div
              key={item.key}
              data-aos="zoom-in-up"
              data-aos-delay={(index % 6) * 100}
            >
              <ProductCard item={item} />
            </div>
          ))}

        {state === "success" && filteredItems.length === 0 && (
          <div
            className="text-yellow-400 text-lg font-semibold mt-8"
            data-aos="fade-down"
          >
            No products found matching your search.
          </div>
        )}

        {state === "error" && (
          <div
            className="text-red-500 text-lg font-semibold mt-8"
            data-aos="fade-down"
          >
            Failed to load products.
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
