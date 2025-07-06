import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function VerifyOtp() {
  const navigate = useNavigate();

    const validationSchema = object({
    resetCode: string().required("Reset code is required"),
    })


  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit:sendDataToVerifyOtp,
    validationSchema,
  });

  async function sendDataToVerifyOtp(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(options);
      toast.success("Done");
      setTimeout(() => {
        navigate("/resetpassword");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="py-53">
      <h1 className="text-2xl mb-3">
        Enter the code your received in your email
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="">OTP</label>
        <input
          className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white w-full"
          type="text"
          placeholder="Enter the code"
          name="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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
