import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

// Create context
export const ShopContext = createContext({});

const ShopContextProvide = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 30;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true); // ✅ Fixed here

  const value = {
    products,
    delivery_fee,
    currency,
    search, setSearch,
    showSearch, setShowSearch // ✅ Fixed here
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvide;
