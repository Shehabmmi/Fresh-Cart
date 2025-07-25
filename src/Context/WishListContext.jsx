import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  let [wishList, setWishList] = useState(null);
  let [loading, setLoading] = useState(null);

  async function addToWishList(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      // Fix: Fetch the updated wishlist instead of relying on the response
      await getLoggedUserWishList();
      toast.success("Item added to wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Error adding to wishlist");
    }
  }

  async function getLoggedUserWishList() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishList(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSpecificWishItem(cartItemId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${cartItemId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setWishList((prevWishList) =>
        prevWishList.filter((item) => item._id !== cartItemId)
      );
      toast.success("Item removed successfully");
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getLoggedUserWishList();
  }, []);

  return (
    <wishListContext.Provider
      value={{
        addToWishList,
        wishList,
        getLoggedUserWishList,
        loading,
        deleteSpecificWishItem,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
