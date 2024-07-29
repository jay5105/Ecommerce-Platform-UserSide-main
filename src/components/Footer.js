// src/Footer.js
import React from "react";

function Footer() {
  return (
    <div className="bg-black py-10 lg:px-28 sm:px-10 flex flex-col ps-8 md:flex-wrap md:flex-row sm:flex-row sm:flex-wrap lg:flex-row justify-between text-white" style={{ fontFamily: 'Poppins' }}>
      <div className="w-1/2 lg:w-2/5 md:w-1/2 sm:w-full lg:pe-20 mb-10 lg:mb-0">
        <h1 className="pb-3 font-bold text-3xl text-yellow-300 cursor-pointer">MintMart</h1>
        <h1 className="pb-3 font-bold text-xl">About Us</h1>
        <p className="font-bold text-medium text-gray-400">
          MintMart is your one-stop shop for all your shopping needs, offering a wide variety of products from electronics to fashion, home essentials, and more. We are dedicated to providing you with the best shopping experience online.
        </p>
      </div>
      <div className="w-1/2 lg:w-1/5 md:w-1/2 sm:w-full">
        <h1 className="pb-6 lg:pb-10 font-bold text-xl cursor-pointer">Categories</h1>
        <ol>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">Electronics</li>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">Fashion</li>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">Home & Kitchen</li>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">Beauty & Personal Care</li>
        </ol>
      </div>
      <div className="w-1/2 lg:w-1/5 md:w-1/2 sm:w-full">
        <h1 className="pb-6 lg:pb-10 font-bold text-xl cursor-pointer">Customer Service</h1>
        <ol>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">Help Center</li>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">Returns</li>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">Shipping</li>
          <li className="text-gray-400 font-bold pb-3 cursor-pointer">FAQs</li>
        </ol>
      </div>
      <div className="w-1/2 lg:w-1/5 md:w-1/2 sm:w-full">
        <h1 className="pb-6 lg:pb-10 font-bold text-xl cursor-pointer">Contact Us</h1>
        <ol>
          <li className="font-bold pb-3 cursor-pointer"><i className="ri-mail-fill text-yellow-300"></i> &nbsp;support@mintmart.com</li>
          <li className="font-bold pb-3 cursor-pointer"><i className="ri-phone-fill text-yellow-300"></i> &nbsp;+1 800 123 4567</li>
        </ol>
      </div>
    </div>
  );
}

export default Footer;
