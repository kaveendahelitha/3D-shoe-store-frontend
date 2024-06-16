import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../components/service/ApiService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  //const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      const response = await ApiService.loginUser({ email, password });
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        //navigate(from, { replace: true });
        
        let redirectTo = '/';
        if (response.role === 'ADMIN') {
          redirectTo = '/admin';
        } else if (response.role === 'USER') {
          redirectTo = '/customer';
        } else if (response.role === 'EMPLOYEE') {
          redirectTo = '/employee';
        } else if (response.role === 'SITE_MANAGER') {
          redirectTo = '/sitemanager';
        }

        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center mt-16">
        <div className="bg-blue-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            {error && <p className="text-red-500 error-message">{error}</p>}
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control p-2 mt-8 rounded-xl border"
                type="email"
                id="email"
                placeholder="Email"
              />
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="p-2 form-control rounded-xl border w-full"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
            </form>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 item-center text-xs mt-4 text-[#002D74]">
                <label htmlFor="Remember Me">Remember Me</label>
                <input type="checkbox" className="checkbox" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-all items-center text-gray-400">
              <hr className="border-gray-400" />
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <span>Don't have an account? <b><Link to='/Register'> Sign up</Link></b></span>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src="../src/assets/login/bg1.jpg" alt="Login Image" />
          </div>
        </div>
      </section>
    </div>
  );
}
