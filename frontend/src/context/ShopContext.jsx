import { createContext, useState, useEffect, useCallback } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';


export const ShopContext = createContext({});

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 30;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // ✅ Add to cart
  const addToCart = useCallback((itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    setCartItems(prev => {
      const updated = { ...prev };
      if (!updated[itemId]) updated[itemId] = {};
      updated[itemId][size] = (updated[itemId][size] || 0) + 1;
      return updated;
    });

    toast.success('Item added to cart');
  }, []);

  // ✅ Get cart item count
  const getCartCount = useCallback(() => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size] || 0;
      }
    }
    return total;
  }, [cartItems]);

  // ✅ Get total cart amount
  const getCartAmount = useCallback(() => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId); // ✅ correct key
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          total += product.price * quantity;
        }
      }
    }
    return total;
  }, [cartItems]);

  // ✅ Update quantity
  const updateQuantity = useCallback((itemId, size, quantity) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[itemId] && updated[itemId][size]) {
        updated[itemId][size] = quantity;
      }
      return updated;
    });
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (typeof parsed === 'object') {
          setCartItems(parsed);
        }
      } catch (err) {
        console.error("Failed to parse stored cart:", err);
      }
    }
  }, []);

  // ✅ Final context value
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
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
