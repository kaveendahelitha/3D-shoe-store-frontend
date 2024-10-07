import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductResult = ({ productSearchResults }) => {
  const API_BASE_URL = 'http://localhost:8080';
  const navigate = useNavigate();

  return (
    <section className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 text-sm">
      {productSearchResults && productSearchResults.length > 0 && (
        productSearchResults.map((product) => (
          <div key={product.id} className="group relative shadow-md rounded-md overflow-hidden bg-blue-200">
            <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 lg:aspect-none group-hover:opacity-75">
              <img
                src={`${API_BASE_URL}/products/image/${product.productPhotoUrl}`}
                alt={product.productName}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="p-4 justify-between text-center">
              <div>
                <h3 className="text-sm text-gray-700">
                  {product.productName}
                </h3>                        
              
                <p className="text-sm font-medium text-gray-900">Rs.{product.productPrice}</p>
                <button
                  className="ml-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  onClick={() => navigate(`/order/${product.id}`)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ProductResult;
