import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

    // Reset password mismatch error when user starts typing
    if (name === 'confirmPassword' || name === 'password') {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setPasswordMismatch(true);
      return; // Stop further execution
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        credentials: 'include', // Include cookies
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);

        // Automatically redirect to home
        navigate('/');
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
    <section id='signup'>
      <div className='mx-auto container p-4 mt-[100px] lg:mt-0'>
        <div className='flex justify-center mb-8'>
          <Link to="/">
            <Logo w="120px" h="30px" />
          </Link>
        </div>
        <div className='bg-white mx-auto p-4 w-full max-w-md py-5'>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className='bg-slate-100 flex p-2'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={data.password}
                  onChange={handleChange}
                  placeholder='Enter password'
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password :</label>
              <div className={`bg-slate-100 flex p-2 ${passwordMismatch ? 'border border-red-500' : ''}`}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm password'
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {passwordMismatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              className='bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-4 w-full text-center max-w-[150px] rounded-md hover:scale-110 transition-all mx-auto block mt-6'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className='my-5'>Already have an account?
            <Link to={'/login'} className='text-yellow-600 hover:underline hover:text-yellow-700'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
