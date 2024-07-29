import React from 'react';

const categories = [
  {
    imgSrc: "https://media.istockphoto.com/id/637699518/vector/home-appliances-gas-cooker-refrigerator-microwave-and-washi.jpg?s=612x612&w=0&k=20&c=IazFnGqtDuj7iND7ZJ9yWqRu_QYXIKVYuchLSGsdMNU=",
    title: "Electronics",
    description: "Discover the latest and greatest in electronics, from smartphones to home appliances."
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Fashion",
    description: "Stay stylish with the latest trends in clothing, accessories, and footwear for all ages."
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhxE7HTqaMMdeIs0N9d7NA3cDixUaELZCDDzaAENgqLTAt1-bpXGUgAXjXSUcb7cOU4I&usqp=CAU",
    title: "Home & Kitchen",
    description: "Find everything you need to make your home cozy and functional, from furniture to kitchenware."
  },
  {
    imgSrc: "https://img.freepik.com/free-photo/gua-sha-care-products-arrangement_23-2149322589.jpg",
    title: "Beauty & Health",
    description: "Enhance your well-being with our range of beauty and health products."
  },
  {
    imgSrc: "https://media.istockphoto.com/id/1136317339/photo/sports-equipment-on-floor.jpg?s=612x612&w=0&k=20&c=-aI8u_Se89IC-HJZYH724ei5z-bIcSvRW6qUwyMtRyE=",
    title: "Sports & Outdoors",
    description: "Gear up for your next adventure with our selection of sports and outdoor equipment."
  },
  {
    imgSrc: "https://burst.shopifycdn.com/photos/colorful-kids-toys.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    title: "Toys & Games",
    description: "Discover a world of fun with our wide range of toys and games for kids of all ages."
  }
];

function Section1() {
  return (
    <div className='overflow-x-hidden bg-gray-100 py-10 w-full'>
      <h1 className='font-bold text-center text-2xl lg:text-4xl sm:text-3xl md:text-3xl lg:px-10 lg:py-4 md:py-3 sm:py-4' style={{ fontFamily: 'poppins' }}>
        Our Categories
      </h1>
      <h3 className='font-medium text-center py-3 lg:text-base sm:text-sm md:text-sm px-4' style={{ fontFamily: 'poppins' }}>
        Explore a wide range of categories tailored to meet your specific shopping needs:
      </h3>

      <div className='parentbox flex flex-wrap justify-center items-center lg:mx-10'>
        {categories.map((category, index) => (
          <div key={index} className="boxs my-2 mx-2 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full max-w-xs">
            <img src={category.imgSrc} alt={category.title} className='w-full h-40 object-cover'/>
            <h1 className='text-xl text-center py-2 font-semibold' style={{ fontFamily: 'poppins' }}>{category.title}</h1>
            <p className='text-center text-xs px-3' style={{ fontFamily: 'poppins' }}>
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section1;
