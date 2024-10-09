import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';

export default function DisableForm() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    leftCheckbox: false,
    rightCheckbox: false,
    leftFootLength: '',
    rightFootLength: '',
    left_foot_width: '',
    right_foot_width: '',
    left_arch_height: '',
    right_arch_height: '',
    left_toe_shape: '',
    right_toe_shape: '',
    comfortAndClosurePreferences: '',
    description: ''
  });

  const {
    leftCheckbox,
    rightCheckbox,
    leftFootLength,
    rightFootLength,
    left_foot_width,
    right_foot_width,
    left_arch_height,
    right_arch_height,
    left_toe_shape,
    right_toe_shape,
    comfortAndClosurePreferences,
    description
  } = user;

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/disableuser', user);
      setUser({
        leftCheckbox: false,
        rightCheckbox: false,
        leftFootLength: "",
        rightFootLength: "",
        left_foot_width: "",
        right_foot_width: "",
        left_arch_height: "",
        right_arch_height: "",
        left_toe_shape: "",
        right_toe_shape: "",
        comfortAndClosurePreferences: "",
        description: ""
      });
      alert('Order Submitted successfully');
      navigate(0); // Reload the current page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1556740749-55d3c8cde6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8MTY5NTc0NzE4&ixlib=rb-1.2.1&q=80&w=1080")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <main className="bg-white rounded-lg shadow-lg p-8 md:p-12 w-full md:w-3/4 lg:w-1/2 mt-16 relative">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Footwear Preferences Form</h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <label htmlFor="footSelection" className="text-sm text-gray-700 flex items-center">
                <i className="fas fa-football-ball w-6 h-6 mr-2"></i>
                Which foot do you need footwear for?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input onChange={onInputChange} checked={leftCheckbox} type="checkbox" id="leftFoot" name="leftCheckbox" className="form-checkbox h-4 w-4 text-blue-600" />
                  <span className="ml-2 text-gray-700">Left Foot</span>
                </label>
                <label className="flex items-center">
                  <input onChange={onInputChange} checked={rightCheckbox} type="checkbox" id="rightFoot" name="rightCheckbox" className="form-checkbox h-4 w-4 text-blue-600" />
                  <span className="ml-2 text-gray-700">Right Foot</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leftFootLength" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-ruler w-6 h-6 mr-2"></i>
                  Foot Length:
                </label>
                <input onChange={onInputChange} value={leftFootLength} id="leftFootLength" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="tel" name="leftFootLength" placeholder='Left Foot (cm/inches)' />
              </div>
              <div>
                <label htmlFor="rightFootLength" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-ruler w-6 h-6 mr-2"></i>
                  Foot Length:
                </label>
                <input onChange={onInputChange} value={rightFootLength} id="rightFootLength" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="tel" name="rightFootLength" placeholder='Right Foot (cm/inches)' />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leftFootWidth" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-ruler w-6 h-6 mr-2"></i>
                  Foot Width:
                </label>
                <input onChange={onInputChange} value={left_foot_width} id="leftFootWidth" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="tel" name="left_foot_width" placeholder='Left Foot Width (cm/inches)' />
              </div>
              <div>
                <label htmlFor="rightFootWidth" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-ruler w-6 h-6 mr-2"></i>
                  Foot Width:
                </label>
                <input onChange={onInputChange} value={right_foot_width} id="rightFootWidth" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="tel" name="right_foot_width" placeholder='Right Foot Width (cm/inches)' />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leftArchHeight" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-ruler w-6 h-6 mr-2"></i>
                  Arch Height (if applicable):
                </label>
                <input onChange={onInputChange} value={left_arch_height} id="leftArchHeight" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="tel" name="left_arch_height" placeholder='Left Arch Height (cm/inches)' />
              </div>
              <div>
                <label htmlFor="rightArchHeight" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-ruler w-6 h-6 mr-2"></i>
                  Arch Height (if applicable):
                </label>
                <input onChange={onInputChange} value={right_arch_height} id="rightArchHeight" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="tel" name="right_arch_height" placeholder='Right Arch Height (cm/inches)' />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leftToeShape" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-shoe-prints w-6 h-6 mr-2"></i>
                  Toe Shape (if applicable):
                </label>
                <input onChange={onInputChange} value={left_toe_shape} id="leftToeShape" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="text" name="left_toe_shape" placeholder='Left Toe Shape' />
              </div>
              <div>
                <label htmlFor="rightToeShape" className="block text-sm text-gray-700 flex items-center">
                  <i className="fas fa-shoe-prints w-6 h-6 mr-2"></i>
                  Toe Shape (if applicable):
                </label>
                <input onChange={onInputChange} value={right_toe_shape} id="rightToeShape" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="text" name="right_toe_shape" placeholder='Right Toe Shape' />
              </div>
            </div>

            <div>
              <label htmlFor="comfortAndClosurePreferences" className="block text-sm text-gray-700 flex items-center">
                <i className="fas fa-couch w-6 h-6 mr-2"></i>
                Comfort and Closure Preferences:
              </label>
              <input onChange={onInputChange} value={comfortAndClosurePreferences} id="comfortAndClosurePreferences" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" type="text" name="comfortAndClosurePreferences" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm text-gray-700 flex items-center">
                <i className="fas fa-pencil-alt w-6 h-6 mr-2"></i>
                Description:
              </label>
              <textarea onChange={onInputChange} value={description} id="description" className="block p-3 mt-1 rounded border border-gray-300 w-full focus:border-blue-500 focus:outline-none" name="description" />
            </div>

            <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
          </form>

          <div className="mt-8">
            <YouTube videoId="8_7X8jwhV4s" opts={{ width: '100%', height: '400px' }} />
          </div>
        </main>
      </div>
    </div>
  );
}
