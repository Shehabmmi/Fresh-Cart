import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {

  async function verifyToken() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("userId", data.decoded.id);      
    } catch (error) {
      toast.error(error.response.data.message);
      localStorage.removeItem("token");
      setToken(null);
    }
  }

  let [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <authContext.Provider value={{ token, setToken, verifyToken }}>
        {children}
      </authContext.Provider>
    </>
  );
}
