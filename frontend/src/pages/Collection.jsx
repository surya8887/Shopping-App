import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from '../components/Title';
import {ProductItem} from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(products);
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t px-4 max-w-9xl mx-auto">

      {/* Filter Sidebar */}
      <div className="sm:min-w-[220px] w-full sm:w-auto">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="text-xl font-semibold text-gray-700 flex items-center gap-2 cursor-pointer sm:mb-4"
        >
          Filter
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown"
          />
        </p>

        <div className={`space-y-6 ${showFilter ? "" : "hidden"} sm:block`}>

          {/* Category Filter */}
          <div className="border border-gray-300 p-4 rounded-md shadow-sm bg-white">
            <p className="text-gray-600 font-semibold mb-3">Category</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {["Men", "Women", "Kids"].map((category) => (
                <label key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={category}
                    className="accent-orange-500"
                    onChange={() => {}}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Types Filter */}
          <div className="border border-gray-300 p-4 rounded-md shadow-sm bg-white">
            <p className="mb-3 font-semibold text-sm text-gray-600">Types</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {["Topwear", "Bottomwear", "Accessories"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={type}
                    className="w-4 h-4 accent-orange-500"
                    onChange={() => {}}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Products */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Title text1="All" text2="Collections" />
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            onChange={() => {}}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="high-low">Sort by: High to Low</option>
            <option value="low-high">Sort by: Low to High</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filter.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
