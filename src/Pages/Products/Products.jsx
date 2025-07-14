import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Error404 from "../404/Error404";

export default function Products() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState('all');

  const getRange = (range) => {
    switch (range) {
      case '0-100':
        return { min: 0, max: 100 };
      case '100-500':
        return { min: 100, max: 500 };
      case '500-1000':
        return { min: 500, max: 1000 };
      case '1000+':
        return { min: 1000, max: Infinity };
      default:
        return { min: 0, max: Infinity };
    }
  };

  async function getAllProducts() {
    setLoading(true);

    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading == true) {
    return (
      <div class="container py-7 animate-pulse">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div class="h-60 bg-gray-200 rounded w-full"></div>
          <div class="h-60 bg-gray-200 rounded w-full"></div>
          <div class="h-60 bg-gray-200 rounded w-full"></div>
          <div class="h-60 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container py-7">
        {/* Price Filter Section */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-xl px-6 py-4 flex items-center space-x-4 w-full max-w-md">
            
            <label className="mr-2 font-bold text-mainColor text-lg">Price Range:</label>
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className="rounded-lg px-4 py-2 text-mainColor font-semibold focus:outline-none focus:ring-2 focus:ring-mainColor transition-all duration-200 bg-gray-50"
            >
              <option value="all">All</option>
              <option value="0-100">0 - 100</option>
              <option value="100-500">100 - 500</option>
              <option value="500-1000">500 - 1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {products
            .filter(item => {
              const { min, max } = getRange(priceRange);
              const price = item.price;
              return price >= min && price <= max;
            })
            .map((item) => {
              return <ProductCard item={item} />;
            })}
        </div>
      </div>
    </div>
  );
}
