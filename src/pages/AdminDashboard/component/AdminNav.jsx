import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../../components/Services/UserService';

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
        }
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <ul className="flex space-x-4">
                {isAuthenticated && (
                    <li>
                        <Link
                            to="/profile"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Profile
                        </Link>
                    </li>
                )}
                {isAdmin && (
                    <li>
                        <Link
                            to="/admin/user-management"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            User Management
                        </Link>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <Link
                            to="/"
                            onClick={handleLogout}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Logout
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
