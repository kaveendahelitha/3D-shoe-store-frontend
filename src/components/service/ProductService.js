
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
};

export default productService;