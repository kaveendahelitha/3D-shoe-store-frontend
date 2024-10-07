import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService';
import ProductService from '../service/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminViewProducts = () => {
  const API_BASE_URL = 'http://localhost:8080';
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPhoto, setProductPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ApiService.getAllProducts();
        setProducts(result.productList);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products.');
      }
    };
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setProductName(product.productName);
      setCategory(product.category);
      setProductPrice(product.productPrice);
      setProductColor(product.productColor);
      setProductDescription(product.productDescription);
      setCurrentProductId(product.id);
      setImagePreview(`${API_BASE_URL}/products/image/${product.productPhotoUrl}`);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const openDeleteModal = (productId) => {
    setCurrentProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentProductId(null);
  };

  const handleDeleteProduct = async () => {
    try {
      await ApiService.deleteProduct(currentProductId);
      toast.success('Product deleted successfully!');
      setProducts(products.filter((product) => product.id !== currentProductId));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
    closeDeleteModal();
  };

  const resetForm = () => {
    setProductName('');
    setCategory('');
    setProductPrice('');
    setProductColor('');
    setProductDescription('');
    setProductPhoto(null);
    setImagePreview(null);
    setCurrentProductId(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        toast.error('Image size should be less than 8 MB.');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Only JPG and PNG files are allowed.');
        return;
      }
      setProductPhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      category,
      productPrice,
      productColor,
      productDescription
    };

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    if (productPhoto) {
      formData.append('productPhoto', productPhoto);
    }

    try {
      if (currentProductId) {
        await ProductService.updateProduct(currentProductId, formData);
        toast.success('Product updated successfully!');
      } else {
        await ProductService.addProduct(formData);
        toast.success('Product added successfully!');
      }
      const result = await ApiService.getAllProducts();
      setProducts(result.productList);
    } catch (error) {
      console.error(`Error ${currentProductId ? 'updating' : 'adding'} product:`, error);
      toast.error(`Failed to ${currentProductId ? 'update' : 'add'} product.`);
    }
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button 
          onClick={() => openModal()} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-center">ID</th>
              <th className="py-3 px-4 border-b text-center">Name</th>
              <th className="py-3 px-4 border-b text-center">Category</th>
              <th className="py-3 px-4 border-b text-center">Price</th>
              <th className="py-3 px-4 border-b text-center">Image</th>
              <th className="py-3 px-4 border-b text-center">Color</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 transition duration-300">
                <td className="py-3 px-4 border-b text-center align-middle">{product.id}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{product.productName}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{product.category}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{product.productPrice}</td>
                <td className="py-3 px-4 border-b text-center align-middle">
                  <img  src={`${API_BASE_URL}/products/image/${product.productPhotoUrl}`} alt={product.productName} className="h-16 w-16 object-cover rounded-md mx-auto" />
                </td>
                <td className="py-3 px-4 border-b text-center align-middle">{product.productColor}</td>
                <td className="py-3 px-4 border-b text-center align-middle">
                  <button 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-yellow-600 transition duration-300"
                    onClick={() => openModal(product)}
                  >
                    Update
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => openDeleteModal(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-2/3 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{currentProductId ? 'Update Product' : 'Add Product'}</h2>
            <form onSubmit={handleAddOrUpdateProduct} className="w-full mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productName">Name</label>
                <input 
                  type="text" 
                  id="productName" 
                  value={productName} 
                  onChange={(e) => setProductName(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
                <input 
                  type="text" 
                  id="category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productPrice">Price</label>
                <input 
                  type="number" 
                  id="productPrice" 
                  value={productPrice} 
                  onChange={(e) => setProductPrice(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productColor">Color</label>
                <input 
                  type="text" 
                  id="productColor" 
                  value={productColor} 
                  onChange={(e) => setProductColor(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productDescription">Description</label>
                <textarea 
                  id="productDescription" 
                  value={productDescription} 
                  onChange={(e) => setProductDescription(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  rows="4"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productPhoto">Photo</label>
                <input 
                  type="file" 
                  id="productPhoto" 
                  onChange={handleFileChange} 
                  accept="image/jpeg, image/png"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mt-2 h-32 w-32 object-cover rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {currentProductId ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end">
              <button 
                onClick={closeDeleteModal} 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteProduct} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewProducts;
