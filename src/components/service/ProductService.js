
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/products'; // Adjust as needed

const  productService= {
    addProduct: (formData) => {
        return axios.post(`${API_BASE_URL}/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },


    updateProduct: (id, formData) => {
        return axios.put(`${API_BASE_URL}/product-update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

     // New method to get product by ID
  getProductById: (id) => {
    return axios.get(`${API_BASE_URL}/product/${id}`);
  },

  getProductDetails: (isSingleProductCheckout, productId) => {
    return axios.get(`${API_BASE_URL}/getProductDetails/${isSingleProductCheckout}/${productId}`);
   }



};

export default productService;
