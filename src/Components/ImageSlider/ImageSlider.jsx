import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function ImageSlider() {

    let[category,setCategory] = useState([])

    async function getProducts() {
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            setCategory(data.data)
        } catch (error) {
            console.log(error);
        }
    }

      var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed:1500,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  };

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div>
        <h1 className='py-2 text-xl text-mainColor text'>shop now by popular categories</h1>
   <Slider {...settings}>
  {category.map((category, index) => (
    <div key={index} className="px-1">
      <img
        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-xl"
        src={category.image}
        alt={category.name}
      />
    </div>
  ))}
</Slider>
    </div>
  )
}
