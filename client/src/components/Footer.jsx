import React from 'react';
import { FaGithub, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-[#161A20] text-[#9FB1D1] font-poppins-custom">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-10 py-10">
        <div className="md:w-1/2 px-16">
          <h1 className="text-4xl md:text-5xl font-lexend-giga-custom mb-4 text-[#F1F5FF]	">
            Let's talk
          </h1>
          <p className="leading-relaxed">
            We handle everything from concept to clean-up, so you can relax and enjoy your special moments stress-free.
            <br />
            With Elenza, every event becomes a story worth sharing — stylish, smooth, and uniquely yours.
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 space-y-5 pl-[200px]">
          <div className="flex gap-5">
            <div className="font-semibold w-20 text-[#F1F5FF]	">Email</div> {/* lighter cream */}
            <div>Evenza123@gmail.com</div>
          </div>
          <div className="flex gap-5">
            <div className="font-semibold w-20 text-[#F1F5FF]	">Phone</div> {/* lighter cream */}
            <div>(+65) 98735984</div>
          </div>
          <div className="flex gap-5">
            <div className="font-semibold w-20 text-[#F1F5FF]	">Address</div> {/* lighter cream */}
            <div>
              1 Paya Lebar Link
              <br />
              #04-01, Paya Lebar Quarter
              <br />
              Singapore, 408533
            </div>
          </div>
        </div>
      </nav>

      {/* Divider */}
      <hr className="border-gray-700 mx-6" />

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 text-sm text-gray-400">
        <span className="pl-16">
          © 2025{' '}
          <a href="#" className="hover:underline text-[#C3D0E5]">
            Evenza
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex gap-4 mt-4 sm:mt-0 text-xl pr-16">
          <a href="#" target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-gray-300" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaInstagram className="hover:text-pink-400" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaTwitter className="hover:text-blue-400" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaFacebook className="hover:text-blue-600" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
