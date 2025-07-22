import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, getCartAmount,navigate, delivery_fee } = useContext(ShopContext);

  const subtotal = getCartAmount?.() || 0;
  const tax = Math.round(subtotal * 0.1); // assuming 10% tax
  const total = subtotal + tax + delivery_fee;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="text-2xl mb-4">
        <Title text1="Cart" text2="Totals" />
      </div>

      <div className="flex flex-col gap-4 text-sm sm:text-base">
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>{currency} {subtotal}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Tax (10%):</p>
          <p>{currency} {tax}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee:</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-semibold">
          <p>Total:</p>
          <p>{currency} {total}</p>
        </div>

        {/* ✅ Checkout Button */}
     
      </div>
    </div>
  );
};

export default CartTotal;
