import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      const item = products.find((item) => item._id === productId);
      if (item) {
        setProductData(item);
        setSelectedImage(item.image[0]);
      } else {
        console.warn("Product not found");
      }
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <p className="text-center text-gray-500 py-10">Loading product details...</p>
    );
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-3 md:w-28 overflow-x-auto md:overflow-y-auto">
          {productData.image.map((img, index) => (
            <img
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${selectedImage === img ? "border-black" : "border-transparent"
                } transition duration-200`}
              src={img}
              alt={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <img
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
            src={selectedImage}
            alt="Selected Product"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array(4).fill(null).map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <p className="pl-2 text-sm text-gray-600">(122 reviews)</p>
          </div>

          <p className="text-3xl font-semibold mt-4">
            {currency}
            {productData.price}
          </p>

          <p className="mt-4 text-gray-600 md:w-4/5 text-sm">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="mt-6">
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 rounded border text-sm ${item === size
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-300"
                    } hover:border-orange-400 transition`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white px-8 py-3 text-sm rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>

          {/* Guarantee Info */}
          <hr className="my-6" />
          <div className="text-sm text-gray-700 space-y-1">
            <p>✔️ 100% Authentic Products</p>
            <p>✔️ Cash on Delivery Available</p>
            <p>✔️ 7-Day Easy Returns & Exchange</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex">
          <p className="border px-5 py-3 text-sm font-medium">Description</p>
          <p className="border px-5 py-3 text-sm font-medium">Reviews</p>
        </div>

        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500">
          <p>
            This product is crafted using premium quality materials and tested to meet top standards. Designed for everyday comfort and style, it’s a perfect addition to your wardrobe.
          </p>
          <p>
            We take pride in offering versatile pieces that blend modern design with timeless appeal. Whether for work, travel, or daily wear—this product delivers quality and value.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
