import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    productPrice: '',
    productPhotoFile: null,
    productColor: '',
    productDescription: '',
  });
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
      setFormData({
        productName: product.productName,
        category: product.category,
        productPrice: product.productPrice,
        productPhotoFile: null,
        productColor: product.productColor,
        productDescription: product.productDescription,
      });
      setCurrentProductId(product.id);
      setImagePreview(product.productPhotoUrl);
    } else {
      setFormData({
        productName: '',
        category: '',
        productPrice: '',
        productPhotoFile: null,
        productColor: '',
        productDescription: '',
      });
      setCurrentProductId(null);
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      productName: '',
      category: '',
      productPrice: '',
      productPhotoFile: null,
      productColor: '',
      productDescription: '',
    });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      setFormData({ ...formData, productPhotoFile: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append('productName', formData.productName);
    productData.append('category', formData.category);
    productData.append('productPrice', formData.productPrice);
    if (formData.productPhotoFile) {
      productData.append('productPhotoFile', formData.productPhotoFile);
    }
    productData.append('productColor', formData.productColor);
    productData.append('productDescription', formData.productDescription);

    try {
      if (currentProductId) {
        await ApiService.updateProduct(currentProductId, productData);
        toast.success('Product updated successfully!');
      } else {
        await ApiService.addProduct(productData);
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
                  <img src={product.productPhotoUrl} alt={product.productName} className="h-16 w-16 object-cover rounded-md mx-auto" />
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-2/3 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{currentProductId ? 'Update Product' : 'Add Product'}</h2>
            <form onSubmit={handleAddOrUpdateProduct} className="w-full mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productName">Name</label>
                <input 
                  type="text" 
                  id="productName" 
                  name="productName" 
                  value={formData.productName} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
                <input 
                  type="text" 
                  id="category" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productPrice">Price</label>
                <input 
                  type="number" 
                  id="productPrice" 
                  name="productPrice" 
                  value={formData.productPrice} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productPhotoFile">Image</label>
                <input 
                  type="file" 
                  id="productPhotoFile" 
                  name="productPhotoFile" 
                  onChange={handleFileChange} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  accept="image/jpeg, image/png"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md mx-auto" />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productColor">Color</label>
                <input 
                  type="text" 
                  id="productColor" 
                  name="productColor" 
                  value={formData.productColor} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productDescription">Description</label>
                <textarea 
                  id="productDescription" 
                  name="productDescription" 
                  value={formData.productDescription} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  rows="4"
                  required 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {currentProductId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add the Delete Modal component here */}
    </div>
  );
};

export default AdminViewProducts;
