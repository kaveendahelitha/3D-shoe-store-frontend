import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService'; // Adjust the path as necessary

const AdminViewProduts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ApiService.getAllProducts();
        const all = result.productList;
        setProducts(all); // Adjust based on your actual response structure
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const productData = {
      productName: e.target.productName.value,
      category: e.target.category.value,
      productPrice: e.target.productPrice.value,
      productPhotoUrl: e.target.productPhotoUrl.value,
      productColor: e.target.productColor.value,
      productDescription: e.target.productDescription.value
    };

    try {
      await ApiService.addProduct(productData);
      const result = await ApiService.getAllProducts();
      setProducts(result.productList);
    } catch (error) {
      console.error('Error adding product:', error);
    }

    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button 
          onClick={openModal} 
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-2/3 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleAddProduct} className="w-full mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productName">Product Name</label>
                <input 
                  type="text" 
                  id="productName" 
                  name="productName" 
                  className="w-full border border-gray-300 p-2 rounded-md"
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
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="productDescription">Description</label>
                <textarea 
                  id="productDescription" 
                  name="productDescription" 
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewProduts;
