import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import Header from "../../header";
import Footer from "../../footer";

export default function ProductPage() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`http://localhost:3005/api/products`)
        .then((res) => {
          console.log(res.data);
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
          <div className="flex justify-center items-center min-h-screen w-full">
            <div className="w-12 h-12 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {state === "success" &&
          items.map((item) => <ProductCard key={item.key} item={item} />)}

        {state === "error" && (
          <div className="text-red-500 text-lg font-semibold mt-8">
            Failed to load products.
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
