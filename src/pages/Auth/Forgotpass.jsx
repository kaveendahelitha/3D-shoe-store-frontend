import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../components/service/ApiService';

export default function ForgotPass() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successPopup, setSuccessPopup] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { email } = formData;
        return email && /\S+@\S+\.\S+/.test(email); // Basic email validation
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            setErrorMessage('Please enter a valid email.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
    
        try {
            const response = await ApiService.forgotpass(formData.email);
            console.log('Response from forgotpass:', response); // Log the complete response
    
            // Inspect the response structure before checking for status
            if (response && typeof response === 'object') {
                console.log('Response object structure:', response); // Log the structure for debugging
    
                // Check for response status and data
                if (response.status === 200) {
                    setSuccessPopup(true); 
                    setFormData({ email: '' });
    
                    setTimeout(() => {
                        navigate('/otpForm');
                    }, 2000);
                } else {
                    throw new Error('Unexpected response structure');
                }
            } else {
                throw new Error('Response is not an object');
            }
        } catch (error) {
            console.error('Error during OTP sending:', error);
    
            if (error.response) {
                console.error('Server responded with:', error.response);
                setErrorMessage(error.response.data.message || 'An error occurred while sending OTP.');
            } else if (error.request) {
                console.error('No response received:', error.request);
                setErrorMessage('No response from the server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                setErrorMessage('An unexpected error occurred: ' + error.message);
            }
    
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };
    
    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center mt-16">
                <div className="bg-blue-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">Email</h2>
                        {errorMessage && <p className="text-red-500 error-message">{errorMessage}</p>}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                            <button
                                type="submit"
                                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Success Popup */}
            {successPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative z-50">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> OTP sent successfully!</span>
                    <button onClick={handleClosePopup} className="absolute top-0 right-0 mt-2 mr-2 text-green-600 hover:text-green-800">
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
}
