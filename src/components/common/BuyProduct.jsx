import React, { useState, useEffect } from 'react';
import productService from '../service/ProductService';
import ApiService from '../service/ApiService';
import { useParams, useNavigate } from 'react-router-dom';

export default function BuyProduct() {
  const API_BASE_URL = 'http://localhost:8080';
  const { id } = useParams(); // Get productId from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    alternateContactNumber: '',
    fullAddress: '',
    orderProductQuantityList: [{
      productId: id,
      quantity: 2 // Default quantity
    }]
  });

  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch product details when the component loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id);
        if (response.data.statusCode === 200) {
          setProductDetails(response.data.product); // Assuming response contains the product details in 'product'
        } else {
          setError(response.data.message || 'Product not found.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.placeOrder(formData);
      alert('Order placed successfully!');
      navigate('/'); // Redirect to another page or show success message
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const updatedQuantity = parseInt(e.target.value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      orderProductQuantityList: [
        { productId: id, quantity: updatedQuantity }
      ]
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  if (loading) return <p className="text-center mt-12">Loading...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <div className="font-sans bg-white mt-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-4 h-full mt-12">
        {/* Product Details Section */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 lg:min-w-[370px] sm:min-w-[300px] h-auto lg:sticky lg:top-0">
          <div className="relative h-full">
            <div className="px-4 py-8 overflow-auto h-auto">
              <div className="space-y-4">
                {productDetails && (
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-28 lg:w-24 lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img
                        src={
                          `${API_BASE_URL}/products/image/${productDetails.productPhotoUrl}` ||
                          'https://via.placeholder.com/150'
                        }
                        alt="Product"
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white">{productDetails.productName}</h3>
                      <ul className="text-xs text-gray-300 space-y-2 mt-2">
                        <li className="flex justify-between">
                          <span>Price</span>
                          <span>${productDetails.productPrice}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Quantity</span>
                          <select
                            className="ml-auto px-2 py-1 rounded-md bg-gray-700 text-white"
                            value={formData.orderProductQuantityList[0].quantity}
                            onChange={handleQuantityChange}
                          >
                            {[...Array(10).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Total Price Section */}
            <div className="absolute bottom-0 left-0 bg-gray-800 w-full p-4">
              <h4 className="flex justify-between text-base text-white">
                Total
                <span>
                  $
                  {productDetails
                    ? (productDetails.productPrice * formData.orderProductQuantityList[0].quantity).toFixed(2)
                    : '0.00'}
                </span>
              </h4>
            </div>
          </div>
        </div>

        {/* Order Form Section */}
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form className="mt-8" onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div>
              <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  required
                />
                <input
                  type="number"
                  name="contactNumber"
                  placeholder="Phone No."
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  required
                />
                <input
                  type="number"
                  name="alternateContactNumber"
                  placeholder="Alternate Contact Number"
                  value={formData.alternateContactNumber}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-8">
              <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
              <input
                type="text"
                name="fullAddress"
                placeholder="Full Address"
                value={formData.fullAddress}
                onChange={handleInputChange}
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 max-md:flex-col mt-8">
              <button
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800"
                onClick={() => navigate(-1)} // Navigate back or handle cancel as needed
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
