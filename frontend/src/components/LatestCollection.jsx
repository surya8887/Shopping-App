import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { ProductItem } from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    }, [products]);

    return (
        <div className="my-10 px-4 sm:px-6 md:px-10 lg:px-[5vw]">
            {/* Section Header */}
            <div className="text-center mb-8">
                <Title text1="Latest" text2="Collection" />
                <p className="max-w-3xl mx-auto text-center text-gray-600 text-base sm:text-lg md:text-xl font-light leading-relaxed px-2 sm:px-4">
                    Discover our most recent arrivals. From trending fashion to timeless classics, find the perfect product that fits your style and budget.
                </p>

            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProduct.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
