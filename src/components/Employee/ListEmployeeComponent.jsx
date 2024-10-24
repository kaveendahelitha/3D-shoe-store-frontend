import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "../service/ApiService";
import EmployeeService from "../../services/EmployeeService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [modalType, setModalType] = useState(null); // 'add', 'update', 'delete'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    role: "EMPLOYEE", // Default role
  });

  const [isLoading, setIsLoading] = useState(false); // To handle loading states

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await EmployeeService.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching employees!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value })); // Updated to handle formData
  };

  const openModal = (type, employee = null) => {
    setModalType(type);
    setSelectedEmployee(employee);
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailId: employee.emailId,
        phoneNumber: employee.phoneNumber || "", // Assuming employee may have a phone number
        password: "", // Leave password empty for updates
        role: "EMPLOYEE", // Default role
      });
    } else {
      setFormData({
        phoneNumber: "",
        email: "",
        password: "",
        role: "EMPLOYEE", // Default for adding new employees
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedEmployee(null);
  };

  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault(); // Prevent form from submitting
    if (modalType === "add") {
      try {
        const response = await ApiService.registerUser(formData); // Capture the response
        if (response.statusCode === 200) {
          setFormData({
            phoneNumber: "",
            email: "",
            password: "",
            role: "EMPLOYEE", // Reset role to default
          });
          toast.success("Employee added successfully!");
          fetchEmployees();
          closeModal();
        }
      } catch (error) {
        console.error(error);
        toast.error("Error adding employee");
      }
    } else if (modalType === "update") {
      try {
        await EmployeeService.updateEmployee(formData, selectedEmployee.id); // Use ApiService for updating
        toast.success("Employee updated successfully!");
        fetchEmployees();
        closeModal();
      } catch (error) {
        console.error(error);
        toast.error("Error updating employee");
      }
    }
  };

  const deleteEmployee = async () => {
    try {
      await EmployeeService.deleteEmployee(selectedEmployee.id);
      toast.success("Employee deleted successfully!");
      fetchEmployees();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting employee!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-2xl font-bold text-center mb-4">List Employees</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => openModal("add")}
        >
          Add Employee
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">
                    {employee.id}
                  </td>
                  <td className="py-2 px-4 border-b">{employee.firstName}</td>
                  <td className="py-2 px-4 border-b">{employee.lastName}</td>
                  <td className="py-2 px-4 border-b">{employee.emailId}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                      onClick={() => openModal("update", employee)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => openModal("delete", employee)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Update Employee Modal */}
      {(modalType === "add" || modalType === "update") && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4 text-center">
              {modalType === "add" ? "Add Employee" : "Update Employee"}
            </h3>











            
            <form onSubmit={saveOrUpdateEmployee}>


            <div className="text-left my-2">
                <label htmlFor="userFirstname" className="text-xs text-[#002D74]">
                  Enter Your first name
                </label>
                <input
                  required
                  value={formData.userFirstname}
                  onChange={handleInputChange}
                  className="form-control p-2 mt-4 rounded-xl border w-full"
                  type="text"
                  id="userFirstname"
                  placeholder="First name"
                  name="userFirstname"
                />
              </div>



              <div className="text-left my-2">
                <label htmlFor="userLastname" className="text-xs text-[#002D74]">
                  Enter Your Last name
                </label>
                <input
                  required
                  value={formData.userLastname}
                  onChange={handleInputChange}
                  className="form-control p-2 mt-4 rounded-xl border w-full"
                  type="text"
                  id="userLastname"
                  placeholder="First name"
                  name="userLastname"
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
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  {modalType === "add" ? "Add" : "Update"}
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === "delete" && selectedEmployee && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4 text-center">
              Delete Employee
            </h3>
            <p className="text-center">
              Are you sure you want to delete{" "}
              <strong>{selectedEmployee.firstName}</strong>?
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={deleteEmployee}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmployeeComponent;
