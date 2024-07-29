import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin6Line, RiArrowRightLine, RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'; // Import spinner component

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false); // State to manage fade-in effect
  var token = localStorage.getItem('token'); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getCartData', {
          headers: {
            auth: token,
          },
        });
        console.log(response.data.data.products);
        setCartProducts(response.data.data.products);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setFadeIn(true);
        }, 500); // Show spinner for at least 1 second
      }
    };

    fetchCartData();
  }, [token]);

  const handleQuantityChange = async (index, change) => {
    const updatedProducts = [...cartProducts];
    const newQuantity = updatedProducts[index].quantity + change;
    if (newQuantity > 0) {
      updatedProducts[index].quantity = newQuantity;
      setCartProducts(updatedProducts);

      try {
        await axios.patch(`http://localhost:5000/UpdateCart/${updatedProducts[index].productId}`, {
          quantity: newQuantity
        }, {
          headers: {
            auth: token,
          },
        });
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };

  const handleRemoveProduct = async (index) => {
    const productId = cartProducts[index].productId;
    const updatedProducts = cartProducts.filter((_, i) => i !== index);
    setCartProducts(updatedProducts);

    try {
      await axios.delete(`http://localhost:5000/DeleteProduct/${productId}`, {
        headers: {
          auth: token,
        },
      });
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/placeOrder', {}, {
        headers: {
          auth: token,
        },
      });
  
      // Check if the response indicates success
      if (response.data.status === "Success") {
        navigate('/order');
      } else {
        console.error('Error placing order:', response.data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const truncateName = (name) => {
    return name.length > 10 ? `${name.substring(0, 50)}...` : name;
  };

  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  const totalAmount = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl font-bold text-center mb-8 mt-20 py-10"
          style={{ fontFamily: "Poppins" }}
        >
          Shopping Cart
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
                  <th className="py-4 px-4 border-b-2 border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-4 px-6 border-b border-gray-200">
                      <img
                        src={`http://localhost:5000/images/${product.image}`}
                        alt={product.name}
                        className="w-20 h-20 object-contain"
                      />
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">{truncateName(product.name)}</td>
                    <td className="py-4 px-6 border-b border-gray-200">₹{product.price}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      <button
                        className="bg-gray-800 text-white py-2 px-2 rounded"
                        onClick={() => handleQuantityChange(index, -1)}
                      >
                        <RiSubtractLine />
                      </button>
                      <span className="mx-2">{product.quantity}</span>
                      <button
                        className="bg-gray-800 text-white py-2 px-2 rounded"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        <RiAddLine />
                      </button>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                    ₹{calculateTotal(product.price, product.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200" style={{textAlign:'center'}}>
                      <button
                        className="bg-red-500 flex items-center text-white mx-auto py-2 px-4 rounded transition duration-300 ease-in-out"
                        onClick={() => handleRemoveProduct(index)}
                      >
                        <RiDeleteBin6Line /> &nbsp;Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className="text-right py-4 px-4 border-t-2 border-gray-300">
                    <span className="text-xl font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6">
                    <button
                      className="bg-gray-900 my-10 flex items-center mx-10 text-white py-2 px-4 transition duration-300 ease-in-out"
                      style={{ fontFamily: "Poppins" }}
                      onClick={handlePlaceOrder}
                    >
                      Place Order  &nbsp;
                      <RiArrowRightLine />
                    </button>
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

export default Cart;
