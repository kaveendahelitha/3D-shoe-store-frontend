import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import { FaSearch } from 'react-icons/fa';

const ProductSearch = ({ handleSearchResult }) => {
  const [category, setProductCategory] = useState('');
  const [categories, setProductCategories] = useState([]);
  const [productColor, setProductColor] = useState('');
  const [productColors, setProductColors] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [priceRanges, setPriceRanges] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const categories = await ApiService.getAllProductsCategories();
        setProductCategories(categories);
      } catch (error) {
        console.error('Error fetching product categories:', error.message);
      }
    };
    fetchProductCategories();

    const fetchProductColors = async () => {
      try {
        const productColors = await ApiService.getAllProductColors();
        setProductColors(productColors);
      } catch (error) {
        console.error('Error fetching product colors:', error.message);
      }
    };
    fetchProductColors();

    const fetchProductPrices = async () => {
      try {
        const priceRanges = await ApiService.getAllProductsPriceLevels();
        setPriceRanges(priceRanges);
      } catch (error) {
        console.error('Error fetching product prices:', error.message);
      }
    };
    fetchProductPrices();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  const handleInternalSearch = async () => {
    if (!category || !productColor || !priceRange) {
      showError('Please select all fields');
      return;
    }
    try {
      const response = await ApiService.getProductsByColorPriceAndCategory(category, productColor, priceRange);

      if (response.productList.length === 0) {
        showError('No products found for the selected criteria.');
        handleSearchResult([]); // Reset search results if no products found
      } else {
        handleSearchResult(response.productList);
        setError('');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unknown error occurred';
      showError(errorMessage);
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center bg-blue-50 p-4 rounded-lg">
       
        <div className="flex flex-grow flex-col md:flex-row md:space-x-4">
          <div className="flex-1 bg-blue-100 p-4 rounded-md shadow-md mb-4 md:mb-0">
            <label className="block mb-2 text-blue-700 font-semibold">Category</label>
            <select
              className="border border-blue-300 rounded px-3 py-2 w-full"
              value={category}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option disabled value="">
                Select Product Category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 bg-blue-100 p-4 rounded-md shadow-md mb-4 md:mb-0">
            <label className="block mb-2 text-blue-700 font-semibold">Color</label>
            <select
              className="border border-blue-300 rounded px-3 py-2 w-full"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
            >
              <option disabled value="">
                Select Product Color
              </option>
              {productColors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 bg-blue-100 p-4 rounded-md shadow-md">
            <label className="block mb-2 text-blue-700 font-semibold">Price Range</label>
            <select
              className="border border-blue-300 rounded px-3 py-2 w-full"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled value="">
                Select Price Range
              </option>
              {priceRanges.map(({ priceRange }, index) => (
                <option key={index} value={priceRange}>
                  {priceRange}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex items-center"
          onClick={handleInternalSearch}
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </section>
  );
};

export default ProductSearch;
