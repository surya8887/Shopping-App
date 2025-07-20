import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

// Create context
export const ShopContext = createContext({});

const ShopContextProvide = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 30;

  const value = {
    products:products,
    delivery_fee,
    currency,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvide;
