import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import Error404 from "../404/Error404";
import Swiper from "swiper";
import "swiper/css";
import image1 from "../../assets/slider-image-1.jpeg";
import image2 from "../../assets/slider-image-2.jpeg";
import image3 from "../../assets/slider-image-3.jpeg";
import ScrollReveal from "scrollreveal";


export default function Home() {
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




  return (
    <div>
      {/* Hero Section */}
<div className="flex flex-col sm:flex-row w-full h-auto overflow-hidden my-3">
  {/* Left image */}
  <div className="sm:w-2/3 w-full h-[300px] sm:h-[450px]">
    <img src={image3} alt="" className="w-full h-full object-cover" />
  </div>

  {/* Right images stacked */}
  <div className="sm:w-1/3 w-full h-[300px] sm:h-[450px] flex flex-col">
    <div className="h-1/2">
      <img src={image1} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="h-1/2">
      <img src={image2} alt="" className="w-full h-full object-cover" />
    </div>
  </div>
</div>


      {/* Cards */}
      <div className="container py-7"> 
        {loading ? (
          <Loader />
        ) : error ? (
          <Error404 />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
            {products.map((item) => {
              return <ProductCard item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
