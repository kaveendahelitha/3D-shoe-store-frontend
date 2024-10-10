import React, { useState, useEffect } from 'react';
import ApiService from '../../components/service/ApiService';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSave, FaTimes, FaTrashAlt } from 'react-icons/fa';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        userFirstname: '',
        userLastname: '',
        phoneNumber: '',
        address: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
                setUpdatedUser({
                    userFirstname: response.user.userFirstname || '',
                    userLastname: response.user.userLastname || '',
                    phoneNumber: response.user.phoneNumber || '',
                    address: response.user.address || '',
                    email: response.user.email || '',
                    password: '',
                });
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setSuccess(null);
        setError(null);
    };

    const handleUpdateProfile = async () => {
        setError(null);
        try {
            await ApiService.updateUserProfile(updatedUser);
            setUser(updatedUser);
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error updating profile.');
        }
    };

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/register');
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error deleting profile.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    {/* Profile Picture Section */}
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white text-4xl">
                            <img
                                className="w-24 h-24 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                            />
                        </div>
                    </div>

                    {/* User Information Section */}
                    <div className="flex-grow">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Information</h2>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        {success && <div className="text-green-500 mb-4">{success}</div>}
                        {user && (
                            <div className="space-y-4">
                                {/* First Name */}
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="userFirstname" className="text-gray-700 font-medium text-sm">First Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="userFirstname"
                                            name="userFirstname"
                                            value={updatedUser.userFirstname}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.userFirstname || 'N/A'}</p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="userLastname" className="text-gray-700 font-medium text-sm">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="userLastname"
                                            name="userLastname"
                                            value={updatedUser.userLastname}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.userLastname || 'N/A'}</p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="phoneNumber" className="text-gray-700 font-medium text-sm">Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={updatedUser.phoneNumber}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.phoneNumber || 'N/A'}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="address" className="text-gray-700 font-medium text-sm">Address</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={updatedUser.address}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.address || 'N/A'}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="email" className="text-gray-700 font-medium text-sm">Email</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={updatedUser.email}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.email || 'N/A'}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="password" className="text-gray-700 font-medium text-sm">Password</label>
                                    {isEditing ? (
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={updatedUser.password}
                                            onChange={handleInputChange}
                                            className="p-2 rounded-md border w-3/4"
                                        />
                                    ) : (
                                        <p>********</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mt-4">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={handleUpdateProfile}
                                                className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
                                            >
                                                <FaSave className="mr-2" /> Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="bg-gray-500 text-white py-2 px-4 rounded flex items-center"
                                            >
                                                <FaTimes className="mr-2" /> Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleEditClick}
                                                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
                                            >
                                                <FaEdit className="mr-2" /> Edit
                                            </button>
                                            <button
                                                onClick={handleDeleteProfile}
                                                className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
                                            >
                                                <FaTrashAlt className="mr-2" /> Delete Account
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
