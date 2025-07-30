import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

export default function ProductCard({ item }) {
  let { addProductToCart } = useContext(cartContext);
  let { addToWishList } = useContext(wishListContext);


  return (
    <div className="relative group rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-duration="1500">
      {/* Icons in center on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="flex gap-4">
          {/* Heart Icon */}
          <button onClick={()=>{
            addToWishList(item._id)
          }}
           className="bg-mainColor p-2 rounded-full shadow hover:scale-110 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>

          {/* Cart Icon */}
          <Link onClick={()=>{
            addProductToCart(item._id)
          }} className="bg-mainColor p-2 rounded-full shadow hover:scale-110 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.6A1 1 0 0 0 6.7 20h10.6a1 1 0 0 0 1-1.4L17 13M7 13l-2-8M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              />
            </svg>
          </Link>

          {/* Eye Icon */}
          <Link
            to={`/productDetails/${item._id}`}
            className="bg-mainColor p-2 rounded-full shadow hover:scale-110 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3 9C6.477 21 2 12 2 12S6.477 3 12 3s10 9 10 9-4.477 9-10 9Z"
              />
            </svg>
          </Link>
        </div>
      </div>

      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src={item.imageCover}
          alt={item.title}
        />
      </a>
      <div className="px-5 pb-5">
        <span className="text-mainColor">{item.category.name}</span>
        <h5 className="text-xl font-semibold tracking-tight text-black">
          {item.description.split(" ").slice(0, 7).join(" ")}
        </h5>

        <div className="flex items-center space-x-2">
          <h3>{item.brand.name}</h3>
          {item.quantity > 0 ? (
            <span className="text-mainColor">Available</span>
          ) : (
            <span className="text-red">Sold Out</span>
          )}
        </div>

        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center w-full justify-between">
            <span className="text-xl text-black">{item.price} EGP</span>
            {/* Rate */}
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="text-black">{item.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
