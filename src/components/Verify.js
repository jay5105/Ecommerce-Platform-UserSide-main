import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

function Verify() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:5000/verifyOTP', {
        email: formData.email,
        otp: formData.otp
      });

      console.log(response.data); 
      navigate('/login');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400 ">Verify Email OTP</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {loading ? (
              <Circles
                height="24"
                width="24"
                color="#FFFFFF"
                ariaLabel="circles-loading"
                visible={true}
              />
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Go back to <Link to="/signup" className="text-yellow-500  hover:text-yelow-600">Sign Up</Link> page
        </p>
      </div>
    </div>
  );
}

export default Verify;
