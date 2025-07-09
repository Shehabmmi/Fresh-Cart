import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";



export default function BrandsDetails() {
  const [products , setProducts] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  async function getProductsByBrand() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand[in]=${id}`
      );
      setProducts(data.data);      
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductsByBrand();
  }, [id]);

  if(loading == true){
    return <div class="p-4 animate-pulse">
  <div class="h-8 bg-gray-200 rounded mb-4"></div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div class="h-64 bg-gray-200 rounded-md"></div>
    <div class="h-64 bg-gray-200 rounded-md"></div>
    <div class="h-64 bg-gray-200 rounded-md"></div>
    <div class="h-64 bg-gray-200 rounded-md"></div>
  </div>
</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center text-mainColor border-t-2 border-b-2 p-2 mb-6">
        Products in Brand 
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      )}
    </div>
  );
}
