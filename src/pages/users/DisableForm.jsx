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
    console.log('Form submitted'); // Add this line
    try {
      await axios.post('http://localhost:8080/disableuser', user);
      console.log('Data sent successfully'); // Add this line
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
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <main className="bg-blue-200 rounded-lg shadow-lg p-5 md:p-16 w-full md:w-2/3 mt-16">
        <h2 className="text-3xl font-bold text-[#002D74] mb-8 text-center">Footwear Preferences Form</h2>

        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">
        <div className="text-left my-2">
                  <label htmlFor="name" className="text-left text-xs text-[#002D74]">Which foot do you need footwear?</label>
                  <div className="flex items-center space-x-2 text-xs my-2">
                    <input onChange={onInputChange} checked={leftCheckbox} type="checkbox" id="leftFoot" name="leftCheckbox" className="form-checkbox h-4 w-4 text-[#002D74] focus:ring-[#002D74]" />
                    <label htmlFor="leftFoot" className="text-[#002D74]">Left Foot</label>
                    <input onChange={onInputChange} checked={rightCheckbox} type="checkbox" id="rightFoot" name="rightCheckbox" className="form-checkbox h-4 w-4 text-[#002D74] focus:ring-[#002D74]" />
                    <label htmlFor="rightFoot" className="text-[#002D74]">Right Foot</label>
                  </div>
                </div>

                <div className="text-left my-2">
                  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Foot Length:</label>
                  <div className="text-xs flex space-x-4">
                    <input onChange={onInputChange} value={leftFootLength} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="leftFootLength" placeholder='Left Foot(cm/inches)' />
                    <input onChange={onInputChange} value={rightFootLength} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="rightFootLength" placeholder='Right Foot(cm/inches)' />
                  </div>
                </div>
                <div className="text-left my-2">
                  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Foot Width:</label>
                  <div className="text-xs flex space-x-4">
                    <input onChange={onInputChange} value={left_foot_width} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="left_foot_width" placeholder='Left Foot Width (cm/inches)' />
                    <input onChange={onInputChange} value={right_foot_width} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="right_foot_width" placeholder='Right Foot Width (cm/inches)' />
                  </div>
                </div>

                <div className="text-left my-2">
                  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Arch Height (if applicable):</label>
                  <div className="text-xs flex space-x-4">
                    <input onChange={onInputChange} value={left_arch_height} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="left_arch_height" placeholder='Left Arch Height (cm/inches)'/>
                    <input onChange={onInputChange} value={right_arch_height} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="right_arch_height" placeholder='Right Arch Height (cm/inches)' />
                  </div>
                </div>

                <div className="text-left my-2">
                  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Toe Shape (e.g., pointed, rounded, square)(if applicable):</label>
                  <div className="text-xs flex space-x-4">
                    <input onChange={onInputChange} value={left_toe_shape} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="left_toe_shape" placeholder='Left Toe Shape'/>
                    <input onChange={onInputChange} value={right_toe_shape} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="right_toe_shape" placeholder='Right Toe Shape' />
                  </div>
                </div>

                <div className='text-left my-2'>
                  <label htmlFor="address" className='text-xs text-[#002D74]'>Comfort and Closure Preferences (e.g., padding, cushioning, etc.):</label>
                  <input onChange={onInputChange} value={comfortAndClosurePreferences} id="address" className="block p-2 mt-2 rounded-xl border w-full" type="text" name="comfortAndClosurePreferences"  />
                </div>

                <div className='text-left my-2'>
                  <label htmlFor="address" className='text-xs text-[#002D74]'>Description:</label>
                  <textarea onChange={onInputChange} value={description} id="description" className="block p-2 mt-2 rounded-xl border w-full" name="description" />
                </div>

                {/* Add other input fields similarly */}

                <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Submit</button>
              </form>

        <div className="mt-8">
          <YouTube videoId="8_7X8jwhV4s" opts={{ width: '100%', height: '400px' }} />
        </div>
      </main>
    </div>
  );
}
