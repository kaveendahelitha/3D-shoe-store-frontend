import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../service/ProductService'; 
import ApiService from '../service/ApiService'; 
import StarRating from './StarRating';

export default function BuyNow() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [feedbacks, setFeedbacks] = useState([]); 
  const [newFeedback, setNewFeedback] = useState(''); 
  const [rating, setRating] = useState(0); 
  const API_BASE_URL = 'http://localhost:8080';
  const navigate = useNavigate();
  const [isSingleProductCheckout, setIsSingleProductCheckout] = useState(true);

  useEffect(() => {
    const fetchProductAndFeedback = async () => {
      try {
        const response = await productService.getProductById(id);
        const feedbackResponse = await ApiService.getFeedbackForProduct(id);
        if (response.data.statusCode === 200) {
          setProduct(response.data.product);
          setFeedbacks(feedbackResponse);
        } else {
          setError(response.data.message || 'Product not found.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndFeedback();
  }, [id]);

  const handleBuyNow = () => {
    if (!ApiService.isAuthenticated()) {
      alert('You need to be logged in to purchase this product!');
      navigate('/login');
    } else if (!ApiService.isUser()) {
      alert('Only customers can purchase products!');
      navigate('/login');
    } else {
      setIsSingleProductCheckout(false);
      navigate(`/buy-product/${isSingleProductCheckout}/${product.id}`);
    }
  };

  const handleSubmitFeedback = async () => {
    const newFeedbackEntry = {
      rating,
      text: newFeedback,
      date: new Date().toISOString(),
    };
    
    try {
      await ApiService.submitFeedback(product.id, newFeedback, rating);
      setNewFeedback(''); 
      setRating(0);
      alert('Do you want to add your feedback?');
      window.location.reload(); // Refresh the webpage
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting feedback.');
    }
    console.log(newFeedbackEntry);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mt-12">
      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4 text-center lg:sticky top-8">
          <div className="bg-gray-100 p-4 flex items-center sm:h-[380px] rounded-lg">
            <img
              src={`${API_BASE_URL}/products/image/${product.productPhotoUrl}`}
              alt={product.productName}
              className="w-full max-h-full object-contain object-top"
            />
          </div>
        </div>

        <div className="max-w-xl">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{product.productName}</h2>
            <p className="text-sm text-gray-600 mt-2">{product.category}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-gray-800 text-4xl font-bold">Rs {product.productPrice.toFixed(2)}</h3>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800">Choose a Size</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {['06', '07', '08'].map(size => (
                <button key={size} type="button" className="w-10 h-10 border hover:border-yellow-400 font-semibold text-sm rounded-lg flex items-center justify-center">{size}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              className="min-w-[200px] px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold rounded-lg"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
            <p className="text-sm text-gray-600 mt-4">{product.productDescription}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Add Your Feedback</h3>
            <StarRating rating={rating} setRating={setRating} />
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Share your experience..."
              className="border border-gray-300 p-2 w-full rounded mt-2"
              rows="4"
            ></textarea>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={handleSubmitFeedback}
            >
              Submit Feedback
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Customer Feedback</h3>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <div key={index} className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <StarRating rating={feedback.rating} readOnly={true} />
                  <p className="text-sm text-gray-600 mt-2">{feedback.feedbackText}</p>
                  <p className="text-xs text-gray-400 mt-1">Name: {feedback.userFirstName}</p>
                  <p className="text-xs text-gray-400 mt-1">Posted on: {new Date(feedback.createdDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No feedback yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
