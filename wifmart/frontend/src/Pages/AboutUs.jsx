import React from 'react';

const AboutUs = () => {
  return (
    <div className="mt-[80px] lg:mt-[100px] mx-auto p-4 max-w-4xl">
      <header className=" text-black ">
        <h1 className="text-3xl font-bold text-center">About Us</h1>
        <p className="text-center mt-2 text-lg">Learn more about Wifmart and our mission.</p>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            At Wifmart, our mission is to provide a seamless shopping experience for customers across the nation. 
            We are committed to connecting buyers with trusted sellers while delivering top-notch customer service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800">Who We Are</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Wifmart is a one-stop e-commerce platform for all your shopping needs. From fresh food delivery 
            to everyday essentials, we ensure quality and efficiency in every transaction.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Our platform supports both buyers and sellers, offering a trusted environment for safe and reliable trade.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800">Why Choose Us?</h2>
          <ul className="mt-3 list-disc list-inside text-gray-700 leading-relaxed">
            <li>Fast and reliable delivery services tailored to your needs.</li>
            <li>A wide range of products from trusted vendors.</li>
            <li>Secure payment options with "Pay on Delivery."</li>
            <li>Outstanding customer support available anytime.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
          <p className="mt-3 text-gray-700">Need assistance or have questions? Reach out to us:</p>
          <p className="text-yellow-600 font-semibold mt-2">Phone: 09075799282</p>
          <p className="text-yellow-600 font-semibold">Email: wifmartofficial@gmail.com</p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
