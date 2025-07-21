import { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from '../components/Title';
import { ProductItem } from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch, setSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce the search input to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // delay in ms

    return () => clearTimeout(timer);
  }, [search]);

  // Filtered and sorted product list (memoized)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (showSearch && debouncedSearch) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    // Sorting
    if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    return filtered;
  }, [products, debouncedSearch, showSearch, category, subCategory, sortOption]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

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
                    checked={category.includes(item)}
                    className="accent-orange-500"
                    onChange={toggleCategory}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Sub-Category Filter */}
          <div className="border border-gray-300 p-4 rounded-md shadow-sm bg-white">
            <p className="mb-3 font-semibold text-sm text-gray-600">Types</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={type}
                    checked={subCategory.includes(type)}
                    className="w-4 h-4 accent-orange-500"
                    onChange={toggleSubCategory}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setCategory([]);
              setSubCategory([]);
              setSearch('');
              setSortOption('relevant');
            }}
            className="text-sm text-orange-500 underline mt-2"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Right Side: Products */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Title text1="All" text2="Collections" />
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="high-low">Sort by: High to Low</option>
            <option value="low-high">Sort by: Low to High</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
