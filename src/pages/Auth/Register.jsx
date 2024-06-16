import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../components/service/ApiService';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userFirstname: '',
        userLastname: '',
        address: '',
        email: '',
        password: '',
        
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validateForm = () => {
        const { userFirstname,userLastname,address,email,password } = formData;
        if (!userFirstname|| !userLastname|| !address || !email || !password ) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please fill all the fields.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
        try {
            // Call the register method from UserService without the token
            const response = await ApiService.registerUser(formData);

            // Clear the form fields after successful registration
            if (response.statusCode === 200) {

            setFormData({
                userFirstname: '',
                userLastname: '',
                address: '',
                email: '',
                password: '',
                //role: 'USER',
            });

           setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/login');
                }, 3000);
            }
        }
         catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center mt-16">
                {/* login container */}
                <div className="bg-blue-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    {/* form */}
                    <div className="px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
                        {errorMessage && <p className="text-red-500 error-message">{errorMessage}</p>}
                        {successMessage && <p className="text-green-500 success-message">{successMessage}</p>}

                        <form onSubmit={handleSubmit} 
                        className="flex flex-col gap-4">
                            <div className=' flex gap-2'>
                            <div className="text-left my-2">
                                <label htmlFor="firstname" 
                                className="text-left text-xs text-[#002D74]">
                                    First Name
                                </label>
                                <input
                                    required
                                    value={formData.userFirstname}
                                    onChange={handleInputChange}
                                    id="firstname"
                                    className="form-control block p-2 mt-2 rounded-xl border w-full"
                                    type="text"
                                    name="userFirstname"
                                />
                            </div>
                            <div className="text-left my-2">
                                <label htmlFor="lastname" 
                                className="text-left text-xs text-[#002D74]">
                                    Last Name
                                </label>
                                <input
                                    required
                                    value={formData.userLastname}
                                    onChange={handleInputChange}
                                    id="lastname"
                                    className="form-control block p-2 mt-2 rounded-xl border w-full"
                                    type="text"
                                    name="userLastname"
                                />
                            </div>
</div>
                            <div className="text-left my-2">
                                <label htmlFor="address" className="text-xs text-[#002D74]">
                                    Enter Your Address
                                </label>
                                <input
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    id="address"
                                    className="block p-2 mt-2 rounded-xl border w-full"
                                    type="text"
                                    name="address"
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
                                />
                                {/* password icon */}
                            </div>

                            <button
                                type="submit"
                                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                            >
                                Register
                            </button>
                        </form>

                        <div className="mt-6 grid grid-cols-all items-center text-gray-400">
                            <hr className="border-gray-400" />
                        </div>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <span>
                                Already have an account?
                                <b>
                                    <Link to="/Login"> Login</Link>
                                </b>
                            </span>
                        </div>
                    </div>

                    
                </div>
            </section>
        </div>
    );
}
