import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Hero = () => {
  return (
    <section className="w-full px-4 sm:px-[4vw] lg:px-[3vw] py-10">
      <div className="flex flex-col-reverse sm:flex-row items-center gap-10 lg:gap-16 w-full border border-gray-300 rounded-2xl p-5 sm:p-8 lg:p-10 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">

        {/* Left Text Content */}
        <div className="w-full sm:w-1/2 text-[#414141]">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-[#414141]"></span>
            <p className="font-medium text-sm md:text-base uppercase tracking-wider">Our Bestsellers</p>
          </div>

          {/* Title */}
          <h1 className="prata-regular text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-snug lg:leading-tight mb-6">
            Latest Arrivals
          </h1>

          {/* Call to Action */}
          <div className="flex items-center gap-4">
            <p className="font-semibold text-sm md:text-base">Shop In</p>
            <button className="px-5 py-2 bg-black text-white text-sm md:text-base rounded-full border border-black hover:bg-white hover:text-black transition duration-300">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Image Content */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <img
            src={assets.hero_img}
            alt="Hero"
            className="w-full h-auto max-w-md sm:max-w-full object-cover rounded-xl border border-gray-200 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
