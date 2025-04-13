import React from 'react';
import { Link } from 'react-router-dom';
import {ChartNoAxesCombined} from 'lucide-react'

const RegistrationOptions = () => {
  const handleIndividualClick = () => {
    console.log('Navigate to individual signup');
  };

  const handleBusinessClick = () => {
    console.log('Navigate to business signup');
  };

  const handleSkipClick = () => {
    console.log('Skip to dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 sm:p-6">
      <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded p-1">
            <ChartNoAxesCombined />
            </div>
            <span className="text-xl font-bold">viraLink</span>
          </Link>
      </header>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - Image and tagline */}
        <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-center items-center text-center md:text-left md:items-start">
          <div className="relative w-full max-w-md mb-6 sm:mb-8">
            <div className="h-56 sm:h-64 relative">
              <img
                src="src/Login/image.png"
                alt="Person choosing options"
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 bg-blue-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 -ml-6 -mt-6"></div>
              <div className="absolute top-0 right-0 bg-blue-500 rounded-tl-full w-12 h-12 sm:w-16 sm:h-16"></div>
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-12 h-12 sm:w-16 sm:h-16"></div>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-4">
            Choose your account type to get started
          </h2>
        </div>

        {/* Right side - Registration Options */}
        <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-6 sm:mb-8">
              How would you like to register?
            </h2>

            <div className="space-y-4">
              <Link
                to="/indlog"
                className="block w-full bg-blue-500 text-white rounded-md p-3 sm:p-4 font-semibold hover:bg-blue-600 transition text-center"
              >
                Register as Individual
              </Link>

              <Link
                to="/busslog"
                className="block w-full bg-white text-blue-500 border-2 border-blue-500 rounded-md p-3 sm:p-4 font-semibold hover:bg-blue-50 transition text-center"
              >
                Register as Business
              </Link>

              <div className="mt-6 sm:mt-8 text-center">
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-700 hover:underline"
                >
                  Skip all the questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationOptions;
