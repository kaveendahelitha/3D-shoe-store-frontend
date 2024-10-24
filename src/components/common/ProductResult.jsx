import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService"; // Import the service

const ProductResult = ({ productSearchResults }) => {
  const API_BASE_URL = "http://localhost:8080";
  const navigate = useNavigate();

  const imageStyles = {
    width: "280px",
    height: "280px", // Set a fixed size for the product image
  };
  const handleAddToCart = async (productId) => {
    try {
      // Check if the user is authenticated
      if (!ApiService.isAuthenticated()) {
        // If not authenticated, redirect to the sign-up page
        navigate("/login"); // Redirect to the log in page (adjust the route as needed)
        return;
      }

      // Confirmation alert before adding to cart
      const confirmAdd = window.confirm("Are you sure you want to add this item to your cart?");
      if (!confirmAdd) {
        return; // If the user cancels, exit the function
      }
      
      
      // If authenticated, proceed to add the product to the cart
      const response = await ApiService.addToCart(productId);
      alert("Product added to cart:", response);
    } catch (error) {
      alert("Failed to add product to cart:", error);
    }
  };
  return (
    <section className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6 text-sm">
      {productSearchResults &&
        productSearchResults.length > 0 &&
        productSearchResults.map((product) => (
          <div
            key={product.id}
            className="group relative shadow-md rounded-lg overflow-hidden bg-white"
          >
            <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 lg:aspect-none group-hover:opacity-75 transition-opacity duration-300">
              <img
                src={`${API_BASE_URL}/products/image/${product.productPhotoUrl}`}
                alt={product.productName}
                style={imageStyles}
              />
            </div>

            <div className="p-4 justify-between text-center">
              <div>
                <h3 className="text-sm text-gray-700">{product.productName}</h3>

                <p className="text-sm font-medium text-gray-900">
                  Rs.{product.productPrice}
                </p>

                <button
                  className="px-3 mx-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => handleAddToCart(product.id)} // Handle "Add to Cart"
                >
                  Add to Cart
                </button>
                <button
                  className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={() => navigate(`/buy-now/${product.id}`)}
                >
                  view
                </button>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ProductResult;
