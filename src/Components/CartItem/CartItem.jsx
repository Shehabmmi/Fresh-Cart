import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";

export default function CartItem({item}) {
  console.log('item', item);

  let {deleteSpecificCartItem, updateCartItem, disableBtn} = useContext(cartContext)
  
  return (
    <div className="rounded-lg border border-black bg-white p-4 shadow-sm   md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="hidden h-20 w-20 dark:block object-cover"
            src={item?.product?.imageCover}
            alt="{i?tem.product.title}"
          />
        </a>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="disabled:cursor-not-allowed inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border bg-black"
              onClick={()=>{updateCartItem(item?.count-1,item.product._id)}}
              disabled={disableBtn}
            >
              <svg
                className="h-2.5 w-2.5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="counter-input"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-black"
              placeholder
              value={item?.count}
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className=" disabled:cursor-not-allowed inline-flex h-5 w-5  shrink-0 items-center justify-center rounded-md border bg-black"
              onClick={()=>{updateCartItem(item?.count + 1, item.product._id)}}
              disabled={disableBtn}
            >
              <svg
                className="h-2.5 w-2.5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-black">
              {item?.price * item?.count} EGP
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <div>
            <p className="text-base font-bold text-black">
              {item?.product.title}
          </p>
            <span className="text-mainColor text-sm">{item?.product.category?.name} | {item?.product.brand?.name}</span>
          </div>
          
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              Add to Favorites
            </button>
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
              onClick={()=>{deleteSpecificCartItem(item?.product._id)}}
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
