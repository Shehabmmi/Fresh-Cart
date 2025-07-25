import axios from 'axios';
// Remove these unused imports:
// import { Formik, useFormik } from 'formik'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
// import { data, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

export default function ResetPassword() {

    const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;

    const navigate = useNavigate();
    const validationSchema = object({
            email: string().required('email is required').email(),
            newPassword: string().required('password is required').matches(passwordRegex)
        })


    const formik = useFormik({
        initialValues: {
          email: "",
          newPassword:""
        },
        onSubmit:sendDataToResetPassword,
        validationSchema,
      });

      async function sendDataToResetPassword(values) {
        try {
          const options = {
            url:'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
            method:'PUT',
            data: values
          };
          
          const {data} = await axios.request(options);
          toast.success('Password has changed successfully')
          setTimeout(() => {
        navigate("/login");
      }, 2000);


        } catch (error) {
            toast.error(error.response.data.message)
        }
      }

  return (
    <div className='py-36'>
      <h1 className='text-2xl'>Reset Password</h1>
      <form onSubmit={formik.handleSubmit} >

        {/* email */}
        <div>
            <label htmlFor="">Email</label>
        <input
          className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white w-full"
          type="email"
          placeholder="Enter your email"
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </div>
        

        {/* password */}
        <div>
            <label htmlFor="">New Password</label>
        <input
          className="p-2 rounded-md focues:outline-none border-2 border-slate-200 bg-white w-full"
          type="password"
          placeholder="Enter your new password"
          name='newPassword'
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </div>

        
        <button type="submit" className="bg-mainColor text-white p-2 rounded-md my-3"> Submit </button>
      </form>
    </div>
  )
}
