import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../mediaUpload";


export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("Stage Audios");
  const [productSubcategory, setProductSubcategory] = useState("Stage");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();

  async function handleAddItem() {
    const promises = [];
    for (let i = 0; i < productImages.length; i++) {
      const promise = mediaUpload(productImages[i]);
      promises.push(promise);
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const imageUrls = await Promise.all(promises);

        const result = await axios.post(
          "http://localhost:3005/api/products",
          {
            key: productKey,
            name: productName,
            price: productPrice,
            category: productCategory,
            subcategory: productSubcategory,
            dimensions: productDimensions,
            description: productDescription,
            image: imageUrls,
            availability: availability,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(result.data.message);
        navigate("/admin/items");
      } catch (err) {
        toast.error(err.response?.data?.error || "Something went wrong");
      }
    } else {
      toast.error("You are not authorized to add items");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-lg font-bold mb-4">Add Product</h1>
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
          <option value="Stage Audios">Stage Audios</option>
          <option value="Speakers">Speakers</option>
          <option value="Music Items">Music Items</option>
          <option value="uncategorized">Uncategorized</option>
        </select>

        <select
          value={productSubcategory}
          onChange={(e) => setProductSubcategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="stage">stage</option>
          <option value="Large Speakers">Large Speakers</option>
          <option value="uncategorized">Uncategorized</option>
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

        <div className="w-full flex items-center justify-between">
          <label htmlFor="availability">Available?</label>
          <input
            id="availability"
            type="checkbox"
            checked={availability}
            onChange={() => setAvailability(!availability)}
          />
        </div>

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
