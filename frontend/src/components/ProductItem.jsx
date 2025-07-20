import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`product/${id}`} className="group block text-gray-600">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="overflow-hidden rounded-t-xl">
                    <img
                        src={image[0]}
                        alt={name}
                        className="w-full h-1/3 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div className="px-3 py-2">
                    <p className="text-sm truncate text-gray-700">{name}</p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-semibold text-gray-800">
                            {currency}{price}
                        </p>
                        <span className="text-xs text-gray-500 line-through">
                            {currency}{(price * 1.2).toFixed(0)}
                        </span>
                    </div>
                </div>

            </div>
        </Link>
    );
};
