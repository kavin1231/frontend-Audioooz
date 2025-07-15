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

  useEffect(() => {
    AOS.init({ duration: 1000 });

    if (state === "loading") {
      axios
        .get(`${BackendUrl}/api/products`)
        .then((res) => {
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  return (
    <>
      <Header />

      <div
        className="min-h-screen w-full bg-cover bg-center flex flex-wrap justify-center items-start gap-6 pt-24 px-4"
        style={{ backgroundImage: "url('/listingbg.jpg')" }}
      >
        {state === "loading" && (
          <div
            className="flex justify-center items-center min-h-screen w-full"
            data-aos="fade-in"
          >
            <div className="w-12 h-12 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {state === "success" &&
          items.map((item, index) => (
            <div
              key={item.key}
              data-aos="zoom-in-up"
              data-aos-delay={(index % 6) * 100} // staggered animation
            >
              <ProductCard item={item} />
            </div>
          ))}

        {state === "error" && (
          <div
            className="text-red-500 text-lg font-semibold mt-8"
            data-aos="fade-down"
          >
            Failed to load products.
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
