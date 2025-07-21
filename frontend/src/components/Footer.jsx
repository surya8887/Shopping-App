import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-14 px-6 mt-5 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 text-base tracking-wide">
        
        {/* Logo & About */}
        <div>
          <img src={assets.logo} className="mb-5 w-36" alt="Logo" />
          <p className="text-gray-600 lg:text-xl leading-relaxed  sm:text-base">
            Elevate your shopping experience with our handpicked collections. Quality, trust, and satisfaction – all in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="lg:text-4xl font-semibold mb-4 text-gray-800">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-600 text-base">
            <li className="hover:text-orange-500 transition">Home</li>
            <li className="hover:text-orange-500 transition">About</li>
            <li className="hover:text-orange-500 transition">Services</li>
            <li className="hover:text-orange-500 transition">Delivery Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Get In Touch</h3>
          <ul className="flex flex-col gap-2 text-gray-600 text-base">
            <li className="hover:text-orange-500 transition">📞 +91 99999 99999</li>
            <li className="hover:text-orange-500 transition">📧 contact@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="font-medium text-gray-600">forever</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
