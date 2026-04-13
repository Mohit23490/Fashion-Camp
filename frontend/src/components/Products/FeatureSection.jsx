import React from 'react'
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { MdOutlineCreditCard } from "react-icons/md";
const FeatureSection = () => {
  return (
     <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
           {/* Features */}


           <div className='flex flex-col items-center '>
             <div className='p-4 rounded-full mb-4 '>
                <FiShoppingBag  className='text-xl'/>
             </div>
             <h4 className='tracking-tighter mb-2 '>
               FREE INTERNATIONAL SHIPPING.
             </h4>
             <p className='text-gray-600 text-sm tracking-tighter'>
                On all orders over $100.00
             </p>
           </div>


           <div className='flex flex-col items-center '>
             <div className='p-4 rounded-full mb-4 '>
                <HiOutlineArrowPathRoundedSquare   className='text-xl'/>
             </div>
             <h4 className='tracking-tighter mb-2 '>
               45 DAYS RETURN.
             </h4>
             <p className='text-gray-600 text-sm tracking-tighter'>
                 Money Back guarantee
             </p>
           </div>

           <div className='flex flex-col items-center '>
             <div className='p-4 rounded-full mb-4 '>
                <MdOutlineCreditCard  className='text-xl'/>
             </div>
             <h4 className='tracking-tighter mb-2 '>
               SECURE CHECKOUT.
             </h4>
             <p className='text-gray-600 text-sm tracking-tighter'>
                 100% secure checkout process.
             </p>
           </div>
        </div>
     </section>
  )
}

export default FeatureSection