import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Collection", to: "/collection" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between py-5 px-4 font-medium relative shadow-sm bg-white">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" className="h-10" />

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-8 text-gray-700 text-sm">
        {navLinks.map(({ name, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `group flex flex-col items-center gap-1 transition-colors duration-200
                 ${isActive ? "text-black font-semibold" : "hover:text-black"}`
              }
            >
              {({ isActive }) => (
                <>
                  <p className="text-lg">{name}</p>
                  <span
                    className={`
                      w-2/4 h-[2px] bg-gray-800 rounded-full 
                      transition-all duration-300
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                      group-hover:opacity-100 group-hover:translate-y-0
                    `}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        <img src={assets.search_icon} alt="Search" className="w-5 cursor-pointer" />

        {/* Cart */}
        <Link to="/cart" className="relative w-6 h-6">
          <img src={assets.cart_icon} alt="Cart" className="w-full h-full" />
          <span className="absolute -right-1 -bottom-1 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
            10
          </span>
        </Link>

        {/* Profile */}
        <div className="group relative">
          <img src={assets.profile_icon} alt="Profile" className="w-5 cursor-pointer" />
          <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
            <div className="w-36 py-3 px-5 bg-slate-100 shadow-lg rounded-lg flex flex-col gap-2">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Hamburger (Mobile Only) */}
        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out
        ${visible ? "w-3/4 max-w-xs p-4" : "w-0 p-0"} overflow-hidden`}
      >
        {/* Back Button */}
        <div
          onClick={() => setVisible(false)}
          className="flex items-center gap-2 mb-6 px-2 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md cursor-pointer transition duration-200"
        >
          <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back Icon" />
          <p className="text-base font-semibold tracking-wide">Back</p>
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col gap-4 text-gray-700 font-medium text-base">
          {navLinks.map(({ name, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-md transition-all duration-200
                   ${isActive ? "bg-black text-white font-semibold" : "hover:bg-gray-100"}`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
