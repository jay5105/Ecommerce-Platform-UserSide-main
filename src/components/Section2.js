import React from 'react';
import Countdown from 'react-countdown';

function Section2() {
  const promotions = [
    {
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items!',
      imgSrc: 'https://img.freepik.com/premium-vector/summer-sale-vector-design-summer-special-offer-text-podium-stage-product-presentation-holiday_572288-3030.jpg',
      endTime: Date.now() + 10000000, // example countdown end time
    },
    {
      title: 'New Arrivals',
      description: 'Check out our latest collection!',
      imgSrc: 'https://media.istockphoto.com/id/1366258243/vector/vector-illustration-new-arrival-label-modern-web-banner-on-yellow-background.jpg?s=612x612&w=0&k=20&c=ddLMrtth5QRoW-jJe8_ozTWmvRejIFlq3cv4BAIq_HQ=',
      endTime: Date.now() + 5000000, // example countdown end time
    },
  ];

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Poppins' }}>Promotions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {promotions.map((promo, index) => (
            <div key={index} className="bg-white shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img src={promo.imgSrc} alt={promo.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Poppins' }}>{promo.title}</h3>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'Poppins' }}>{promo.description}</p>
                <div className="mb-4">
                  <Countdown date={promo.endTime} />
                </div>
                <button className="bg-gray-900 text-white py-2 px-4 w-full transition duration-300 ease-in-out rounded-lg" style={{ fontFamily: 'Poppins' }}>Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section2;
