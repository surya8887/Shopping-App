import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange Policy',
      desc: 'Hassle-free and flexible exchange process for your peace of mind.',
    },
    {
      icon: assets.quality_icon,
      title: '7 Day Return Policy',
      desc: 'Return your product within 7 days with no questions asked.',
    },
    {
      icon: assets.support_img,
      title: '24/7 Customer Support',
      desc: 'Our support team is available around the clock to help you.',
    },
  ];

  return (
    <div className="py-5 bg-white">
      <div className="max-w-9xl mx-auto  px-4 border border-gray-200 rounded-xl p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 rounded-xl hover:shadow-md transition duration-300"
            >
              <img className="w-16 h-16 mb-4" src={policy.icon} alt={policy.title} />
              <p className="font-semibold text-lg text-gray-800 mb-1">{policy.title}</p>
              <p className="text-gray-500 text-sm">{policy.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
