import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';

export default function DisableForm() {

let navigate=useNavigate()

  const [user, setUser] = useState({
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
    console.log("Form submitted"); // Add this line
    try {
      await axios.post("http://localhost:8080/user", user);
      console.log("Data sent successfully"); // Add this line
      navigate("/Home");
    } catch (error) {
      console.error("Error:", error);
    }
  };
    
  return (
    <div className="flex">
      {/* Sidebar with Roller */}
      <aside className="fixed top-0 left-0 h-full w-1/3 p-4 overflow-y-auto">
        <div className="bg-gray-100 rounded-lg shadow-md">
          {/* Roller */}
          <div className="bg-blue-200 p-2 flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-500 rounded-full mx-1"></div>
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          </div>
          {/* Cards */}
          <div className="p-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="text-lg font-semibold mb-2">Card {index + 1}</h3>
                <p>Content of Card {index + 1} goes here...</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <main className="flex-1">
        <section className="bg-gray-50 min-h-screen flex items-center justify-end">
          {/* Register form */}
          <div className="bg-blue-200 rounded-2xl shadow-lg p-5 items-center w-2/3">
            {/* Form */}
            <div className="w-full px-8 md:px-16">
              <h2 className="font-bold text-2xl text-[#002D74]"></h2>

              <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">
                <div className="text-left my-2">
                  <label htmlFor="name" className="text-left text-xs text-[#002D74]">Which foot do you need footwear?</label>
                  <div className="flex items-center space-x-2 text-xs my-2">
                    <input onChange={(e) => onInputChange(e)} checked={leftCheckbox} type="checkbox" id="leftFoot" name="leftCheckbox" className="form-checkbox h-4 w-4 text-[#002D74] focus:ring-[#002D74]" />
                    <label htmlFor="leftFoot" className="text-[#002D74]">Left Foot</label>
                    <input onChange={(e) => onInputChange(e)} checked={rightCheckbox} type="checkbox" id="rightFoot" name="rightCheckbox" className="form-checkbox h-4 w-4 text-[#002D74] focus:ring-[#002D74]" />
                    <label htmlFor="rightFoot" className="text-[#002D74]">Right Foot</label>
                  </div>
                </div>

                <div className="text-left my-2">
                  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Foot Length:</label>
                  <div className="text-xs flex space-x-4">
                    <input onChange={(e) => onInputChange(e)} value={leftFootLength} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="leftFootLength" placeholder='Left Foot(cm/inches)' />
                    <input onChange={(e) => onInputChange(e)} value={rightFootLength} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="rightFootLength" placeholder='Right Foot(cm/inches)' />
                  </div>
                </div>
                <div className="text-left my-2">
                  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Foot Width:</label>
                  <div className="text-xs flex space-x-4">
                    <input onChange={(e) => onInputChange(e)} value={left_foot_width} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="left_foot_width" placeholder='Left Foot Width (cm/inches)' />
                    <input onChange={(e) => onInputChange(e)} value={right_foot_width} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="right_foot_width" placeholder='Right Foot Width (cm/inches)' />
                  </div>
                </div>

                <div className="text-left my-2">
  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Arch Height (if applicable):</label>
  <div className="text-xs flex space-x-4">
    <input onChange={(e) => onInputChange(e)} value={left_arch_height} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="left_arch_height" placeholder='Left Arch Height (cm/inches)'/>
    <input onChange={(e) => onInputChange(e)} value={right_arch_height} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="right_arch_height" placeholder='Right Arch Height (cm/inches)' />
  </div>
</div>

<div className="text-left my-2">
  <label htmlFor="leftFoot" className="block text-xs text-[#002D74]">Toe Shape (e.g., pointed, rounded, square)(if applicable):</label>
  <div className="text-xs flex space-x-4">
    <input onChange={(e) => onInputChange(e)} value={left_toe_shape} id="leftFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="left_toe_shape" placeholder='Left Toe Shape'/>
    <input onChange={(e) => onInputChange(e)} value={right_toe_shape} id="rightFoot" className="block p-2 mt-2 rounded-xl border w-full" type="tel" name="right_toe_shape" placeholder='Right Toe Shape' />
  </div>
</div>

<div className='text-left my-2'>
  <label htmlFor="address" className='text-xs text-[#002D74]'>Comfort and Closure Preferences (e.g., padding, cushioning, etc.):</label>
  <input onChange={(e) => onInputChange(e)} value={comfortAndClosurePreferences} id="address" className="block p-2 mt-2 rounded-xl border w-full" type="text" name="comfortAndClosurePreferences"  />
</div>

<div className='text-left my-2'>
  <label htmlFor="address" className='text-xs text-[#002D74]'>Description:</label>
  <textarea onChange={(e) => onInputChange(e)} value={description} id="description" className="block p-2 mt-2 rounded-xl border w-full" name="description" />
</div>

                {/* Add other input fields similarly */}

                <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Submit</button>
              </form>

              <div className="mt-6 grid grid-cols-all items-center text-gray-400">
                <hr className="border-gray-400" />
              </div>
            </div>

            <div className="w-2/3 md:w-full mt-8 md:mt-16">
              <YouTube videoId="8_7X8jwhV4s" opts={{ width: '100%', height: '400px' }} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
