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
    <section id="signup">
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
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <p className="text-center text-gray-500 mb-6">Create your account to get started.</p>

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
            </div>

            <div>
              <label>Confirm Password:</label>
              <div
                className={`bg-gray-100 flex p-2 ${
                  passwordMismatch ? 'border border-red-500' : ''
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
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
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </motion.button>
          </form>

          <p className="my-5 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-600 hover:underline hover:text-yellow-700"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUp;
