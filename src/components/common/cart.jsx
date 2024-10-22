import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService"; // Import API service for making requests

// Inline CSS equivalent for cart table styling
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse", // Ensures borders don't overlap
};

const tdStyles = {
  padding: "10px",
  border: "1px solid #dee2e6", // Add border to each cell
  textAlign: "center", // Center text in each cell
};

const imageStyles = {
  width: "100px",
  height: "100px", // Set a fixed size for the product image
};

const descriptionColumnStyles = {
  width: "35%",
};

const Cart = () => {
  const API_BASE_URL = "http://localhost:8080";
  const [cartDetails, setCartDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartDetails();
  }, []);

  const getCartDetails = async () => {
    try {
      const response = await ApiService.getCartDetails();
      setCartDetails(response);
    } catch (error) {
      alert("Error fetching cart details:", error);
    }
  };

  const deleteItem = async (cartId) => {

    try {
      await ApiService.deleteCartItem(cartId);
     
      getCartDetails();
      alert(" are you want to delete item:", deleteItem);
      alert("item delete")
       // Refresh cart details after deletion
    } catch (error) {
      alert("Error deleting item:", error);

    }
  };

  const checkout = () => {
    navigate("/buy-product/false/0", {
      
    });
  };

  return (
    <div className="container mt-5">
      <div align="right" className="mb-3" style={{ marginTop: "60px" }}>
        <button onClick={checkout} className="btn btn-primary">
          Checkout
        </button>
      </div>

      <table className="table" style={tableStyles}>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails.map((element) => (
            <tr key={element.cartId}>
              <td style={tdStyles}>
                <img
                  src={`${API_BASE_URL}/products/image/${element.product.productPhotoUrl}`} // product image URL
                  alt={element.product.productName}
                  style={imageStyles}
                />
              </td>
              <td style={tdStyles}>{element.product.productName}</td>
              <td style={{ ...tdStyles, ...descriptionColumnStyles }}>
                {element.product.productDescription}
              </td>
              <td style={tdStyles}>Rs.{element.product.productPrice}</td>
              <td style={tdStyles}>
                <button
                  onClick={() => deleteItem(element.cartId)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
