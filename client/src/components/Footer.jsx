import React from 'react'
import { FaGithub, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <div>
      <div className=' text-white bg-gray-800'>
        <nav class="flex justify-between items-center p-4 text-white bg-gray-800 ">
          <div className='ml-7 max-w-1/2 mt-10'>
          <h1 className='text-left  text-5xl '>Let's talk</h1>
            <div className='mt-5'>We handle everything from concept to clean-up, so you can relax and enjoy your special moments stress-free.
With Elenza, every event becomes a story worth sharing — stylish, smooth, and uniquely yours.
            </div>

          </div>
          <div className='flex flex-col mt-10'>
            <div className='flex flex-row pr-10 pb-4 gap-10'>
              <div className='font-bold'>Email</div>
              <div className='pl-10'>Evenza123@gmail.com</div>
            </div>
            <div className='flex flex-row pr-10  pb-4 gap-10'>
              <div className='font-bold'>Phone</div>
              <div className='pl-8'>(+65) 98735984</div>
            </div>
            <div className='flex flex-row pr-10  gap-10'>
              <div className='font-bold'>Address</div>
              <span className='pl-6'>
                1 Paya Lebar Link<br />
                #04-01, Paya Lebar Quarter<br />
                Singapore, 408533
              </span>

            </div>
          </div>
        </nav>
        <hr className="my-3 mb-0 border-gray-200 sm:mx-auto lg:my-8" />
          
         <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 mb-4 ml-10">
                        © 2025
                        <a href="" className="hover:underline">
                            Elenza
                        </a>
                        . All Rights Reserved.
          </span>
          <div className="flex space-x-4 text-white text-xl mb-3 mr-12">
            <a href="" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-gray-400" />
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-400" />
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-blue-400" />
            </a>
            <a href="" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600" />
            </a>
          </div>
         </div>
      </div>

    </div>
  )
}

export default Footer
