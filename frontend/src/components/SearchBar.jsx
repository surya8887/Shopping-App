import React, { useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = React.useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className='border-t border-b text-center p-2'>
      <div className='inline-flex items-center justify-between border border-gray-400 px-3 py-1 bg-white rounded-full w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm rounded-full p-2'
          type="text"
          placeholder='Search...'
        />
        <img className='w-4 cursor-pointer' src={assets.search_icon} alt="Search" />
      </div>

      <img
        onClick={() => setShowSearch(false)}
        className='inline w-3 ml-3 cursor-pointer'
        src={assets.cross_icon}
        alt="Close"
      />
    </div>
  );
};

export default SearchBar;
