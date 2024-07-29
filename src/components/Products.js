import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'; // Import spinner component
import 'remixicon/fonts/remixicon.css'; // Import RemixIcon CSS for icons

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const [fadeIn, setFadeIn] = useState(false); // State to manage fade-in effect
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [productsPerPage] = useState(8); // Number of products per page
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [priceRange, setPriceRange] = useState(10000); // State for price range input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/AllProducts');
        const allProducts = response.data.data; // Assuming the response data is an array of products
        // Shuffle products array
        const shuffledProducts = shuffleArray(allProducts);
        setProducts(shuffledProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setFadeIn(true);
        }, 500); // Show spinner for at least 1 second
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Function to filter and sort products based on searchTerm and priceRange
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price <= priceRange
    );

    // Update products based on filtered and sorted results
    setProducts(filteredProducts);
  }, [searchTerm, priceRange]);

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center my-10 pt-10 flex-wrap">
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-400 w-full md:w-auto"
              style={{ maxWidth: '100%' }}
            />
            <span className="mx-2">Max Price: ₹{priceRange}</span>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="cursor-pointer w-40 md:w-60"
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: 'Poppins' }}>
          Our Products
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Circles height={80} width={80} color="#FDE047" ariaLabel="circles-loading" visible={true} />
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {currentProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={`http://localhost:5000/images/${product.image[0]}`}
                  alt={product.name}
                  className="w-full h-64 object-contain"
                />
                <div className="p-6 flex flex-col justify-between">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                      fontFamily: 'Poppins',
                      height: '3rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.name.length > 50 ? `${product.name.substring(0, 50)}...` : product.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <span className="text-gray-600 mr-2">
                      <span className="text-lg">₹</span>
                      <span className="text-xl">{product.price}</span>
                    </span>
                    <span className="line-through text-red-500">{' '}
                      {product.price + 500}
                    </span>
                  </div>
                  <button className="bg-yellow-400 text-black py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-yellow-500" style={{ fontFamily: 'Poppins', fontSize: '0.875rem' }}>
                    Add to Cart <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && (
          <div className="flex items-center justify-center mt-6 gap-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`relative h-10 w-10 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all ${
                    currentPage === index + 1
                      ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85]'
                      : 'text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20'
                  }`}
                  disabled={currentPage === index + 1}
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
