/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { authContext } from "../../Context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;

  const navigate = useNavigate();

  const { token, setToken , verifyToken} = useContext(authContext);
  const [showPassword , setShowPassword] = useState('password')

  function showPass(){
    setShowPassword(showPassword == 'password' ? 'text' :'password') 
  }

  const validationSchema = object({
    email: string().required("email is required").email(),
    password: string()
      .required()
      .matches(
        passwordRegex,
        "password must start with capital letter then followed by 5 letters or more"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToLogin,
    validationSchema,
  });

  async function sendDataToLogin(values) {
    const loadingToast = toast.loading("loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      localStorage.setItem("token", data.token);
      setToken(data.token)
      verifyToken()
      toast.success("logged in successfully");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="py-30">
      <h2 className="text-3xl font-bold">Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-4">
          <label htmlFor="">Email</label>
          <input
            className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white w-full"
            type="text"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="">Password</label>
          <input
            className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white w-full "
            type={showPassword}
            placeholder="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {showPassword == 'password' ? <Eye className="absolute top-[47%] right-2 text-gray-400 cursor-pointer" onClick={showPass}/> : <EyeOff className="absolute top-[47%] right-2 text-gray-400 cursor-pointer" onClick={showPass}/>}
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div className="flex  items-center space-x-2">
          <button
            type="submit"
            className="bg-mainColor text-white p-2 rounded-md my-3"
          >
            Login 
          </button>
          

          <Link to={'/forgetPassword'} className="cursor-pointer hover:text-mainColor relative hover:transition-all hover:after:duration-500 hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-mainColor after:bottom-0 after:left-0">
            Forget Password
          </Link>
        </div>
      </form>
    </div>
  );
}
