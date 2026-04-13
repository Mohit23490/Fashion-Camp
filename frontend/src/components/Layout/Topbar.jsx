import React from 'react'
import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
const Topbar = () => {
  return (
    <div className=' bg-[#ea2e0e] text-white '>
       <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className='hidden md:flex items-center space-x-4'>
            <a href="#" className='hover:text-gray-300'>
              <FaMeta className='h-5 w-5'/>
            </a>
            <a href="#" className='hover:text-gray-300'>
              <FaInstagram className='h-5 w-5'/>
            </a>
            <a href="#" className='hover:text-gray-300'>
              <FaXTwitter className='h-5 w-5'/>
            </a>
          </div>
          <div className='text-small text-center grow '>
             <span>We Ship worldwide - Fast and reilaible Shipping </span>
          </div>
          <div className='hidden text-small md:block'>
            <a href="#" className='hover:text-gray-300'> +91 2354830234 </a>
          </div>
       </div>
    </div>
  )
}

export default Topbar