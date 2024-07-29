import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await axios.get('http://localhost:5000/UserData', {
            headers: {
              auth: token
            }
          });
          if (response.data.status === 'Success') {
            setUser(response.data.data);
          } else {
            console.log('User data fetch failed:', response.data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleMenuItemClick = () => {
    setIsOpen(false); // Close the menu when a menu item is clicked
  };

  return (
    <nav className="bg-black text-white p-4 z-50 fixed top-0 w-full" style={{ fontFamily: 'poppins' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-bold text-3xl text-yellow-300 cursor-pointer">MintMart</h1>
        </div>
        <div className="hidden lg:flex items-center">
          <Link
            to="/"
            className="ml-4 text-white hover:text-gray-200"
            onClick={handleMenuItemClick}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="ml-4 text-white hover:text-gray-200"
            onClick={handleMenuItemClick}
          >
            About
          </Link>
          <Link
            to="/product"
            className="ml-4 text-white hover:text-gray-200"
            onClick={handleMenuItemClick}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="ml-4 text-white hover:text-gray-200"
            onClick={handleMenuItemClick}
          >
            Cart
          </Link>
          <Link
            to="/order"
            className="ml-4 text-white hover:text-gray-200"
            onClick={handleMenuItemClick}
          >
            Orders
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                className="ml-4 text-white hover:text-gray-200 bg-yellow-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleMenuItemClick}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-4 text-white hover:text-gray-200 bg-yellow-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleMenuItemClick}
              >
                Signup
              </Link>
            </>
          )}
          {user && (
        <div className="hidden lg:flex items-center mt-4 lg:mt-0">
          <img
            src={`http://localhost:5000/images/${user.profileImage}`} // Placeholder image
            alt="User"
            className="ml-4 w-10 h-10 rounded-full mr-2"
          />
          <Link
            to="/profile"
            className="text-white hover:text-gray-200 mr-4"
            onClick={handleMenuItemClick}
          >
            {user.name}
          </Link>
          <button
            onClick={logout}
            className="text-white hover:text-gray-200 bg-yellow-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <Link
          to="/"
          className="block mt-4 text-white hover:text-gray-200"
          onClick={handleMenuItemClick}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="block mt-4 text-white hover:text-gray-200"
          onClick={handleMenuItemClick}
        >
          About
        </Link>
        <Link
          to="/product"
          className="block mt-4 text-white hover:text-gray-200"
          onClick={handleMenuItemClick}
        >
          Products
        </Link>
        <Link
          to="/cart"
          className="block mt-4 text-white hover:text-gray-200"
          onClick={handleMenuItemClick}
        >
          Cart
        </Link>
        <Link
          to="/order"
          className="block mt-4 text-white hover:text-gray-200"
          onClick={handleMenuItemClick}
        >
          Orders
        </Link>
        {!user && (
          <>
            <Link
              to="/login"
              className="block mt-4 text-white hover:text-gray-200 bg-yellow-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleMenuItemClick}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block mt-4 text-white hover:text-gray-200 bg-yellow-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleMenuItemClick}
            >
              Signup
            </Link>
          </>
        )}
        {user && (
          <>
            <Link
              to="/profile"
              className="block mt-4 text-white hover:text-gray-200"
              onClick={handleMenuItemClick}
            >
              <div className="flex items-center">
                <img
                  src={`http://localhost:5000/images/${user.profileImage}`} // Placeholder image
                  alt="User"
                  className="w-10 h-10 rounded-full mr-2"
                />
                {user.name}
              </div>
            </Link>
            <button
              onClick={logout}
              className="block mt-4 text-white hover:text-gray-200 bg-yellow-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Logout
            </button>
          </>
        )}
      </div>

   
      
    </nav>
  );
};

export default Navbar;
