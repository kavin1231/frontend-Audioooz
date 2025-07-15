import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

// ✅ Backend URL from environment
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("Speakers");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  async function handleAddItem() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized to add items");
      return;
    }

    try {
      // Upload all selected images using mediaUpload
      const promises = Array.from(productImages).map((file) => mediaUpload(file));
      const imageUrls = await Promise.all(promises);

      // Construct product data
      const productData = {
        key: productKey,
        name: productName,
        price: productPrice,
        category: productCategory,
        dimensions: productDimensions,
        description: productDescription,
        image: imageUrls,
      };

      const result = await axios.post(`${BackendUrl}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(result.data.message || "Item added successfully");
      navigate("/admin/items");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add product");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-lg font-bold mb-4">Add Items</h1>
      <div className="w-[400px] border p-4 flex flex-col items-center gap-2 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Speakers">Audio</option>
          <option value="Lights">Lights</option>
        </select>
        <input
          type="text"
          placeholder="Product Dimensions"
          value={productDimensions}
          onChange={(e) => setProductDimensions(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setProductImages(e.target.files)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddItem}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
        <button
          onClick={() => navigate("/admin/items")}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
