import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductResult = ({ productSearchResults }) => {
  const navigate = useNavigate();

  return (
    <section className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6 text-sm">
      {productSearchResults && productSearchResults.length > 0 && (
        productSearchResults.map((product) => (
          <div key={product.id} className="group relative shadow-md rounded-lg overflow-hidden bg-white">
            <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 lg:aspect-none group-hover:opacity-75 transition-opacity duration-300">
              <img
                src={product.productPhotoUrl}
                alt={product.productName}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
              <p className="mt-1 text-sm text-gray-600">{product.productDescription}</p>
              <p className="mt-2 text-lg font-bold text-gray-900">Rs.{product.productPrice}/=</p>
              <div className="mt-3 flex justify-center gap-2">
                <button
                  className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => navigate(`/order/${product.id}`)}
                >
                  Add to Cart
                </button>
                <button
                  className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={() => navigate(`/buy-now/${product.id}`)}
                >
                  Buy Now
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
