import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Brands() {

  const [brands ,setBrands] = useState()
  const [loading, setLoading] = useState(false)

    async function getAllBrands(){
      setLoading(true)
     try {
      
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setBrands(data.data)

    } catch (error) {
      console.log(error);      
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getAllBrands()
  },[])

    if(loading == true){
      return <div class="p-4 animate-pulse">
      <div class='h-6 bg-gray-200 rounded w-1/2 mb-4 mx-auto'></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        <div
            class="bg-gray-200 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
        >
            <div
              class="w-full h-48 bg-gray-300"
            ></div>
        </div>
        <div
            class="bg-gray-200 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
        >
            <div
              class="w-full h-48 bg-gray-300"
            ></div>
        </div>
        <div
            class="bg-gray-200 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
        >
            <div
              class="w-full h-48 bg-gray-300"
            ></div>
        </div>
        <div
            class="bg-gray-200 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
        >
            <div
              class="w-full h-48 bg-gray-300"
            ></div>
        </div>
      </div>
    </div>
    }

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4 text-center text-mainColor border-b-2 border-t-2 p-2">All brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {brands?.map((brands) => (
         <div
            key={brands._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={brands.image}
              alt={brands.name}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
