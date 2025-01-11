import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import SummaryApi from '../common';
import Context from '../context';
import Logo from '../components/Logo';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button on submit
  
    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
  
      if (response.ok && result.success) {
        toast.success(result.message);
        fetchUserDetails();
        fetchUserAddToCart();
        navigate("/"); // Redirect to homepage
      } else if (result.redirect) {
        // Redirect for unverified email
        toast.warning(result.message || "Redirecting to verification...");
        navigate("/token-verification"); // Redirect to the token page
      } else {
        toast.error(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };
  
  

  return (
    <section id="login">
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
        <p className="text-center text-gray-300 mb-6">Access your account</p>
  
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
            <div className="flex items-center bg-gray-800/60 p-3 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-transparent text-white focus:outline-none"
                required
              />
              <div
                className="cursor-pointer text-xl ml-3 text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="block mt-2 text-sm text-yellow-500 hover:underline hover:text-yellow-400 text-right"
            >
              Forgot Password?
            </Link>
          </div>
  
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </motion.button>
        </form>
  
        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-yellow-500 hover:underline hover:text-yellow-400"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  </section>
  
  );
};

export default Login;
