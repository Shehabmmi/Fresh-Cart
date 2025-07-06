import React from 'react'
import amazonLogo from '../../assets/amazon-pay.png'
import masterCardLogo from '../../assets/mastercard.webp'
import payPal from '../../assets/paypal.png'
import americanExpress from '../../assets/American-Express-Color.png'
import appleStore from '../../assets/get-apple-store.png'
import googlePlay from '../../assets/get-google-play.png'

export default function Footer() {
  return (
    <div className='bg-slate-200 p-4 space-y-4'>
      {/* Header */}
      <div>
        <h2 className='text-xl font-light'>Get the FreshCart app</h2>
        <p className='text-slate-500'>
          We will send you a link, open it in your phone to download the app
        </p>
      </div>

      {/* Email Input */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <input
          className='bg-white focus:outline-none p-2 rounded-md grow'
          type='text'
          placeholder='Email..'
        />
        <button className='bg-mainColor text-white p-2 rounded-xl'>
          Share App Link
        </button>
      </div>

      {/* Footer Bottom */}
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>
        {/* Payment Partners */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap'>
          <p className='text-xl min-w-max'>Payment Partners</p>
          <div className='flex flex-wrap gap-3'>
            <img className='w-16' src={amazonLogo} alt='amazonLogo' />
            <img className='w-16' src={masterCardLogo} alt='masterCardLogo' />
            <img className='w-16' src={payPal} alt='payPal' />
            <img className='w-16' src={americanExpress} alt='americanExpress' />
          </div>
        </div>

        {/* App Store Buttons */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center space-x-4'>
          <p className='text-xl min-w-max'>Get deliveries with FreshCart</p>
          <div className='flex gap-3'>
            <img className='w-24' src={appleStore} alt='appleStore' />
            <img className='w-24' src={googlePlay} alt='googlePlay' />
          </div>
        </div>
      </div>
    </div>
  )
}
