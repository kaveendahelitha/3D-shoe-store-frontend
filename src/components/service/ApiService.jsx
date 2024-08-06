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

    static async updateUserProfile(userData) {
        try {
            const response = await axios.put(`${this.BASE_URL}/users/update`, userData, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating user profile:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
 /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }
 /* This is to delete a user */
 static async deleteUser(userId) {
    const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
        headers: this.getHeader()
    })
    return response.data
}

      /* This  gets all products from CPC */
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

     /* This  gets all products from the database */
    static async getAllProducts() {
        const result = await axios.get(`${this.BASE_URL}/products/all`)
        return result.data
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
    /* This  gets all products colors */

    static async getAllProductColors() {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/colors`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product colors:', error.message);
            throw error;
        }
    }
    /* This  gets all products price */
    static async getAllProductsPriceLevels() {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/priceranges`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product prices:', error.message);
            throw error;
        }
    }

    static async addProduct(productData) {
        const response = await axios.post(`${this.BASE_URL}/products/add`, productData, {
            headers: this.getHeader()
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

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

    static userOnly(){
        return this.isAuthenticated() && this.isUser();
    }

    static employeeOnly(){
        return this.isAuthenticated() && this.isEmployee();
    }

    static sitemanager(){
        return this.isAuthenticated() && this.isSitemanager();
    }
}
