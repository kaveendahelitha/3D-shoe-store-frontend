import React, { useState } from 'react';
import ApiService from '../../components/service/ApiService';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        try {
            // Step 1: Reset Password
            const response = await ApiService.resetPassword(email, password, repeatPassword);
            setMessage(response.message); // Show reset password message

            if (response.success) {
                // Step 2: Log in the user
                const loginDetails = { email, password }; // Prepare login details
                const loginResponse = await ApiService.loginUser(loginDetails);

                if (loginResponse.success) {
                    // Store token in local storage
                    localStorage.setItem('token', loginResponse.token);
                    localStorage.setItem('role', loginResponse.role);

                    // Step 3: Fetch user profile after resetting the password
                    const userProfile = await ApiService.getUserProfile();
                    console.log('User Profile:', userProfile); // Check the profile data

                    if (userProfile) {
                        // Store the user profile in local storage
                        localStorage.setItem('userProfile', JSON.stringify(userProfile));
                        // Navigate to the profile page
                        navigate('/profile');
                    } else {
                        setMessage('User profile data is not available.');
                    }
                } else {
                    setMessage('Login failed. Please check your credentials.');
                }
            }
        } catch (error) {
            setMessage('Failed to reset password or login.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleResetPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4">Reset Password</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <input
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Reset Password</button>
                {message && <p className="text-red-500 mt-4">{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
