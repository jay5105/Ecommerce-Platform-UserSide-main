import React from 'react';

function AboutUs() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mt-10 py-10 text-gray-800" style={{ fontFamily: 'Poppins' }}>About Us</h2>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800 text-center" style={{ fontFamily: 'Poppins' }}>Meet Our Founder</h3>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full lg:w-1/3 p-4">
              <img 
                src="https://fdopportunities.com/wp-content/uploads/2019/12/fdo-bsherman-480x480.jpg" 
                alt="Dhruv Zanzmera" 
                className="w-full h-auto rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:contrast-125"
              />
            </div>
            <div className="w-full lg:w-2/3 p-4">
              <h3 className="text-3xl font-semibold mb-4 text-gray-800" style={{ fontFamily: 'Poppins' }}>Dhruv Zanzmera</h3>
              <p className="text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                Dhruv Zanzmera is the passionate founder of MintMart. With a background in Information Technology, Dhruv has always been dedicated to business. His journey began when he noticed a gap in the market, which led him to leave his previous job and start MintMart.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                Under his leadership, MintMart has grown from a small startup to a global brand. Dhruv's vision for MintMart is to continuously innovate and provide exceptional value to customers, while maintaining the highest standards of quality and service.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                Dhruv believes in the power of sustainability and customer satisfaction, and ensures that these principles are at the core of MintMart's operations.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800 text-center" style={{ fontFamily: 'Poppins' }}>Our Achievements</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
              <div className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Poppins' }}>10K+</div>
              <div className="text-gray-600" style={{ fontFamily: 'Poppins' }}>Happy Customers</div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
              <div className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Poppins' }}>500+</div>
              <div className="text-gray-600" style={{ fontFamily: 'Poppins' }}>Products</div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
              <div className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Poppins' }}>50+</div>
              <div className="text-gray-600" style={{ fontFamily: 'Poppins' }}>Countries Served</div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
              <div className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Poppins' }}>5</div>
              <div className="text-gray-600" style={{ fontFamily: 'Poppins' }}>Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
