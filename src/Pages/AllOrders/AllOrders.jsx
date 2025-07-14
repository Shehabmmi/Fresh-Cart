import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading , setLoading] = useState(false)

  async function getAllOrders() {
    setLoading(true)
    const userId = localStorage.getItem("userId");
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  if(loading == true){
    return <div class="py-8 my-2 bg-white">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-2xl font-bold bg-gray-300 animate-pulse text-center border-b-4 border-gray-300 pb-4 mb-8 tracking-wide h-8 w-1/2 mx-auto" />
      <div className="bg-white border border-gray-300 p-6 mb-8 rounded-2xl animate-pulse">
        <h3 className="text-lg bg-gray-300 animate-pulse mb-2 font-bold h-6 w-1/3" />
        <p className="text-gray-700 font-semibold mb-2 bg-gray-300 animate-pulse h-6 w-1/4" />
        <p className="text-gray-500 text-sm mb-4 bg-gray-300 animate-pulse h-4 w-1/4" />
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-lg" />
            <div>
              <p className="text-gray-300 animate-pulse font-bold text-base h-6 w-1/2" />
              <p className="text-sm text-gray-500 bg-gray-300 animate-pulse h-4 w-1/4" />
            </div>
          </div>
          <p className="text-gray-300 animate-pulse font-semibold h-6 w-1/4" />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" className="bg-gray-300 animate-pulse text-white px-5 py-2 rounded-lg font-semibold h-8 w-1/4" />
        </div>
      </div>
      <div className="bg-gray-300 animate-pulse text-center font-semibold h-6 w-1/4 mx-auto" />
    </div>
  </div>
</div>

  }

  return (
    <section className=" py-8 my-2">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-mainColor text-center border-b-4 border-mainColor pb-4 mb-8 tracking-wide">My Orders</h2>

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-mainColor p-6 mb-8 rounded-2xl shadow-md"
              >
                <h3 className="text-lg text-mainColor mb-2 font-bold">
                  Order ID: <span className="font-mono">{order.id}</span>
                </h3>
                <p className="text-gray-700 font-semibold mb-2">
                  Total Price: <span className="text-mainColor">${order.totalOrderPrice}</span>
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Ordered At: {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {order.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-lg object-cover border border-mainColor"
                      />
                      <div>
                        <p className="text-mainColor font-bold text-base">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.count}
                        </p>
                      </div>
                    </div>
                    <p className="text-mainColor font-semibold">${item.price}</p>
                  </div>
                ))}

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="bg-mainColor text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-colors duration-200"
                  >
                    Cancel order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-mainColor text-center font-semibold">No orders found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
