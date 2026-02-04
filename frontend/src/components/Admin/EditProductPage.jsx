import React, { useState } from "react";

const EditProductPage = () => {
  const [productdata, setProductdata] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" },
    ],
  });

  // Generic handler for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image upload handler (placeholder)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // console.log(file);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productdata);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productdata.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productdata.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productdata.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Count in Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productdata.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productdata.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes</label>
          <input
            type="text"
            value={productdata.sizes.join(", ")}
            onChange={(e) =>
              setProductdata((prev) => ({
                ...prev,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              }))
            }
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="S, M, L, XL"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            value={productdata.colors.join(", ")}
            onChange={(e) =>
              setProductdata((prev) => ({
                ...prev,
                colors: e.target.value.split(",").map((color) => color.trim()),
              }))
            }
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Red, Blue, Black"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />

          <div className="flex gap-4 mt-4">
            {productdata.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt="Product"
                className="w-20 h-20 object-cover rounded-md shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
