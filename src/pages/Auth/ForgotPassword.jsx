import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../components/service/ApiService';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
    const navigate = useNavigate();  // For navigation

    const handleForgotPassword = async () => {
        try {
            const response = await ApiService.forgotPassword(email);
            setMessage("OTP sent successfully! Please check your email."); // Set success message
            setError("");
            setShowDialog(true); // Show the dialog on success

            // Delay navigation to allow the user to see the success message
            setTimeout(() => {
                navigate("/otpForm", { state: { email } });
            }, 2000); // 2 seconds delay for the success message to be visible
        } catch (error) {
            setError("Failed to send OTP. " + error.message);
            setMessage(""); // Clear success message on error
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 to-blue-300 min-h-screen flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 flex flex-col">
                <h1 className="text-3xl font-bold text-[#002D74] text-center mb-6">Forgot Password</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border border-gray-300 p-3 rounded-xl mb-4 focus:border-[#002D74] focus:ring-2 focus:ring-[#002D74] transition duration-200"
                />
                <button
                    onClick={handleForgotPassword}
                    className="bg-[#002D74] text-white p-3 rounded-xl hover:scale-105 duration-300 transition-all"
                >
                    Send OTP
                </button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                {/* Success Message Dialog */}
                {showDialog && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                            <h2 className="text-lg font-semibold text-[#002D74]">Success!</h2>
                            <p className="mt-2 text-gray-700">{message}</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setShowDialog(false)} // Close the dialog and navigate
                                    className="bg-[#002D74] text-white py-2 px-4 rounded hover:scale-105 transition duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
