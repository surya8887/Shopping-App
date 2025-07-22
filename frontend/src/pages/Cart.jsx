import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!cartItems || typeof cartItems !== 'object') return;

    const tempData = [];
    for (const productId in cartItems) {
      const sizes = cartItems[productId];
      if (!sizes || typeof sizes !== 'object') continue;

      for (const size in sizes) {
        const quantity = sizes[size];
        if (quantity > 0) {
          tempData.push({ _id: productId, size, quantity });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-10 px-4 sm:px-8 md:px-16">
      <div className="text-3xl font-semibold mb-6">
        <Title text1="Your" text2="Cart" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartData.map((item) => {
            const productData = products.find(p => p._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={`${item._id}-${item.size}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg shadow-sm bg-white"
              >
                {/* Image + Info */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  {/* Image */}
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-lg"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mt-2 sm:mt-0">
                      {productData.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                      <span><strong>Price:</strong> {currency}{productData.price}</span>
                      <span className="px-3 py-1 border rounded bg-slate-100">
                        Size: {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity & Delete */}
                <div className="flex justify-between sm:justify-end items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <label htmlFor={`qty-${item._id}-${item.size}`} className="text-sm">
                      Qty:
                    </label>
                    <input
                      id={`qty-${item._id}-${item.size}`}
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value) && value >= 1) {
                          updateQuantity(item._id, item.size, value);
                        }
                      }}
                      className="w-16 border px-2 py-1 text-center rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="hover:scale-110 transition-transform"
                    title="Remove item"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-6 sm:w-5 md:w-6 lg:w-7 xl:w-8 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Total Section */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-10">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
