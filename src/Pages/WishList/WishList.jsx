import React, { useContext } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function WishList() {
  let { wishList, loading, deleteSpecificWishItem } = useContext(wishListContext);
  let { addProductToCart } = useContext(cartContext);


  // Skelaton Loading
 if (loading === true) {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="animate-pulse bg-gray-300 h-8 w-1/3 mx-auto rounded" />
          <div className="animate-pulse bg-gray-300 h-4 w-1/2 mx-auto mt-2 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-80 bg-gray-300" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <button className="bg-gray-300 text-white p-3 rounded-full" />
                    <button className="bg-gray-300 text-white p-3 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="animate-pulse bg-gray-300 h-4 w-1/4 rounded mb-3" />
                <div className="animate-pulse bg-gray-300 h-6 w-3/4 rounded mb-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-mainColor mb-2">My Wishlist</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishList?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-80 object-contain group-hover:scale-105 transition-transform duration-300"
                  src={product.imageCover}
                  alt={product.title}
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <button
                      onClick={() => addProductToCart(product._id)}
                      className="bg-mainColor text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-300 hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.6A1 1 0 0 0 6.7 20h10.6a1 1 0 0 0 1-1.4L17 13M7 13l-2-8M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        />
                      </svg>
                    </button>

                    <Link
                      to={`/productDetails/${product._id}`}
                      className="bg-mainColor text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-300 hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3 9C6.477 21 2 12 2 12S6.477 3 12 3s10 9 10 9-4.477 9-10 9Z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block bg-mainColor/10 text-mainColor text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {product.category?.name}
                </span>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-mainColor transition-colors duration-300">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {product.brand?.name}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-mainColor font-medium">
                      Available
                    </span>
                  </div>

                  {product.ratingsAverage && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price}{" "}
                    <span className="text-lg font-normal text-gray-600">
                      EGP
                    </span>
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteSpecificWishItem(product._id)}
                      className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer transition-colors duration-300 text-sm font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => addProductToCart(product._id)}
                      className="bg-mainColor text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer transition-colors duration-300 text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
