import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

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
        showError('Product not currently available for this price range on the selected product category and color.');
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
    <section>
    <div className="search-container flex flex-col md:flex-row md:items-center px-4 py-2 space-y-4 md:space-y-0 md:space-x-4">
  <div className="search-field flex-grow bg-blue-100 rounded-md">
    <label className="block mb-2">Category</label>
    <select
      className="border rounded px-3 py-2 w-full"
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
  <div className="search-field flex-grow bg-blue-100 rounded-md">
    <label className="block mb-2">Color</label>
    <select
      className="border rounded px-3 py-2 w-full"
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
  <div className="search-field flex-grow bg-blue-100 rounded-md">
    <label className="block mb-2">Price range</label>
    <select
      className="border rounded px-3 py-2 w-full"
      value={priceRange}
      onChange={(e) => setPriceRange(e.target.value)}
    >
      <option disabled value="">
        Select Product price range
      </option>
      {priceRanges.map(({ priceRange }, index) => (
        <option key={index} value={priceRange}>
          {priceRange}
        </option>
      ))}
    </select>
  </div>
  <button
    className="home-search-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    onClick={handleInternalSearch}
  >
    Search Product
  </button>

</div>
{error && <p className="error-message">{error}</p>}

</section>
  );
};

export default ProductSearch;
