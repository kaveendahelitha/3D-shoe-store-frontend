import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8080";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  

 
  static async createTransaction(amount) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/createTransaction/${amount}`,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in Transaction:", error.message);
      throw error;
    }
  }

  



  /** AUTH */

  static async updateUserProfile(userData) {
    try {
      const response = await axios.put(
        `${this.BASE_URL}/users/update`,
        userData,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating user profile:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
  /**Sends a request to add a product to the cart based on the product ID. */
  static async addToCart(productId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/addToCart/${productId}`,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
  /**Get cart details */
  static async getCartDetails() {
    const response = await axios.get(`${this.BASE_URL}/getCartDetails`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /**Delete cart items */
  static async deleteCartItem(cartId) {
    const response = await axios.delete(
      `${this.BASE_URL}/deleteCartItem/${cartId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }
  /** AUTH */

  static async registerUser(registration) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/auth/register`,
        registration
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  static async loginUser(loginDetails) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/auth/login`,
        loginDetails
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error logging in user:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
  ///test
  static async forgotpass(email) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/forgotPassword/verifyMail/${email}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  static async forgotPassword(email) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/forgotPassword/verifyMail/${email}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  static async verifyOtp(otp, email) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/forgotPassword/verifyOtp/${otp}/${email}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  // Update resetPassword to accept password and repeatPassword
  static async resetPassword(email, password, repeatPassword) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/forgotPassword/changePassword/${email}`,
        { password, repeatPassword },
        { headers: this.getHeader() } // Include authorization header
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  /**
     static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }
     */

  /** PRODUCTS */

  /*  This is  to get the user profile */

  static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getUserProfile() {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteUser(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getProductsByColorPriceAndCategory(
    category,
    productColor,
    priceRange
  ) {
    const url = `${this.BASE_URL}/products/available-products-by-color-category-and-pricerange?category=${category}&productColor=${productColor}&priceRange=${priceRange}`;
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
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
      console.error("Error fetching product categories:", error.message);
      throw error;
    }
  }

  static async getAllProductColors() {
    try {
      const response = await axios.get(`${this.BASE_URL}/products/colors`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product colors:", error.message);
      throw error;
    }
  }

  static async getAllProductsPriceLevels() {
    try {
      const response = await axios.get(`${this.BASE_URL}/products/priceranges`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product prices:", error.message);
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

  static async placeOrder(orderData, isSingleProductCheckout) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/place-order/${isSingleProductCheckout}`,
        orderData,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  static async getOrderDetails() {
    try {
      const response = await axios.get(`${this.BASE_URL}/getOrderDetails`, {
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Error geting orders:", error.message);
      throw error;
    }
  }

  static async getAllOrderDetails(status) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/getAllOrderDetails/${status}`,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting orders:", error.message);
      throw error;
    }
  }

  // Function to mark an order as delivered
  static async markOrderAsDelivered(orderId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/markOrderAsDelivered/${orderId}`,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking order as delivered:", error.message);
      throw error;
    }
  }

  static async deleteProduct(id) {
    const response = await axios.delete(
      `${this.BASE_URL}/products/product-delete/${id}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteOrderItem(orderId) {
    const response = await axios.delete(
      `${this.BASE_URL}/deleteOrder/${orderId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static isEmployee() {
    const role = localStorage.getItem("role");
    return role === "EMPLOYEE";
  }

  static isSitemanager() {
    const role = localStorage.getItem("role");
    return role === "SITE_MANAGER";
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
