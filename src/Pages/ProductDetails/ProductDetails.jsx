import axios from "axios";
import { Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { cartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState(null);
  const {addProductToCart}  = useContext(cartContext)

  let { id } = useParams();

  async function getProductDetails() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      getRelatedProducts(data.data.category._id);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      );
      setRelated(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (loading == true) {
    return (
      <div className="bg-gray-100 my-2 animate-pulse">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-md rounded-lg shadow-md mb-4 bg-gray-200 h-64" />
              <div className="w-full max-w-md h-24 bg-gray-200" />
            </div>
            <div className="flex-1 px-4 flex flex-col justify-center">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="mb-4 flex items-center justify-between mt-4">
                <div className="w-1/2">
                  <div className="h-6 bg-gray-200 rounded w-1/2 inline-block" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 inline-block ml-2" />
                </div>
                <div className="flex items-center space-x-1 w-1/2">
                  <div className="h-5 w-5 bg-gray-200 rounded-full inline-block" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 inline-block" />
                </div>
              </div>
              <div className="h-10 bg-green-600 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 my-2">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
            <img
              src={product?.imageCover}
              alt={product?.title}
              className="w-full max-w-md rounded-lg shadow-md mb-4 object-contain"
            />

            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              className="w-full max-w-md"
            >
              {product?.images?.map((img) => (
                <SwiperSlide>
                  <img
                    src={img}
                    alt=""
                    className="rounded-md h-24 w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* جزء التفاصيل */}
          <div className="flex-1 px-4 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">{product?.title}</h2>
            <p className="text-gray-600 mb-4">{product?.description}</p>
            <span className="text-green-600 mb-2">
              {product?.category?.name}
            </span>

            <div className="mb-4 flex items-center justify-between mt-4">
              <div>
                <span className="text-2xl font-bold mr-2">
                  {product?.price} EGP
                </span>
                <span className="text-gray-500 line-through">
                  {product?.price + 100} EGP
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 w-5 h-5" />
                <span className="text-gray-700">{product?.ratingsAverage}</span>
              </div>
            </div>

            <button onClick={()=>{addProductToCart(id)}}  className="btn bg-green-600 hover:bg-green-700 w-full flex items-center justify-center">
              + Add to cart
            </button>
          </div>
        </div>
      </div>
      <hr />
      <h1 className="text-6xl my-4 text-gray-700 ms-2 text-[30px]">
        Related Products
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {related?.map((item) => {
          return <ProductCard key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
}
