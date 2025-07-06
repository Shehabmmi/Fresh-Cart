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
    return <section class="py-8 my-2 animate-pulse">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-5xl">
      <div class="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div class="divide-y divide-gray-200 bg-gray-500 p-4 mb-6 rounded-lg shadow">
        <div class="h-5 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded mb-4"></div>
        <div class="flex items-center justify-between py-2 border-t border-gray-300">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-gray-200 rounded"></div>
            <div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-3 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div class="flex justify-end gap-4 mt-4">
          <div class="h-10 bg-gray-200 rounded px-3 py-2"></div>
        </div>
      </div>
      <div class="h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
</section>
  }

  return (
    <section className=" py-8 my-2">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-mainColor text-center border-t-2 border-b-2 p-2 sm:text-2xl mb-6">My Orders</h2>

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="divide-y divide-gray-200 bg-gray-500 p-4 mb-6 rounded-lg shadow"
              >
                <h3 className="text-lg text-white mb-2 font-bold">
                  Order ID: {order.id}
                </h3>
                <p className="text-white font-medium mb-2">
                  Total Price: ${order.totalOrderPrice}
                </p>
                <p className="text-white text-sm mb-4">
                  Ordered At: {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {order.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-t border-gray-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="text-white font-bold">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-200">
                          Qty: {item.count}
                        </p>
                      </div>
                    </div>
                    <p className="text-white">${item.price}</p>
                  </div>
                ))}

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No orders found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
