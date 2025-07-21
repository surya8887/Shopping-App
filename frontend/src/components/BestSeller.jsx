import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { ProductItem } from './ProductItem';

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className='my-10'>
      <div className="text-center py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="font-poppins max-w-3xl mx-auto text-center text-gray-700 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed px-3 sm:px-6">
  Handpicked bestsellers loved by our customers. Explore trending products with top reviews and unbeatable quality.
</p>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
