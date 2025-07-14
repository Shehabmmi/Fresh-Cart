/* eslint-disable no-unused-vars */
import { Heart, Menu, ShoppingCart } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import logo from "../../assets/favicon.png";

export default function Navbar() {
  let { token, setToken } = useContext(authContext);
  let { cart } = useContext(cartContext);
  let [counter, setCounter] = useState(cart?.numOfCartItems);
  const [phone, setPhone] = useState(false);
  // Placeholder for wishlist count
  const [wishlistCount] = useState(0); // Replace with context/state when available

  function togglePhoneMenu() {
    setPhone(!phone);
  }

  useEffect(() => {
    setCounter(cart?.numOfCartItems);
  }, [cart]);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <div className="bg-gray-200 p-2">
      <div className="container flex justify-around p-5 text-gray-500">
        <div className="flex items-center space-x-2">
          {/* <ShoppingCart className="size-12 text-mainColor" /> */}
          <img src={logo} alt="" className="size-16 object-cover" />
          <h1 className="text-4xl font-bold text-green-700">Fresh Cart</h1>
        </div>
        {/* links pages */}
        {token ? (
          <ul className="hidden lg:flex xl:flex space-x-6 items-center">
            <li className="text-xl hover:text-mainColor hover:transition-all hover:after:duration-500">
              <NavLink to={"/home"}>Home</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/prodcuts"}>Products</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/categories"}>Categories</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/Brands"}>Brands</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/allorders"}>Orders</NavLink>
            </li>
          </ul>
        ) : null}

        {/* social media icons */}
        {/* <div className="flex">
          <ul className="flex items-center justify-center space-x-2 cursor-pointer">
            <li>
              <Facebook className="text-blue-600" />
            </li>
            <li>
              <Instagram className="text-red-800" />
            </li>

            <li>
              <LucideTwitter className="text-blue-400" />
            </li>
            <li>
              <Linkedin className="text-blue-700" />
            </li>
          </ul>
        </div> */}

        {/* auth links */}

        <ul className="hidden lg:flex xl:flex space-x-6 items-center justify-center">
          {token ? (
            <>
              <li className="text-xl relative hover:text-mainColor hover:transition-all">
                <div className="relative flex items-center space-x-2">
                  <NavLink to={"/wishlist"}>
                    <Heart />
                  </NavLink>
                  {wishlistCount > 0 && (
                    <div className="bg-pink-500 text-white text-xs size-5 flex items-center justify-center rounded-full absolute -top-4 left-3">
                      {wishlistCount}
                    </div>
                  )}
                </div>
              </li>
              <li className="text-xl relative hover:text-mainColor hover:transition-all">
                <div className="relative">
                  <NavLink to={"/cart"}>
                    <ShoppingCart />
                  </NavLink>
                  {cart?.numOfCartItems > 0 && (
                    <div className="bg-mainColor text-white text-xs size-5 flex items-center justify-center rounded-full absolute -top-4 right-3">
                      {cart?.numOfCartItems}
                    </div>
                  )}
                </div>
              </li>
            </>
          ) : null}
          {!token ? (
            <>
              <li className="text-xl hover:text-mainColor relative hover:transition-all hover:after:duration-500 hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-mainColor after:bottom-0 after:left-0">
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li className="text-xl hover:text-mainColor relative hover:transition-all hover:after:duration-500 hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-mainColor after:bottom-0 after:left-0">
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </>
          ) : (
            <li
              onClick={logout}
              className="text-xl hover:text-mainColor relative hover:transition-all hover:after:duration-500 hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-mainColor after:bottom-0 after:left-0"
            >
              <span>Logout</span>
            </li>
          )}
        </ul>

        <div className="flex items-center lg:hidden" onClick={togglePhoneMenu}>
          <Menu />
        </div>
      </div>

      {/* mobile screen */}
      {phone && (
        <div className="lg:hidden max-h-96 sm:text-center text-center md:text-center">
          <ul className=" flex flex-col space-y-2 my-2 ">
            <li className="text-xl hover:text-mainColor hover:transition-all hover:after:duration-500">
              <NavLink to={"/home"}>Home</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/prodcuts"}>Products</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/categories"}>Categories</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/Brands"}>Brands</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-300 ">
              <NavLink to={"/allorders"}>Orders</NavLink>
            </li>
          </ul>

          <ul className="flex items-center justify-center">
            {token && (
              <NavLink to={"/cart"}>
                <ShoppingCart className="hover:text-mainColor" />
              </NavLink>
            )}
          </ul>

          {/* Wishlist icon on its own line for mobile */}
          {token && (
            <ul className="flex items-center justify-center my-2">
              <NavLink to={"/wishlist"}>
                <div className="relative">
                  <Heart className="hover:text-mainColor" />
                  {wishlistCount > 0 && (
                    <div className="bg-pink-500 text-white text-xs size-5 flex items-center justify-center rounded-full absolute -top-2 left-3">
                      {wishlistCount}
                    </div>
                  )}
                </div>
              </NavLink>
            </ul>
          )}

          {!token && (
            <ul className="flex items-center flex-col space-y-2 my-2 md:text-center sm:text-center ">
              <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-500">
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li className="text-xl hover:text-mainColor  hover:transition-all hover:after:duration-500">
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
