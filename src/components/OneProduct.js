import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import Modal from './Model';
import { Circles } from 'react-loader-spinner'; // Import spinner component

function truncateName(name) {
  return name.length > 50 ? `${name.substring(0, 50)}...` : name;
}

function OneProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [fadeIn, setFadeIn] = useState(false); // State for fade-in effect

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Product/${id}`);
        setProduct(response.data.data);
        setSelectedImage(response.data.data.image[0]); // Set the first image as the default selected image
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setFadeIn(true);
        }, 500); // Show spinner for at least 1 second
      }
    };

    fetchProduct();
  }, [id, token, navigate]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/UserData', {
        headers: {
          auth: token
        }
      });

      if (response.data.status === 'Success') {
        await axios.post(`http://localhost:5000/addCart/${id}`, {
          quantity: quantity
        }, {
          headers: {
            auth: token
          }
        });
        setModalMessage('The product has been successfully added to your cart.');
        setIsModalOpen(true); // Show the confirmation modal
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalMessage === 'The product has been successfully added to your cart.') {
      navigate('/cart'); // Navigate to the cart page after closing the modal
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Circles
          height="80"
          width="80"
          color="#FDE047"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className={`py-10 mt-20 bg-gray-100 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className='container mx-auto px-6'>
        <button onClick={() => navigate('/')} className='mb-4 bg-gray-900 text-white py-2 px-4 rounded'>
          <i className="ri-arrow-left-line"></i> Back to Products
        </button>
        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='p-4 flex flex-col lg:flex-row items-start'>
            <div className='flex flex-col flex-wrap justify-center mb-4 lg:mb-0'>
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/images/${img}`}
                  alt={product.name}
                  className={`w-20 h-20 object-contain cursor-pointer m-2 ${selectedImage === img ? 'border-2 border-yellow-500' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className='w-full lg:w-1/2 flex justify-center mb-4'>
              <img src={`http://localhost:5000/images/${selectedImage}`} alt={product.name} className='w-96 h-96 lg:w-[40vw] lg:h-[40vw] object-contain' />
            </div>
            <div className='text-left lg:w-[50vw]'>
              <h2 className='text-3xl font-bold mb-4' style={{ fontFamily: 'Poppins' }}>{product.name}</h2>
              <div className='flex items-center mb-4'>
                <span className='text-gray-600 mr-2 py-1 flex items-start' style={{ fontFamily: 'Poppins' }}>
                  <h6 className='text-lg'>₹</h6>
                  <h1 className='text-2xl'>{product.price}</h1>
                </span>
                <span className='line-through text-red-500' style={{ fontFamily: 'Poppins' }}>{product.price + 500}</span>
              </div>
              <div className='flex items-center mb-4'>
                {product.quantity > 0 ? (
                  <>
                    <input
                      type='number'
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min='1'
                      className='w-16 border rounded mr-4 p-1'
                    />
                    <button
                      onClick={handleAddToCart}
                      className='bg-yellow-400 text-black py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-yellow-500'
                      style={{ fontFamily: 'Poppins' }}
                    >
                      Add to Cart <i className="ri-arrow-right-line"></i>
                    </button>
                  </>
                ) : (
                  <p className='text-red-500 text-lg font-bold'>Out of Stock</p>
                )}
              </div>
              <p className='text-lg my-4 font-bold' style={{ fontFamily: 'Poppins' }}>About this item</p>
              <ul className='mt-4 list-disc pl-5' style={{ fontFamily: 'Poppins' }}>
                {product.features.map((feature, index) => (
                  <li key={index} className='mb-2'>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCloseModal}
        title="Product Status"
        message={modalMessage}
      />
    </div>
  );
}

export default OneProduct;
