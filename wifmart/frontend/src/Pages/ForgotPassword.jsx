import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Logo from '../components/Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
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
    <section id='forgot-password'>
      <div className='mx-auto container p-4 mt-[60px] lg:mt-0'>
        <div className='flex justify-center mb-8'>
        <Link to="/">
      <Logo w="100px" h="20px" />
    </Link>
        </div>
        <div className='bg-white mx-auto p-4 w-full max-w-md py-5'>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  className='w-full h-full outline-none bg-transparent'
                  required
                />
              </div>
            </div>

            <button
              className='bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-4 w-full text-center max-w-[150px] rounded-md hover:scale-110 transition-all mx-auto block mt-6'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          <p className='my-5'>Remembered your password?
            <Link to={'/login'} className='text-yellow-600 hover:underline hover:text-yellow-700'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
