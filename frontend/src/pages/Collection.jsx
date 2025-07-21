import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from '../components/Title';
import { ProductItem } from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relavent");

  useEffect(() => {
    setFilter(products);
  }, [products]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter(item => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter(item => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let filteredProducts = [...products];

    if (category.length > 0) {
      filteredProducts = filteredProducts.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter(item => subCategory.includes(item.subCategory));
    }

    // Apply sorting
    if (sortOption === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    setFilter(filteredProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortOption]);

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
              {["Men", "Women", "Kids"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    className="accent-orange-500"
                    onChange={toggleCategory}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Types Filter */}
          <div className="border border-gray-300 p-4 rounded-md shadow-sm bg-white">
            <p className="mb-3 font-semibold text-sm text-gray-600">Types</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={type}
                    className="w-4 h-4 accent-orange-500"
                    onChange={toggleSubCategory}
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
            onChange={(e) => setSortOption(e.target.value)}
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
