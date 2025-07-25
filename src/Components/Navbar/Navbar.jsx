/* eslint-disable no-unused-vars */
import { Heart, Menu, ShoppingCart } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/wishListContext";
import logo from "../../assets/favicon.png";

export default function Navbar() {
  let { token, setToken } = useContext(authContext);
  let { cart } = useContext(cartContext);
  let { wishList } = useContext(wishListContext);

  let [counter, setCounter] = useState(cart?.numOfCartItems || 0);
  let [wishNums, setWishNums] = useState(wishList?.length || 0);
  const [phone, setPhone] = useState(false);

  function togglePhoneMenu() {
    setPhone(!phone);
  }

  useEffect(() => {
    setCounter(cart?.numOfCartItems || 0);
  }, [cart]);

  useEffect(() => {
    setWishNums(wishList?.length || 0);
  }, [wishList]);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <div className="bg-gray-200 p-2">
      <div className="container flex justify-around p-5 text-gray-500">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="" className="size-16 object-cover" />
          <h1 className="text-4xl font-bold text-green-700">Fresh Cart</h1>
        </div>

        {token ? (
          <ul className="hidden lg:flex xl:flex space-x-6 items-center">
            <li className="text-xl hover:text-mainColor">
              <NavLink to={"/home"}>Home</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor">
              <NavLink to={"/prodcuts"}>Products</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor">
              <NavLink to={"/categories"}>Categories</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor">
              <NavLink to={"/Brands"}>Brands</NavLink>
            </li>
            <li className="text-xl hover:text-mainColor">
              <NavLink to={"/allorders"}>Orders</NavLink>
            </li>
          </ul>
        ) : null}

        <ul className="hidden lg:flex xl:flex space-x-6 items-center justify-center">
          {token ? (
            <>
              <li className="text-xl relative hover:text-red-500">
                <div className="relative flex items-center space-x-2">
                  <NavLink to={"/wishList"} className="relative">
                    <Heart className="text-gray-500 hover:text-red-500" />
                    {wishNums > 0 && (
                      <span className="absolute -top-4 right-2 bg-mainColor text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {wishNums}
                      </span>
                    )}
                  </NavLink>
                </div>
              </li>

              <li className="text-xl relative hover:text-mainColor">
                <div className="relative">
                  <NavLink to={"/cart"}>
                    <ShoppingCart />
                  </NavLink>
                  {counter > 0 && (
                    <div className="bg-mainColor text-white text-xs size-5 flex items-center justify-center rounded-full absolute -top-4 right-3">
                      {counter}
                    </div>
                  )}
                </div>
              </li>
            </>
          ) : null}

          {!token ? (
            <>
              <li className="text-xl hover:text-mainColor relative">
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li className="text-xl hover:text-mainColor relative">
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </>
          ) : (
            <li
              onClick={logout}
              className="text-xl hover:text-mainColor cursor-pointer relative"
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
        <div className="lg:hidden max-h-96 text-center">
          {token && (
            <ul className="flex flex-col space-y-3 my-4">
              <li>
                <NavLink className="text-xl hover:text-mainColor" to="/home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="text-xl hover:text-mainColor" to="/prodcuts">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink className="text-xl hover:text-mainColor" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink className="text-xl hover:text-mainColor" to="/brands">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink className="text-xl hover:text-mainColor" to="/allorders">
                  Orders
                </NavLink>
              </li>
            </ul>
          )}

          {token && (
            <div className="flex justify-center flex-col items-center gap-6 my-4">
              <NavLink to="/cart" className="relative">
                <ShoppingCart className="hover:text-mainColor" />
                {counter > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mainColor text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {counter}
                  </span>
                )}
              </NavLink>

              <NavLink to="/wishlist">
                <div className="relative">
                  <Heart className="text-gray-500 hover:text-red-500" />
                  {wishNums > 0 && (
                    <span className="absolute -top-2 -right-2 bg-mainColor text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {wishNums}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>
          )}

          {token && (
            <div className="my-4">
              <button
                onClick={logout}
                className="text-xl hover:text-mainColor transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}

          {!token && (
            <ul className="flex flex-col space-y-3 my-4 text-center">
              <li>
                <NavLink className="text-xl hover:text-mainColor" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="text-xl hover:text-mainColor" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
