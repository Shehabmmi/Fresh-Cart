import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
// import { data } from "react-router-dom";


export default function Register() {
  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const validationSchema = object({
    name: string("name must be string").required("name is required").min(3, "name must be atleast 3 chars").max(20),
    email: string().required("email is required").email("email must be valid"),
    password: string().required().matches(passwordRegex,"password must start with capital letter then followed by 5 letters or more"),
    rePassword: string().required().matches(passwordRegex).oneOf([ref("password")], "password not match"),
    phone: string().required().matches(phoneRegex, "phone must be an Egyption number"),
  });

  async function sendDataToRegister(values) {
    const loadingToast = toast.loading('loading...')
    try {
      setError("")
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Account registerd successfully")
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message)
      
    }finally{
      toast.dismiss(loadingToast)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  });

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold">Register Form</h2>
      {error && <h3 className="text-red-500 text-2xl my-3 text-center">{error}</h3>}
      <form className="my-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col my-4">
          <label htmlFor="">username:</label>
          <input
            className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white"
            type="text"
            placeholder="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 font-bold">{formik.errors.name}</p>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="">email:</label>
          <input
            className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white"
            type="email"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 font-bold">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="">password:</label>
          <input
            className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white"
            type="password"
            placeholder="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 font-bold">{formik.errors.password}</p>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="">confirm password:</label>
          <input
            className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white"
            type="password"
            placeholder="repassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 font-bold">{formik.errors.rePassword}</p>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="">phone:</label>
          <input
            className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white"
            type="text"
            placeholder="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 font-bold">{formik.errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-mainColor text-white p-2 rounded-md my-3"
        >
          Register
        </button>
      </form>
    </div>
  );
}
