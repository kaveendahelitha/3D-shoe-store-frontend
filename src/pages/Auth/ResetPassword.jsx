import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ApiService from '../../components/service/ApiService';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const email = location.state?.email;  // Get email passed from VerifyOtp
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (password !== repeatPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await ApiService.resetPassword(email, password, repeatPassword); // Call resetPassword with email, password, repeatPassword
            setMessage("Password reset successfully!");
            setError("");

            // Optionally, navigate to the login page after resetting password
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Delay navigation to allow the user to see the success message
        } catch (error) {
            setError("Failed to reset password. " + error.message);
            setMessage("");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 to-blue-300 min-h-screen flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 flex flex-col">
                <h1 className="text-3xl font-bold text-[#002D74] text-center mb-6">Reset Password</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="border border-gray-300 p-3 rounded-xl mb-4 focus:border-[#002D74] focus:ring-2 focus:ring-[#002D74] transition duration-200"
                />
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="border border-gray-300 p-3 rounded-xl mb-4 focus:border-[#002D74] focus:ring-2 focus:ring-[#002D74] transition duration-200"
                />
                <button
                    onClick={handleResetPassword}
                    className="bg-[#002D74] text-white p-3 rounded-xl hover:scale-105 duration-300 transition-all"
                >
                    Reset Password
                </button>
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                {/* Link to go back to Forgot Password page */}
                <div className="mt-6 text-center">
                    <Link to="/forgotPassword" className="text-[#002D74] hover:underline">
                        Go back to Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;