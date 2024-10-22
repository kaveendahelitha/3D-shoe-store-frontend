import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from '../../services/EmployeeService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/CreateEmployeeComponent.css";
import ApiService from "../service/ApiService";

const CreateEmployeeComponent = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const {
      
      phoneNumber,
      email,
      password,
    } = formData;
    if (
      
      !phoneNumber ||
      !email ||
      !password
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage("Please fill all the fields.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    try {
      // Call the register method from UserService without the token
      const response = await ApiService.registerUser(formData);

      // Clear the form fields after successful registration
      if (response.statusCode === 200) {
        setFormData({
         
          phoneNumber: "",
          email: "",
          password: "",
          role: "EMPLOYEE"
        });

        setSuccessMessage("Employee registered successfully");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/employees");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };
  return (
    <div>
      <ToastContainer />
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
           
            <div className="card-body">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                <div className="text-left my-2">
                  <label
                    htmlFor="phoneNumber"
                    className="text-xs text-[#002D74]"
                  >
                    Contact Number:
                  </label>
                  <input
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    id="phoneNumber"
                    className="block p-2 mt-2 rounded-xl border w-full"
                    type="text"
                    name="phoneNumber"
                  />
                </div>

                

                <div className="text-left my-2">
                  <label htmlFor="email" className="text-xs text-[#002D74]">
                    Enter Your Email Address
                  </label>
                  <input
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control p-2 mt-4 rounded-xl border w-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                  />
                </div>

                <div className="relative text-left my-2">
                  <label htmlFor="password" className="text-xs text-[#002D74]">
                    Enter Your Password
                  </label>

                  <input
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="p-2 mt-4 rounded-xl border w-full"
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    minLength="8"
                  />
                  {/* password icon */}
                </div>

                <button
                  type="submit"
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
