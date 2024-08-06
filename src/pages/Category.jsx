import React, { useState, useEffect } from 'react';
import ApiService from '../components/service/ApiService';
import Pagination from '../components/common/Pagination';
import ProductResult from '../components/common/ProductResult';
import ProductSearch from '../components/common/ProductSearch';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productColors, setProductColors] = useState([]);
  const [selectedProductColor, setSelectedProductColor] = useState('');
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const handleSearchResult = (results) => {
    setProducts(results);
    setFilteredProducts(results);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiService.getAllProducts();
        const allProducts = response.productList;
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await ApiService.getAllProductsCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching products categories:', error.message);
      }
    };

    const fetchProductColors = async () => {
      try {
        const colors = await ApiService.getAllProductColors();
        setProductColors(colors);
      } catch (error) {
        console.error('Error fetching products colors:', error.message);
      }
    };

    const fetchProductPriceRanges = async () => {
      try {
        const priceLevels = await ApiService.getAllProductsPriceLevels();
        setPriceRanges(priceLevels);
      } catch (error) {
        console.error('Error fetching products price levels:', error.message);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchProductColors();
    fetchProductPriceRanges();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedProductColor(e.target.value);
  };

  const handlePriceLevelChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedProductColor, selectedPriceRange]);

  const computePriceRange = (price) => {
    if (price > 10000) return '10000+';
    if (price > 7000) return '7000-10000';
    if (price > 5000) return '5000-7000';
    if (price > 3000) return '3000-5000';
    if (price > 2000) return '2000-3000';
    if (price > 1000) return '1000-2000';
    return '<1000';
  };

  const filterProducts = () => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (selectedProductColor) {
      filtered = filtered.filter(product => product.productColor === selectedProductColor);
    }
    if (selectedPriceRange) {
      filtered = filtered.filter(product => {
        const priceRange = computePriceRange(product.productPrice);
        return priceRange === selectedPriceRange;
      });
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <aside className="w-1/4 bg-gray-800 p-6 text-gray-200 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-white">Filter by Product Category:</h2>
        <div className="mb-6">
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded-lg px-3 py-2 w-full text-gray-800"
          >
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-white">Color:</h2>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="color-all"
              name="productColor"
              value=""
              checked={selectedProductColor === ''}
              onChange={handleColorChange}
              className="mr-2"
            />
            <label htmlFor="color-all" className="text-white">All</label>
          </div>
          {productColors.map((color, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`color-${index}`}
                name="productColor"
                value={color}
                checked={selectedProductColor === color}
                onChange={handleColorChange}
                className="mr-2"
              />
              <label htmlFor={`color-${index}`} className="text-white">{color}</label>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-4 text-white">Filter by Product Price Range (Rs.):</h2>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="price-all"
              name="priceRange"
              value=""
              checked={selectedPriceRange === ''}
              onChange={handlePriceLevelChange}
              className="mr-2"
            />
            <label htmlFor="price-all" className="text-white">All</label>
          </div>
          {priceRanges.map(({ priceRange }, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`price-${index}`}
                name="priceRange"
                value={priceRange}
                checked={selectedPriceRange === priceRange}
                onChange={handlePriceLevelChange}
                className="mr-2"
              />
              <label htmlFor={`price-${index}`} className="text-white">{priceRange}</label>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Products</h2>
        <ProductSearch handleSearchResult={handleSearchResult} />
        <ProductResult productSearchResults={currentProducts} />
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </main>
    </div>
  );
};

export default Category;
