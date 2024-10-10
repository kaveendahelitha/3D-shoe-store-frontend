import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import productService from '../service/ProductService'; // Adjust the path accordingly
import ApiService from '../service/ApiService'; 

export default function BuyNow() {
  const { id } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const API_BASE_URL = 'http://localhost:8080';
  const navigate = useNavigate();
  const [isSingleProductCheckout, setIsSingleProductCheckout] = useState(false);

  useEffect(() => {
    // Fetch product details when the component mounts
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id);
        if (response.data.statusCode === 200) {
          setProduct(response.data.product);
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

  const handleBuyNow = () => {
    // Check if the user is authenticated and has the role of "USER"
    if (!ApiService.isAuthenticated()) {
      alert('You need to be logged in to purchase this product!');
      navigate('/login');
    } else if (!ApiService.isUser()) {
      alert('Only customer can purchase products!');
      navigate('/login');
    } else {
      // Proceed to the buy-product page if authenticated
      setIsSingleProductCheckout(false);
      navigate(`/buy-product/${isSingleProductCheckout}/${product.id}`);
    }
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
        {/* Product Image */}
        <div className="space-y-4 text-center lg:sticky top-8">
          <div className="bg-gray-100 p-4 flex items-center sm:h-[380px] rounded-lg">
            <img
             src={`${API_BASE_URL}/products/image/${product.productPhotoUrl}`} // Adjust the image path as needed
              alt={product.productName}
              className="w-full max-h-full object-contain object-top"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-xl">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{product.productName}</h2>
            <p className="text-sm text-gray-600 mt-2">{product.category}</p>
          </div>

          {/* Ratings */}
          <div className="flex space-x-1 mt-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 ${index < 4 ? 'fill-yellow-400' : 'fill-[#CED5D8]'}`}
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                />
              </svg>
            ))}

            <button
              type="button"
              className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-lg flex items-center !ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 mr-1"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path
                  d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z"
                  data-original="#000000"
                />
                <path
                  d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z"
                  data-original="#000000"
                />
                <path
                  d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z"
                  data-original="#000000"
                />
              </svg>
              87 Reviews
            </button>
          </div>

          {/* Product Price */}
          <div className="mt-4">
            <h3 className="text-gray-800 text-4xl font-bold">Rs {product.productPrice.toFixed(2)}</h3>
          </div>

          {/* Choose a Size */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800">Choose a Size</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {/* You can dynamically generate size buttons if sizes are dynamic */}
              <button
                type="button"
                className="w-10 h-10 border hover:border-yellow-400 font-semibold text-sm rounded-lg flex items-center justify-center shrink-0"
              >
                06
              </button>
              <button
                type="button"
                className="w-10 h-10 border hover:border-yellow-400 font-semibold text-sm rounded-lg flex items-center justify-center shrink-0"
              >
                07
              </button>
              <button
                type="button"
                className="w-10 h-10 border hover:border-yellow-400 font-semibold text-sm rounded-lg flex items-center justify-center shrink-0"
              >
                08
              </button>
              <button
                type="button"
                className="w-10 h-10 border hover:border-yellow-400 font-semibold text-sm rounded-lg flex items-center justify-center shrink-0"
              >
                09
              </button>
              <button
                type="button"
                className="w-10 h-10 border hover:border-yellow-400 font-semibold text-sm rounded-lg flex items-center justify-center shrink-0"
              >
                10
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
          <button
              className="min-w-[200px] px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold rounded-lg"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
            
          </div>

          {/* Tabs for Description and Reviews */}
          <div className="mt-8">
            <ul className="flex border-b">
              <li className="text-gray-800 font-bold text-sm bg-gray-100 py-3 px-8 border-b-2 border-yellow-400 cursor-pointer transition-all">
                Description
              </li>
              <li className="text-gray-600 font-bold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">
                Reviews
              </li>
            </ul>

            {/* Product Description */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
              <p className="text-sm text-gray-600 mt-4">{product.productDescription}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
