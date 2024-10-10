import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Removed custom CSS imports as Tailwind CSS will handle styling

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [modalType, setModalType] = useState(null); // 'add', 'update', 'delete'
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employeeDetails, setEmployeeDetails] = useState({ firstName: '', lastName: '', emailId: '' });
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
            toast.error('Error fetching employees!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeDetails(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, employee = null) => {
        setModalType(type);
        setSelectedEmployee(employee);
        if (employee) {
            setEmployeeDetails({ firstName: employee.firstName, lastName: employee.lastName, emailId: employee.emailId });
        } else {
            setEmployeeDetails({ firstName: '', lastName: '', emailId: '' });
        }
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedEmployee(null);
    };

    const saveOrUpdateEmployee = async (e) => {
        e.preventDefault(); // Prevent form from submitting
        if (modalType === 'add') {
            try {
                await EmployeeService.createEmployee(employeeDetails);
                toast.success('Employee added successfully!');
                fetchEmployees();
                closeModal();
            } catch (error) {
                console.error(error);
                toast.error('Error adding employee');
            }
        } else if (modalType === 'update') {
            try {
                await EmployeeService.updateEmployee(employeeDetails, selectedEmployee.id);
                toast.success('Employee updated successfully!');
                fetchEmployees();
                closeModal();
            } catch (error) {
                console.error(error);
                toast.error('Error updating employee');
            }
        }
    };

    const deleteEmployee = async () => {
        try {
            await EmployeeService.deleteEmployee(selectedEmployee.id);
            toast.success('Employee deleted successfully!');
            fetchEmployees();
            closeModal();
        } catch (error) {
            console.error(error);
            toast.error('Error deleting employee!');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <h2 className="text-2xl font-bold text-center mb-4">List Employees</h2>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => openModal('add')}
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
                            employees.map(employee => (
                                <tr key={employee.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{employee.id}</td>
                                    <td className="py-2 px-4 border-b">{employee.firstName}</td>
                                    <td className="py-2 px-4 border-b">{employee.lastName}</td>
                                    <td className="py-2 px-4 border-b">{employee.emailId}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                                            onClick={() => openModal('update', employee)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                            onClick={() => openModal('delete', employee)}
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
            {(modalType === 'add' || modalType === 'update') && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" aria-modal="true" role="dialog">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            {modalType === 'add' ? 'Add Employee' : 'Update Employee'}
                        </h3>
                        <form onSubmit={saveOrUpdateEmployee}>
                            <div className="mb-4">
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full mt-1 p-2 border rounded"
                                    value={employeeDetails.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full mt-1 p-2 border rounded"
                                    value={employeeDetails.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email ID</label>
                                <input
                                    type="email"
                                    name="emailId"
                                    className="w-full mt-1 p-2 border rounded"
                                    value={employeeDetails.emailId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    {modalType === 'add' ? 'Add' : 'Update'}
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
            {modalType === 'delete' && selectedEmployee && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" aria-modal="true" role="dialog">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                        <h3 className="text-xl font-bold mb-4 text-center">Confirm Delete</h3>
                        <p className="text-center mb-6">Are you sure you want to delete <strong>{selectedEmployee.firstName} {selectedEmployee.lastName}</strong>?</p>
                        <div className="flex justify-center">
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
