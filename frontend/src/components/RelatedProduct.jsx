import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import {ProductItem} from "../components/ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory);

      setRelated(filtered.slice(0, 5)); // max 5 related products
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 px-4 max-w-7xl mx-auto">
      <div className="text-center">
        <Title text1="Related" text2="Products" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
