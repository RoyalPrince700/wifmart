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
    setIsSubmitting(true); // disable button on submit
  
    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
  
      if (response.ok && result.success) {
        toast.success(result.message);
        fetchUserDetails();
        fetchUserAddToCart();
        navigate('/');
      } else if (result.message === "Email not verified. Please verify your email before logging in.") {
        toast.warning("Your email is not verified. Please check your email for verification instructions.");
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
      <div className="mx-auto container p-4 mt-[60px] lg:mt-0">
        <div className="flex justify-center mb-8">
        <Link to="/">
      <Logo w="100px" h="20px" />
    </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white mx-auto p-4 w-full max-w-md py-5 rounded-md shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <p className="text-center text-gray-500 mb-6">Access your account.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-gray-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="bg-gray-100 flex p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-yellow-500 mt-1"
              >
                Forgot Password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <p className="my-5 text-center">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-yellow-600 hover:underline hover:text-yellow-700"
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
