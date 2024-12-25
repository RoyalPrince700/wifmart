import React, { useContext, useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';
import Logo from '../components/Logo';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "" // corrected typo
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart, } = useContext(Context);

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
      console.log("Submitting login form with data:", data); // Debug log
  
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      console.log("Response status:", response.status); // Log HTTP status
      const result = await response.json();
      console.log("Response body:", result); // Log API response
  
      if (response.ok && result.success) {
        console.log("Login successful:", result.message); // Debug log for success
        toast.success(result.message);
        fetchUserDetails();
        fetchUserAddToCart();
        navigate('/');
      } else {
        console.warn("API returned an error:", result.message); // Warn for backend errors
        toast.error(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Network or other error occurred:", error); // Error log
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };
  
  return (
    <section id='login'>
      <div className='mx-auto container p-4 mt-16 lg:mt-0'>

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
                  placeholder='enter mail'
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
                  placeholder='enter password'
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
                <div className='cursor-pointer text-xl'
                  onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'}
                className='block w-fit ml-auto hover:underline hover:text-yellow-500'>
                Forgot Password ?
              </Link>
            </div>

            <button className='bg-yellow-600 hover:bg-yellow-700 text-white px-6
              py-4 w-full text-center max-w-[150px] rounded-md hover:scale-110 
              transition-all mx-auto block mt-6'
              type='submit'
              disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className='my-5'>Don't have account ?
            <Link to={"/sign-up"} className='text-yellow-600 hover:underline hover:text-yellow-700'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login;


