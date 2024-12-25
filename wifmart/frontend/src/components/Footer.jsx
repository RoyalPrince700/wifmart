import React from 'react'
import Logo from './Logo'
import { FaCcMastercard } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { RiPaypalLine } from "react-icons/ri";



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10 py-10 px-4 lg:px-10">
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* WIFMART Info */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold mb-4">WIFMART</h4>
        <p className="text-gray-400">
          Wifmart is dedicated to providing high-quality products with excellent
          customer service. Enjoy fast shipping, secure payments, and a seamless shopping experience with us.
        </p>
        <div className='text-white text-xl'>
           <p>WIFMART</p>
        </div>
      
      </div>
  
      {/* Customer Service */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold mb-4">Customer Service</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="/contact" className="hover:text-yellow-500">Contact Us</a></li>
          <li><a href="/shipping" className="hover:text-yellow-500">Shipping & Delivery</a></li>
          <li><a href="/returns" className="hover:text-yellow-500">Returns & Refunds</a></li>
          <li><a href="/faq" className="hover:text-yellow-500">FAQs</a></li>
          <li><a href="/terms" className="hover:text-yellow-500">Terms & Conditions</a></li>
        </ul>
      </div>
  
      {/* Quick Links */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="/about" className="hover:text-yellow-500">About WIFMART</a></li>
          <li><a href="/shop" className="hover:text-yellow-500">Shop</a></li>
          <li><a href="/blog" className="hover:text-yellow-500">Blog</a></li>
          <li><a href="/careers" className="hover:text-yellow-500">Careers</a></li>
          <li><a href="/privacy" className="hover:text-yellow-500">Privacy Policy</a></li>
        </ul>
      </div>
  
      {/* Newsletter and Social Media */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold mb-4">Stay Connected</h4>
        <p className="text-gray-400">Subscribe to our WIFMART newsletter for updates on promotions and new arrivals.</p>
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button className="px-3 py-2 bg-yellow-600 text-white rounded-r-md hover:bg-yellow-500">
            Subscribe
          </button>
        </div>
        <div className="flex space-x-4 mt-4">
          <a href="https://facebook.com" className="text-2xl hover:text-yellow-500"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" className="text-2xl hover:text-yellow-500"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" className="text-2xl hover:text-yellow-500"><i className="fab fa-instagram"></i></a>
          <a href="https://linkedin.com" className="text-2xl hover:text-yellow-500"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
  
    {/* Footer Bottom */}
    <div className="border-t border-gray-700 mt-8 pt-6 text-gray-400">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p>&copy; 2024 WIFMART. All Rights Reserved.</p>
        <div className="flex space-x-4">
          <FaCcMastercard/>
         <FaCreditCard/>
         <RiPaypalLine/>
        </div>
      </div>
    </div>
  </footer>
  
  )
}

export default Footer