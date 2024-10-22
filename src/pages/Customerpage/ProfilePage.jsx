import React, { useState, useEffect } from 'react';
import ApiService from '../../components/service/ApiService';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        userFirstname: '',
        userLastname: '',
        phoneNumber: '',
        address: '',
        email: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                if (response && response.user) {
                    setUser(response.user);
                    setUpdatedUser({
                        userFirstname: response.user.userFirstname || '',
                        userLastname: response.user.userLastname || '',
                        phoneNumber: response.user.phoneNumber || '',
                        address: response.user.address || '',
                        email: response.user.email || ''
                    });
                } else {
                    setError('User profile data is not available.');
                }
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Information</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                {user ? (
                    <div className="space-y-4">
                        {/* Render user fields */}
                        {Object.entries(updatedUser).map(([key, value]) => (
                            <div className='flex items-center justify-between' key={key}>
                                <label className="text-gray-700 font-medium text-sm">{key.replace(/([A-Z])/g, ' $1')}</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-md w-3/4"
                                    />
                                ) : (
                                    <p>{value || 'N/A'}</p>
                                )}
                            </div>
                        ))}

                        {/* Action Buttons */}
                        <div className="flex justify-between mt-4">
                            {isEditing ? (
                                <>
                                    <button onClick={handleUpdateProfile} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                    <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                                </>
                            ) : (
                                <button onClick={handleEditClick} className="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
                            )}
                            <button onClick={handleDeleteProfile} className="bg-red-500 text-white px-4 py-2 rounded">Delete Account</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading user profile...</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
