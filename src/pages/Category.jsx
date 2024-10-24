// Category.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../components/service/ApiService';
import Pagination from '../components/common/Pagination';
import ProductResult from '../components/common/ProductResult';
import ProductSearch from '../components/common/ProductSearch';

// Utility function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const Category = () => {
  const { categoryName } = useParams(); // Retrieve category from URL

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryName || '');
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
        console.log('All Products:', allProducts); // Debug: log all products
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await ApiService.getAllProductsCategories();
        // Capitalize the first letter of each category
        const formattedCategories = categories.map(capitalizeFirstLetter);
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching product categories:', error.message);
      }
    };

    const fetchProductColors = async () => {
      try {
        const colors = await ApiService.getAllProductColors();
        // Capitalize the first letter of each color
        const formattedColors = colors.map(capitalizeFirstLetter);
        setProductColors(formattedColors);
      } catch (error) {
        console.error('Error fetching product colors:', error.message);
      }
    };

    const fetchProductPriceRanges = async () => {
      try {
        const priceLevels = await ApiService.getAllProductsPriceLevels();
        console.log('Price Levels:', priceLevels); // Debug: log price levels
        setPriceRanges(priceLevels);
      } catch (error) {
        console.error('Error fetching product price levels:', error.message);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchProductColors();
    fetchProductPriceRanges();
  }, []);

  // Update selectedCategory when categoryName changes
  useEffect(() => {
    setSelectedCategory(categoryName || '');
  }, [categoryName]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedProductColor(e.target.value);
  };

  const handlePriceLevelChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  // Filter products whenever filters change or products are fetched
  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedProductColor, selectedPriceRange, products]);

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
    console.log('Selected Filters:', {
      selectedCategory,
      selectedProductColor,
      selectedPriceRange,
    }); // Debug: log selected filters

    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedProductColor) {
      filtered = filtered.filter(
        (product) => product.productColor.toLowerCase() === selectedProductColor.toLowerCase()
      );
    }

    if (selectedPriceRange) {
      filtered = filtered.filter((product) => {
        const priceRange = computePriceRange(product.productPrice);
        console.log('Product Price Range:', priceRange); // Debug: log each computed price range
        return priceRange === selectedPriceRange;
      });
    }

    console.log('Filtered Products:', filtered); // Debug: log filtered products
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex text-sm min-h-screen mt-16">
      <aside className="w-1/4 bg-blue-800 p-4 text-gray-200">
        <div className="top-0">
          <h2 className="text-lg font-semibold mb-4">Filter by Product Category</h2>
          <div className="mb-4">
            <label htmlFor="categorySelect" className="block mb-2 ">
              Category
            </label>
            <select
              id="categorySelect"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border rounded px-3 py-2 w-full text-black"
            >
              <option value="">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="top-0">
          <h2 className="text-lg font-semibold mb-4">Filter by Product Color</h2>
          <div className="mb-4">
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
              <label htmlFor="color-all">All</label>
            </div>
            {productColors.map((color, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`color-${index}`}
                  name="productColor"
                  value={color.toLowerCase()}
                  checked={selectedProductColor === color.toLowerCase()}
                  onChange={handleColorChange}
                  className="mr-2"
                />
                <label htmlFor={`color-${index}`}>{color}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="top-0">
          <h2 className="text-lg font-semibold mb-4">Filter by Product Price Range (Rs.)</h2>
          <div className="mb-4">
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
              <label htmlFor="price-all">All</label>
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
                <label htmlFor={`price-${index}`}>{priceRange}</label>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 pt-8 px-4 pb-2">
        <h2 className="text-xl font-semibold mb-4">
          Products {selectedCategory ? `in ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : ''}
        </h2>
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
