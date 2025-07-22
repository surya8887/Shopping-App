import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const taxRate = 0.05; // 5% tax
  const taxAmount = +(subtotal * taxRate).toFixed(2);
  const total = subtotal > 0 ? subtotal + taxAmount + delivery_fee : 0;

  return (
    <div className='w-full max-w-md mx-auto px-4 py-6 border rounded-lg shadow-sm bg-white'>
      <div className="text-2xl mb-4">
        <Title text1="Cart" text2="Totals" />
      </div>

      <div className="flex flex-col gap-4 text-sm sm:text-base">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{currency} {subtotal.toFixed(2)}</span>
        </div>
        <hr />

        <div className="flex justify-between">
          <span>Tax (5%):</span>
          <span>{currency} {taxAmount.toFixed(2)}</span>
        </div>
        <hr />

        <div className="flex justify-between">
          <span>Delivery Fee:</span>
          <span>{currency} {subtotal > 0 ? delivery_fee.toFixed(2) : '0.00'}</span>
        </div>
        <hr />

        <div className="flex justify-between font-semibold text-base sm:text-lg">
          <span>Total:</span>
          <span>{currency} {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
