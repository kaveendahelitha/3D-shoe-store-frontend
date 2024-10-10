import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ApiService from '../../components/service/ApiService';

function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const email = location.state?.email;  // Get email passed from ForgotPassword
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        try {
            const response = await ApiService.verifyOtp(otp, email);
            setMessage("OTP verified successfully!");

            // Navigate to reset password page after successful OTP verification
            setTimeout(() => {
                navigate("/resetPassword", { state: { email } });
            }, 2000); // Delay navigation for 2 seconds to allow the user to see the success message
        } catch (error) {
            setError("Failed to verify OTP. " + error.message);
            setMessage("");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 to-blue-300 min-h-screen flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 flex flex-col">
                <h1 className="text-3xl font-bold text-[#002D74] text-center mb-6">Verify OTP</h1>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="border border-gray-300 p-3 rounded-xl mb-4 focus:border-[#002D74] focus:ring-2 focus:ring-[#002D74] transition duration-200"
                />
                <button
                    onClick={handleVerifyOtp}
                    className="bg-[#002D74] text-white p-3 rounded-xl hover:scale-105 duration-300 transition-all"
                >
                    Verify OTP
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

export default VerifyOtp;
