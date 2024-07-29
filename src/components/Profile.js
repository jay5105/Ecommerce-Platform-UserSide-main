import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaFlag, FaLocationArrow, FaMapPin } from 'react-icons/fa';
import { Circles } from 'react-loader-spinner';
import ChangePassword from './ChangePassword'; // Import the ChangePassword component

function Profile() {
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showChangePassword, setShowChangePassword] = useState(false); // State to manage change password form visibility
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/UserData', {
          headers: {
            auth: token 
          }
        });
        setUserData(response.data.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false); 
        }, 1000); 
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="container w-2/4 mx-auto mt-20 px-6 py-10">
      <h2 className="text-3xl font-bold mb-4 text-center">User Profile</h2>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <Circles
            height="80"
            width="80"
            color="#FDE047"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : (
        userData ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col items-center">
              <img
                src={`http://localhost:5000/images/${userData.profileImage}`}
                alt="Profile"
                className="rounded-full h-32 w-32 lg:h-48 lg:w-48 object-cover mb-6"
                style={{ objectPosition: 'center' }}
              />
              <div className="w-full lg:w-3/4">
                <h3 className="text-2xl font-semibold mb-4 text-center">Personal Data</h3>
                <hr />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 pt-4">
                  <div className="flex items-start">
                    <FaUser className="text-gray-600 mt-2 mr-2" />
                    <div>
                      <h4 className="text-lg font-semibold">Name</h4>
                      <p className="text-gray-600">{userData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className="text-gray-600 mt-2 mr-2" />
                    <div>
                      <h4 className="text-lg font-semibold">Email</h4>
                      <p className="text-gray-600">{userData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className="text-gray-600 mt-2 mr-2" />
                    <div>
                      <h4 className="text-lg font-semibold">Mobile Number</h4>
                      <p className="text-gray-600">{userData.mobileNumber}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center"> Address</h3>
                <hr />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gray-600 mr-2 mt-2" />
                    <div>
                      <h4 className="text-lg font-semibold">Street</h4>
                      <p className="text-gray-600">{userData.addresses[0].street}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCity className="text-gray-600 mr-2 mt-2" />
                    <div>
                      <h4 className="text-lg font-semibold">City</h4>
                      <p className="text-gray-600">{userData.addresses[0].city}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaLocationArrow className="text-gray-600 mr-2 mt-2" />
                    <div>
                      <h4 className="text-lg font-semibold">State</h4>
                      <p className="text-gray-600">{userData.addresses[0].state}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaMapPin className="text-gray-600 mr-2 mt-2" />
                    <div>
                      <h4 className="text-lg font-semibold">Pin Code</h4>
                      <p className="text-gray-600">{userData.addresses[0].pinCode}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaFlag className="text-gray-600 mr-2 mt-2" />
                    <div>
                      <h4 className="text-lg font-semibold">Country</h4>
                      <p className="text-gray-600">{userData.addresses[0].country}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                  >
                    Change Password
                  </button>
                </div>
                {showChangePassword && <ChangePassword />} 
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No user data available</p>
        )
      )}
    </div>
  );
}

export default Profile;
