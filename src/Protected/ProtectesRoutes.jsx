import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ProtectesRoutes({children}) {

  let {token} = useContext(authContext)
  return (
    <div>
         {/* لو هو عامل تسجيل دخول وفيه توكن متخزن في الlocalStorage هيعرض الchildren */}
         {/* لو مفيش توكن هيعمل ريديركت للصفحة بتاعة تسجيل الدخول */}
      {localStorage.getItem('token') ? children : <Navigate to={'/login'}/>}
    </div>
  )
}