import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductResult = ({ productSearchResults }) => {
  const navigate = useNavigate();

  return (
    <section className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {productSearchResults && productSearchResults.length > 0 && (
        productSearchResults.map((product) => (
          <div key={product.id} className="group relative shadow-md rounded-md overflow-hidden">
            <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 lg:aspect-none group-hover:opacity-75">
              <img
                src={product.productPhotoUrl}
                alt={product.productName}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  {product.productName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.productColor}</p>
                <p className="mt-1 text-sm text-gray-500">{product.productDescription}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-900">{product.productPrice}</p>
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
