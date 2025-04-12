import React, { useState } from 'react';
import Shopowner from '../components/images/shopowner.png';
import { Link } from 'react-router-dom';

const BusinessSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-6">
        <h1 className="text-3xl font-bold">GenSpark</h1>
      </header>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - Image and tagline */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <div className="relative mb-8">
            <div className="h-64 relative">
              <img 
                src={Shopowner} 
                alt="Business person using tablet" 
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 bg-blue-500 rounded-full w-16 h-16 -ml-8 -mt-8"></div>
              <div className="absolute top-0 right-0 bg-blue-500 rounded-tl-full w-16 h-16"></div>
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-16 h-16"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">Make your market experience 100x better</h2>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-blue-500 mb-8">Create a business holder account</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md p-4 font-semibold hover:bg-blue-600 transition"
                >
                  Sign up
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-gray-700 hover:underline">
                Already a member? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;
