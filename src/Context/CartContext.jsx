import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let cartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  let [loading, setLoading] = useState(false);
  let [disableBtn, setDisableBtn] = useState(false);

  async function getLoggedUserCart() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
      toast.success("item added to card");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSpecificCartItem(cartItemId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
      toast.success("Item removed successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAllCart() {
    try {
      let { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
      toast.success("All products removed");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartItem(count,cartItemId) {
    setDisableBtn(true)
    try {
      let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,{
        count
      },
      {
        headers:{
          token : localStorage.getItem('token')
        }
      }
    )
    console.log(data);
    toast.success('Quantity updated')
    setCart(data)    
      
    } catch (error) {
      console.log(error);
    }finally{
      setDisableBtn(false)
    }    
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cart,
        addProductToCart,
        getLoggedUserCart,
        loading,
        deleteSpecificCartItem,
        deleteAllCart,
        updateCartItem,
        disableBtn,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
