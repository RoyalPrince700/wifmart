import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';
import Logo from '../components/Logo';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'confirmPassword' || name === 'password') {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setPasswordMismatch(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        navigate('/token-verification');
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
    id="signup"
   
  >
    <div
      className="mx-auto h-[100vh] flex items-center justify-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md bg-gray-700/50 mx-auto p-6 w-full max-w-md rounded-lg shadow-xl"
      >
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo w="120px" h="20px" />
          </Link>
        </div>
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-300">
          Sign Up
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Create your account to get started.
        </p>
  
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium">Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
  
          <div>
            <label className="block mb-2 text-sm font-medium">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-3 rounded-md bg-gray-800/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <div
                className="absolute top-3 right-3 cursor-pointer text-xl text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
  
          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password:
            </label>
            <div
              className={`relative ${
                passwordMismatch ? "ring-2 ring-red-500 rounded-md" : ""
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full p-3 rounded-md bg-gray-800/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <div
                className="absolute top-3 right-3 cursor-pointer text-xl text-gray-400"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {passwordMismatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>
  
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>
  
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-500 hover:underline hover:text-yellow-400"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  </motion.section>
  
  );
};

export default SignUp;
