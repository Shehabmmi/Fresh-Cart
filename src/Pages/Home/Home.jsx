import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import Error404 from "../404/Error404";
// import Swiper from "swiper";
import "swiper/css";
import ScrollReveal from "scrollreveal";
import homeImg from '../../assets/photo-1487744480471-9ca1bca6fb7d.jpg'
import img1 from '../../assets/imgi_1_product5-DZxbnV6L.jpg'
import img2 from '../../assets/imgi_2_product4-CxeAzYXu.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';



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
  
    <img src={homeImg} alt="" className="w-full h-full object-cover" />
  </div>

  {/* Right images stacked */}
  <div className="sm:w-1/3 w-full h-[300px] sm:h-[450px] flex flex-col">
    <div className="h-1/2">
      <img src={img1} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="h-1/2">
      <img src={img2} alt="" className="w-full h-full object-cover" />
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
