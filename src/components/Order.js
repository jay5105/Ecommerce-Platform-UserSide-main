import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'; // Import spinner component

function truncateName(name) {
  return name.length > 50 ? `${name.substring(0, 50)}...` : name;
}

function Order() {
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false); // State to manage fade-in effect
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fetchUserOrders', {
          headers: {
            auth: token,
          },
        });
        setOrderProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setFadeIn(true);
        }, 500); // Show spinner for at least 1 second
      }
    };

    fetchOrderData();
  }, [token, navigate]);

  const calculateTotalPrice = () => {
    return orderProducts
      .filter(product => product.status !== 'Cancelled')
      .reduce((total, product) => total + product.totalAmount, 0)
      .toFixed(2);
  };

  const handleCancelOrder = async (orderId) => {
    setOrderProducts(orderProducts.map(product =>
      product._id === orderId ? { ...product, status: 'Cancelled' } : product
    ));
    try {
      await axios.post(`http://localhost:5000/ChangeOrderStatus/${orderId}`, null, {
        headers: {
          auth: token,
        }
      });
      console.log('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl font-bold text-center mt-20 py-10"
          style={{ fontFamily: "Poppins" }}
        >
          Order Details
        </h2>
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
          <div className={`overflow-x-auto transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-4 px-4 border-b-2 border-gray-300">Product</th>
                  <th className="py-4 px-4 border-b-2 border-gray-300">Name</th>
                  <th className="py-4 px-4 border-b-2 border-gray-300">Price</th>
                  <th className="py-4 px-4 border-b-2 border-gray-300">Quantity</th>
                  <th className="py-4 px-4 border-b-2 border-gray-300">Total</th>
                  <th className="py-4 px-4 border-b-2 border-gray-300">Status</th>
                  <th className="py-4 px-4 border-b-2 border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-4 px-6 border-b border-gray-200">
                      <img
                        src={`http://localhost:5000/images/${product.image}`}
                        alt={product.name}
                        className="w-20 h-20 object-contain"
                      />
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">{truncateName(product.name)}</td>
                    <td className="py-4 px-6 border-b border-gray-200">₹{product.price.toFixed(2)}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{product.quantity}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                    ₹{product.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">{product.status}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {product.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancelOrder(product._id)}
                          className="bg-red-500 mx-auto flex items-center text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                          <RiCloseLine /> &nbsp; Cancel Order
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-6 border-t border-gray-300 text-right font-bold"
                  >
                    Total:
                  </td>
                  <td className="py-4 px-6 border-t border-gray-300 text-center">
                  ₹{calculateTotalPrice()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
