import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService'; // Adjust the path as necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    productPrice: '',
    productPhotoUrl: '',
    productColor: '',
    productDescription: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ApiService.getAllProducts();
        const all = result.productList;
        setProducts(all); // Adjust based on your actual response structure
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
        productPhotoUrl: product.productPhotoUrl,
        productColor: product.productColor,
        productDescription: product.productDescription,
      });
      setCurrentProductId(product.id);
    } else {
      setFormData({
        productName: '',
        category: '',
        productPrice: '',
        productPhotoUrl: '',
        productColor: '',
        productDescription: '',
      });
      setCurrentProductId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (productId) => {
    setCurrentProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      if (currentProductId) {
        await ApiService.updateProduct(currentProductId, formData);
        toast.success('Product updated successfully!');
      } else {
        await ApiService.addProduct(formData);
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

  const handleDeleteProduct = async () => {
    try {
      await ApiService.deleteProduct(currentProductId);
      const result = await ApiService.getAllProducts();
      setProducts(result.productList);
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }

    closeDeleteModal();
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
                <label className="block text-sm font-medium mb-1" htmlFor="productName">Product Name</label>
                <input 
                  type="text" 
                  id="productName" 
                  name="productName" 
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.productName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
                <input 
                  type="text" 
                  id="category" 
                  name="category" 
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.category}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productPrice">Price</label>
                <input 
                  type="number" 
                  id="productPrice" 
                  name="productPrice" 
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.productPrice}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productPhotoUrl">Image URL</label>
                <input 
                  type="text" 
                  id="productPhotoUrl" 
                  name="productPhotoUrl" 
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.productPhotoUrl}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productColor">Color</label>
                <input 
                  type="text" 
                  id="productColor" 
                  name="productColor" 
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.productColor}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productDescription">Description</label>
                <textarea 
                  id="productDescription" 
                  name="productDescription" 
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.productDescription}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-300"
                  onClick={closeModal}
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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end">
              <button 
                type="button" 
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-300"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={handleDeleteProduct}
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
