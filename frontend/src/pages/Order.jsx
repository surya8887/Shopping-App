import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Order = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-8 lg:px-16 bg-white min-h-screen">
      <div className="text-3xl mb-6">
        <Title text1="MY" text2="ORDER" />
      </div>

      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="border-b pb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Product Info */}
            <div className="flex items-start gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                  <span className="text-base text-gray-700">{currency}{item.price}</span>
                  <span>Qty: 1</span>
                  <span>Size: M</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Date: <span className="text-gray-600">25 July, 2024</span>
                </p>
              </div>
            </div>

            {/* Order Status + Track */}
            <div className="flex justify-between md:w-1/2 md:justify-end items-center gap-6">
              <div className="flex items-center gap-2 text-green-600">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium">Ready to Ship</span>
              </div>
              <button className="px-5 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
