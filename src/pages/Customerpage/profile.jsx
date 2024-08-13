import React, { useState, useEffect } from 'react';
import ApiService from '../../components/service/ApiService';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaSave, FaTimes, FaTrashAlt } from 'react-icons/fa';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
                setUpdatedUser(response.user);
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
    };

    const handleUpdateProfile = async () => {
        try {
            await ApiService.updateUserProfile(updatedUser);
            setUser(updatedUser); // Ensure user state is updated with the latest data
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
                            {/*<FaUserCircle />*/}
                            <img
                          className="w-24 h-24 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
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
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="firstname" className="text-gray-700 font-medium text-sm">First Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="userFirstname"
                                            value={updatedUser.userFirstname}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.userFirstname}</p>
                                    )}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <label className="text-gray-700 font-medium text-sm">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="userLastname"
                                            value={updatedUser.userLastname}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.userLastname}</p>
                                    )}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <label className="text-gray-700 font-medium text-sm">Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={updatedUser.phoneNumber}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.phoneNumber || 'N/A'}</p> 
                                    )}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <label className="text-gray-700 font-medium text-sm">Address</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={updatedUser.address}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.address || 'N/A'}</p> 
                                    )}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <label className="text-gray-700 font-medium text-sm">Email</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={updatedUser.email}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-md w-3/4"
                                        />
                                    ) : (
                                        <p>{user.email}</p>
                                    )}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <label className="text-gray-700 font-medium text-sm">Password</label>
                                    {isEditing ? (
                                        <input
                                            className="p-2 rounded-md border w-3/4"
                                            type="password"
                                            name="password"
                                            value={updatedUser.password || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <p>********</p> 
                                    )}
                                </div>

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
