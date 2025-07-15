import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCart, addToCart, removeFromCart } from "../../utils/cartFunction";
import axios from "axios";
import Header from "../../header";
import Footer from "../../footer";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = loadCart();
    setCartItems(cart);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/api/products/`);
        const allProducts = response.data;
        const filteredProducts = allProducts.filter((product) =>
          cart.some((item) => item.key && item.key === product.key)
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);

  const updateQuantity = (key, delta) => {
    addToCart(key, delta);
    const updatedCart = loadCart();
    setCartItems(updatedCart);
  };

  const removeProduct = (key) => {
    removeFromCart(key);
    const updatedCart = loadCart();
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.key === item.key);
      if (!product) return sum;
      return sum + product.price * item.qty;
    }, 0);
  };

  const handleCheckout = () => {
    navigate("/booking/:key");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-10">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {loading ? (
          <div>Loading cart...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : cartItems.length === 0 ? (
          <div className="text-gray-600">Your cart is empty.</div>
        ) : (
          <>
            <ul>
              {cartItems.map((item, index) => {
                if (!item.key) {
                  return (
                    <li key={index} className="mb-4 p-2 border rounded text-red-600">
                      Invalid cart item detected.
                    </li>
                  );
                }
                const product = products.find((p) => p.key === item.key);
                if (!product) {
                  return (
                    <li
                      key={index}
                      className="mb-4 p-2 border rounded text-yellow-600"
                    >
                      Product with key "{item.key}" not found.
                    </li>
                  );
                }
                return (
                  <li
                    key={index}
                    className="flex items-center mb-4 border p-2 rounded bg-white shadow-sm"
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p>Price: LKR {product.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          className="bg-gray-300 px-2 rounded"
                          onClick={() => updateQuantity(item.key, -1)}
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          className="bg-gray-300 px-2 rounded"
                          onClick={() => updateQuantity(item.key, 1)}
                        >
                          +
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                          onClick={() => removeProduct(item.key)}
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-1">
                        Total: LKR {(product.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex justify-between items-center bg-blue-50 p-4 rounded shadow">
              <div className="text-xl font-semibold">
                Total: LKR {calculateTotal().toFixed(2)}
              </div>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleCheckout}
              >
                Checkout & Payment
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
