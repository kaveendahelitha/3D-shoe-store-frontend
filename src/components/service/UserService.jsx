import axios from 'axios';

class UserService {
    // static BASE_URL = "http://localhost:8080"


    //login part
    static async login(email, password) {
        try {
            const response = await axios.post(`http://localhost:8080/auth/login`, { email, password });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

     //register part
    static async register(userData) {
        try {
            const response = await axios.post(`http://localhost:8080/auth/register`, userData);
            return response.data;
        } catch (err) {
            throw err;
        }
    }






    
    static async getUserById(userId, token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /** AUTHENTICATION CHECKER */
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
   
    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserService;
