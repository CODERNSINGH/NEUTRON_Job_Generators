import React, { useState } from 'react';
import {ChartNoAxesCombined} from 'lucide-react'
import { Link } from 'react-router-dom';

const OnboardingSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      youtube: '',
      twitter: '',
      linkedin: '',
      others: '',
    },
    whatsapp: '',
    businessEmail: '',
    useCase: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [name]: value
      }
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSkip = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGetStarted = () => {
    // Handle final submission
    console.log('Final submission:', formData);
    // Redirect to dashboard or another page
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Progress bar */}
      <div className="w-full max-w-3xl mb-12">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`h-4 w-4 rounded-full ${step <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              {step < 5 && (
                <div className={`h-1 w-16 ${step < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="w-full max-w-2xl">
        {currentStep === 1 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">What is your business name?</h2>
            <div className="mb-8">
              <input
                type="text"
                name="businessName"
                placeholder="Example: Vikram flowers"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-12">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white rounded-md px-6 py-3 font-semibold hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">How many followers do you have on your social media platforms?</h2>
            <div className="space-y-4">
              <div className="flex items-center bg-gray-200 rounded-md p-2">
                <div className="bg-gray-200 p-2 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded">
                    <span className="text-white text-xs">IG</span>
                  </div>
                </div>
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleSocialMediaChange}
                  className="flex-1 bg-transparent p-2 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center bg-gray-200 rounded-md p-2">
                <div className="bg-gray-200 p-2 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-600 rounded">
                    <span className="text-white text-xs">FB</span>
                  </div>
                </div>
                <input
                  type="text"
                  name="facebook"
                  placeholder="Facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleSocialMediaChange}
                  className="flex-1 bg-transparent p-2 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center bg-gray-200 rounded-md p-2">
                <div className="bg-gray-200 p-2 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-red-600 rounded">
                    <span className="text-white text-xs">YT</span>
                  </div>
                </div>
                <input
                  type="text"
                  name="youtube"
                  placeholder="YouTube"
                  value={formData.socialMedia.youtube}
                  onChange={handleSocialMediaChange}
                  className="flex-1 bg-transparent p-2 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center bg-gray-200 rounded-md p-2">
                <div className="bg-gray-200 p-2 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-black rounded">
                    <span className="text-white text-xs">X</span>
                  </div>
                </div>
                <input
                  type="text"
                  name="twitter"
                  placeholder="Twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleSocialMediaChange}
                  className="flex-1 bg-transparent p-2 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center bg-gray-200 rounded-md p-2">
                <div className="bg-gray-200 p-2 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-700 rounded">
                    <span className="text-white text-xs">LI</span>
                  </div>
                </div>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="LinkedIn"
                  value={formData.socialMedia.linkedin}
                  onChange={handleSocialMediaChange}
                  className="flex-1 bg-transparent p-2 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center bg-gray-200 rounded-md p-2">
                <div className="bg-gray-200 p-2 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-gray-500 rounded">
                    <span className="text-white text-xs">...</span>
                  </div>
                </div>
                <input
                  type="text"
                  name="others"
                  placeholder="Others"
                  value={formData.socialMedia.others}
                  onChange={handleSocialMediaChange}
                  className="flex-1 bg-transparent p-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white rounded-md px-6 py-3 font-semibold hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Would you like to automate WhatsApp business to us for better communication?</h2>
            <div className="mb-8">
              <input
                type="text"
                name="whatsapp"
                placeholder="Example: Vikram flowers"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white rounded-md px-6 py-3 font-semibold hover:bg-blue-600 transition"
              >
                Next
              </button>
              <button
                onClick={handleSkip}
                className="text-gray-600 hover:underline flex items-center"
              >
                skip this question <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Would you like to automate business mail to us for better communication?</h2>
            <div className="mb-8">
              <input
                type="email"
                name="businessEmail"
                placeholder="Example: Vikram flowers"
                value={formData.businessEmail}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white rounded-md px-6 py-3 font-semibold hover:bg-blue-600 transition"
              >
                Next
              </button>
              <button
                onClick={handleSkip}
                className="text-gray-600 hover:underline flex items-center"
              >
                skip this question <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">How would you like to use our model in your business?</h2>
            <div className="mb-8">
              <input
                type="text"
                name="useCase"
                placeholder="Example: Vikram flowers"
                value={formData.useCase}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
               to="/dashboard"
                className="text-gray-600 hover:underline flex items-center"
              >
                skip this question <span className="ml-2">→</span>
              </Link>
            </div>
            <div className="mt-8">
              <Link
                to="/dashboard"
                className="w-full bg-blue-500 text-white rounded-md px-6 py-3 font-semibold hover:bg-blue-600 transition"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingSteps;