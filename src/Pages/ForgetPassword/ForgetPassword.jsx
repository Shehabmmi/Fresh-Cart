import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {

    const validationSchema = object({
        email: string().required('email is required').email()
    })
      
    const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendDataToForgetPassword,
    validationSchema,
  });

  async function sendDataToForgetPassword(values) {
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        method: 'POST',
        data: values,
      };
      const {data} = await axios.request(options);
      toast.success('Code has sent to your email')
      setTimeout(() => {
        navigate("/verifyOtp");
      }, 2000);


    } catch (error) {
        toast.error(error.response.data.message)
    }
  }

  return (
    <div className="py-56">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="">Email</label>
        <input
          className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white w-full"
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        <button
          type="submit"
          className="bg-mainColor text-white p-2 rounded-md my-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

