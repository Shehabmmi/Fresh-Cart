import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import CartItem from "../../Components/CartItem/CartItem";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

export default function Cart() {
  const phoneRegex = /^01[0125][0-9]{8}$/;
  let { cart, getLoggedUserCart, loading, deleteAllCart } =useContext(cartContext);
  let [pay , setPay] = useState('cash')

    let navigate = useNavigate()

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  // pay online
  async function payOnline(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        {
          shippingAddress: values,
        },
        {
          headers:{
            token: localStorage.getItem('token')
          }
        }
      );
      if(data.status == "success"){
        window.location.href = data.session.url
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  // pay cash
  async function payCash(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers:{
            token: localStorage.getItem('token')
          }
        }
      );
      toast.success('Done✅')
      if(data.status == "success"){
        navigate('/allorders')
        getLoggedUserCart()
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = object({
    details: string().required("is required"),
    phone: string()
      .required("is required")
      .matches(phoneRegex, "phone must be an Egyptian number"),
    city: string().required("is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (x) => {
      if(pay == 'cash'){
        payCash(x)
      }else{
        payOnline(x)
      }
    },
    validationSchema,
  });

  // Skilaton loading
  if (loading == true) {
    return (
      <section class="bg-gray-300 py-8 antialiased md:py-16 my-2 rounded-md animate-pulse">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="h-6 bg-gray-200 rounded w-1/2"></div>
          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div class="space-y-6">
                <div class="h-24 bg-gray-200 rounded"></div>
                <div class="h-24 bg-gray-200 rounded"></div>
                <div class="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div class="space-y-4 rounded-lg border border-black bg-white p-4 shadow-sm   sm:p-6">
                <div class="h-6 bg-gray-200 rounded w-1/2"></div>
                <div class="space-y-4">
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                </div>
                <div class="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-300 py-8 antialiased md:py-16 my-2 rounded-md">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart?.data?.products?.map((item) => {
                return <CartItem item={item} />;
              })}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-black bg-white p-4 shadow-sm   sm:p-6">
              <button
                onClick={deleteAllCart}
                className="bg-red-400 text-white p-2 rounded-lg font-bold w-full"
              >
                Delete Cart
              </button>
              <p className="text-xl font-semibold text-black">Order summary</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-700">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {cart?.data?.totalCartPrice} EGP
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-700 ">
                      Shipping
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      0 EGP
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-black pt-2 ">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    {cart?.data?.totalCartPrice}EGP
                  </dd>
                </dl>
              </div>

              <button className="btn bg-mainColor w-full flex justify-center rounded-md font-bold">
                Check out
              </button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 "> or </span>
                <Link
                  to="/home"
                  title
                  className="inline-flex items-center gap-1 text-sm font-medium  underline hover:no-underline text-black"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <section className="bg-gray-300 py-8">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form
                onSubmit={formik.handleSubmit}
                action="#"
                className="w-full rounded-xl border border-black bg-white p-4 shadow-sm"
              >
                <h1 className="text-3xl text-center font-bold my-3">
                  Check out
                </h1>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 "
                      placeholder="City"
                      required
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.city && formik.touched.city && (
                      <p className="text-red-600 font-bold text-sm">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Phone
                    </label>
                    <div>
                      <input
                        datepicker
                        datepicker-format="mm/yy"
                        id="phone"
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 focus:border-blue-500"
                        placeholder="Enter your phone number"
                        required
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <p className="text-red-600 font-bold text-sm">
                          {formik.errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="details"
                      className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900"
                    >
                      details
                    </label>
                    <input
                      type="number"
                      id="details"
                      aria-describedby="helper-text-explanation"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 "
                      placeholder=""
                      required
                      name="details"
                      value={formik.values.details}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.details && formik.touched.details && (
                      <p className="text-red-600 font-bold text-sm">
                        {formik.errors.details}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                  onClick={()=>{
                    setPay('cash')
                  }}
                    type="submit"
                    className="btn bg-mainColor hover:bg-green-700 w-1/2 flex justify-center"
                  >
                    Cash payment
                  </button>
                  <button
                  onClick={()=>{
                    setPay('online')
                  }}
                    type="submit"
                    className="btn bg-mainColor hover:bg-green-700 w-1/2 flex justify-center"
                  >
                    Online payment
                  </button>
                </div>

                {/* images */}
                <div className="mt-6 flex items-center justify-center gap-8">
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                    alt
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                    alt
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                    alt
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
