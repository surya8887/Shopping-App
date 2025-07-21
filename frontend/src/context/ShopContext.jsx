import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

// Create context
export const ShopContext = createContext({});

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 30;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});

  // ✅ Add to cart logic
  const addToCart = (itemId, size) => {
    setCartItems(prev => {
      const updatedCart = { ...prev };
      
      if (!updatedCart[itemId]) {
        updatedCart[itemId] = {};
      }

      if (updatedCart[itemId][size]) {
        updatedCart[itemId][size] += 1;
      } else {
        updatedCart[itemId][size] = 1;
      }

      return updatedCart;
    });
  };

  // ✅ Save cart to localStorage on change
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log(cartItems);
      
    }
  }, [cartItems]);

  // ✅ Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const value = {
    products,
    delivery_fee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
