import React, { useState, useEffect } from 'react';
import UserService from '../../components/Services/UserService';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.systemUsers);
    } catch (error) {
      console.error('Error fetching profile information:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Profile Information</h2>
      <div className="mb-4">
        <span className="font-medium text-gray-700">Name:</span> <span className="text-gray-900">{profileInfo.name}</span>
      </div>
      <div className="mb-4">
        <span className="font-medium text-gray-700">Email:</span> <span className="text-gray-900">{profileInfo.email}</span>
      </div>
      {profileInfo.role === 'ADMIN' && (
        <div className="mt-6">
          <Link
            to={`/update-user/${profileInfo.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Update This Profile
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
