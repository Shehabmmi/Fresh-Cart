import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Error404 from "../404/Error404";

export default function Products() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  async function getAllProducts() {
    setLoading(true);

    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
      setError(true);
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {products.map((item) => {
            return <ProductCard item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
