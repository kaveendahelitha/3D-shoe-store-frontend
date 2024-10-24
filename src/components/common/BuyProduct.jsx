import React, { useState, useEffect } from 'react';
import productService from '../service/ProductService';
import ApiService from '../service/ApiService'; // Import ApiService
import { useParams, useNavigate } from 'react-router-dom';

export default function BuyProduct() {
  const API_BASE_URL = 'http://localhost:8080';
  const { isSingleProductCheckout, id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    alternateContactNumber: '',
    fullAddress: '',
    orderProductQuantityList: [] // Will be initialized after fetching products
  });

  const [productDetails, setProductDetails] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentTitle, setPaymentTitle] = useState(''); // Add for payment title

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductDetails(isSingleProductCheckout, id);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProductDetails(response.data);

          // Initialize orderProductQuantityList based on fetched products
          setFormData((prevFormData) => ({
            ...prevFormData,
            orderProductQuantityList: response.data.map(product => ({
              productId: product.productId,
              quantity: 1 // Default quantity
            }))
          }));

          // Set payment title for the products
          setPaymentTitle(response.data.map(product => product.productName).join(', '));
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [isSingleProductCheckout, id]);

  // Use the ApiService to fetch transaction details
  const pay = async () => {
    try {
      // Calculate total amount
      const totalAmount = productDetails.reduce((total, product) => {
        const quantity = formData.orderProductQuantityList.find(item => item.productId === product.productId)?.quantity || 1;
        return total + (product.productPrice * quantity);
      }, 0);

      // Fetch transaction details from ApiService
      const transactionData = await ApiService.createTransaction(totalAmount);

      // Construct the payment object using fetched transaction details
      const payment = {
        sandbox: true,
        merchant_id: "1228411",   // Change your merchant_id
        return_url: "http://localhost:5173/customer-orders",
        cancel_url: `http://localhost:5173/buy-product/${isSingleProductCheckout}/${id}`,
        notify_url: "http://sample.com/notify", // Important: Needs a public URL, not localhost, to receive data
        order_id: transactionData.orderId,
        items: paymentTitle,
        amount: transactionData.amount,
        currency: transactionData.currency,
        hash: transactionData.key,
        first_name: formData.fullName,
        last_name: "nimal",  // Add additional info if needed
        email: "helitha@gmail.com",  // Add email if needed
        phone: formData.contactNumber,
        address: formData.fullAddress,
        city: "horana",
        country: "srilanka",
      };

      // Start the payment process
      window.payhere.startPayment(payment);

      // Listen for payment completion and place the order
      window.payhere.onCompleted = async function onCompleted(orderId) {
        try {
          // Handle the order placement on successful payment
          await ApiService.placeOrder(formData, isSingleProductCheckout);
          alert('Order placed successfully!');
          alert('Order will delivery within 4-5 days !');

          // Redirect or navigate to the order summary page
          navigate('/customer-orders');
        } catch (error) {
          console.error('Order placement failed:', error);
          alert('Failed to place order after payment completion.');
        }
      };

      // Handle payment failure
      window.payhere.onError = function onError(error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      };

      // Handle payment cancellation
      window.payhere.onDismissed = function onDismissed() {
        alert('Payment was dismissed by the user.');
        navigate(`/buy-product/${isSingleProductCheckout}/${id}`);
      };

    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the payment process when form is submitted
    pay();
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      orderProductQuantityList: prevFormData.orderProductQuantityList.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
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
                {productDetails.map((product) => (
                  <div key={product.productId} className="flex items-start gap-4">
                    <div className="w-32 h-28 lg:w-24 lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img
                        src={`${API_BASE_URL}/products/image/${product.productPhotoUrl}`}
                        alt={product.productName}
                        className="w-full object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white">{product.productName}</h3>
                      <ul className="text-xs text-gray-300 space-y-2 mt-2">
                        <li className="flex justify-between">
                          <span>Price</span>
                          <span>LKR.{product.productPrice.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Quantity</span>
                          <select
                            className="ml-auto px-2 py-1 rounded-md bg-gray-700 text-white"
                            value={
                              formData.orderProductQuantityList.find(item => item.productId === product.productId)?.quantity || 1
                            }
                            onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value, 10))}
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
                ))}
              </div>
            </div>
            {/* Total Price Section */}
            <div className="absolute bottom-0 left-0 bg-gray-800 w-full p-4">
              <h4 className="flex justify-between text-base text-white">
                Total
                <span>
                  LKR.
                  {productDetails.reduce((total, product) => {
                    const quantity = formData.orderProductQuantityList.find(item => item.productId === product.productId)?.quantity || 1;
                    return total + (product.productPrice * quantity);
                  }, 0).toFixed(2)}
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
                Pay with Payhere
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
