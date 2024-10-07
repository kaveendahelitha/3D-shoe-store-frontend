import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /** AUTH */

    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    /** PRODUCTS */
    

    static async getProductsByColorPriceAndCategory(category, productColor, priceRange) {
        const url = `${this.BASE_URL}/products/available-products-by-color-category-and-pricerange?category=${category}&productColor=${productColor}&priceRange=${priceRange}`;
        try {
            const result = await axios.get(url);
            return result.data;
        } catch (error) {
            console.error('Error fetching products:', error.message);
            throw error;
        }
    }

    static async getAllProducts() {
        const result = await axios.get(`${this.BASE_URL}/products/all`);
        return result.data;
    }

    static async getAllProductsCategories() {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/categories`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product categories:', error.message);
            throw error;
        }
    }

    static async getAllProductColors() {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/colors`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product colors:', error.message);
            throw error;
        }
    }

    static async getAllProductsPriceLevels() {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/priceranges`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product prices:', error.message);
            throw error;
        }
    }

   // static async addProduct(productData) {
     //  const response = await axios.post(`${this.BASE_URL}/products/add`, productData, {
     //   headers: {
      //          ...this.getHeader(),
      //          'Content-Type': 'multipart/form-data', // Set for form-data requests
       //     },
      //  });
    // return response.data;
   // }

   

   

    static async deleteProduct(id) {
        const response = await axios.delete(`${this.BASE_URL}/products/product-delete/${id}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static isEmployee() {
        const role = localStorage.getItem('role');
        return role === 'EMPLOYEE';
    }

    static isSitemanager() {
        const role = localStorage.getItem('role');
        return role === 'SITE_MANAGER';
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }

    static userOnly() {
        return this.isAuthenticated() && this.isUser();
    }

    static employeeOnly() {
        return this.isAuthenticated() && this.isEmployee();
    }

    static sitemanager() {
        return this.isAuthenticated() && this.isSitemanager();
    }
}
