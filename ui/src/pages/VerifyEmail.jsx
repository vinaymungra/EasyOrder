import React, { useState } from 'react';
import OtpInput from "react-otp-input";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signUp } from '../services/middlewares/owner';

const VerifyEmail = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {signupData}=useSelector((state)=>state.owner);

  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(signupData,otp,navigate))
    console.log(otp);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 text-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-orange-400">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Verify Your Email</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="w-16 h-16 text-center bg-orange-100 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-xl"
              />
            )}
            containerStyle="flex justify-between mb-4"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 rounded-lg text-white font-semibold transition duration-300"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail;
