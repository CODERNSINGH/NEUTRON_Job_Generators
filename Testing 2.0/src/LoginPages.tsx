import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusinessSignup from "./Login/BusinessSignup";
import InfluencerSignup from "./Login/InfluencerSignup";
import { LogIn } from "lucide-react";
import Login from "./Login/Login";
import OnboardingSteps from "./Login/OnboardingSteps";
import RegistrationOptions from './Login/RegistrationOptions';

export default function LoginPages() {
  return (
    <div>
        <BrowserRouter>
              <Routes>
                
                <Route path="/" element={<RegistrationOptions/>} />
                <Route path="/busslog" element={<BusinessSignup/>} />
                <Route path="/indlog" element={<InfluencerSignup/>} />
                <Route path="/ques" element={<OnboardingSteps/>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
            </BrowserRouter>
        
                
                {/* */}
                
                
    </div>
  )
}
 