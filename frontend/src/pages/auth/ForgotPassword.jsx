import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaKey, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [demoOTP, setDemoOTP] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('❌ Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('❌ Please enter a valid email');
      return;
    }

    setIsLoading(true);
    console.log('🔄 Sending OTP request to:', `${API_URL}/auth/forgot-password`);
    console.log('📧 Email:', email);

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      
      console.log('✅ Response received:', response.data);
      
      if (response.data.status === 'success') {
        toast.success('✅ OTP sent successfully!');
        
        // For demo, show OTP in toast and state
        if (response.data.demo && response.data.demo.otp) {
          const otpCode = response.data.demo.otp;
          setDemoOTP(otpCode);
          console.log('🔑 OTP Code:', otpCode);
          
          // Show OTP in multiple ways
          toast.info(`📧 Your OTP: ${otpCode}`, { 
            autoClose: 15000,
            position: 'top-center'
          });
          
          alert(`✅ OTP Sent!\n\nYour OTP Code: ${otpCode}\n\nCheck:\n1. This popup\n2. Backend console\n3. Yellow box on next screen`);
        }
        
        setStep(2);
      }
    } catch (error) {
      console.error('❌ Send OTP error:', error);
      console.error('Error details:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 'Failed to send OTP. Please try again.';
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error('❌ Please enter 6-digit OTP');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
      
      if (response.data.status === 'success') {
        toast.success('✅ OTP verified successfully!');
        setStep(3);
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      const message = error.response?.data?.message || 'Invalid OTP';
      const attemptsLeft = error.response?.data?.attemptsLeft;
      
      if (attemptsLeft !== undefined) {
        toast.error(`❌ ${message}. ${attemptsLeft} attempts left`);
      } else {
        toast.error(`❌ ${message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast.error('❌ Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('❌ Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { 
        email, 
        newPassword 
      });
      
      if (response.data.status === 'success') {
        toast.success('✅ Password reset successfully!');
        setStep(4);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      const message = error.response?.data?.message || 'Failed to reset password';
      toast.error(`❌ ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-white/20 relative z-10">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                step >= s 
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' 
                  : 'bg-white/20 text-white/50'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 4 && (
                <div className={`h-1 w-full mt-5 -ml-full ${
                  step > s ? 'bg-green-500' : 'bg-white/20'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            {step === 1 && <FaEnvelope className="text-white text-3xl" />}
            {step === 2 && <FaKey className="text-white text-3xl" />}
            {step === 3 && <FaLock className="text-white text-3xl" />}
            {step === 4 && <FaCheckCircle className="text-white text-3xl" />}
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {step === 1 && 'Forgot Password?'}
            {step === 2 && 'Verify OTP'}
            {step === 3 && 'Reset Password'}
            {step === 4 && 'Success!'}
          </h2>
          <p className="text-indigo-200">
            {step === 1 && 'Enter your email to receive OTP'}
            {step === 2 && 'Enter the 6-digit code sent to your email'}
            {step === 3 && 'Create a new strong password'}
            {step === 4 && 'Your password has been reset successfully'}
          </p>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 text-lg" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition backdrop-blur-sm font-medium"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Quick Test Button */}
            <div className="bg-green-500/20 border-2 border-green-400 rounded-xl p-4">
              <p className="text-sm font-bold text-green-200 mb-2 text-center">
                🎯 Quick Test
              </p>
              <button
                type="button"
                onClick={() => setEmail('jobseeker@test.com')}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition"
              >
                Use Test Email (jobseeker@test.com)
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending OTP...
                </span>
              ) : (
                '📧 Send OTP'
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 text-lg" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition backdrop-blur-sm font-bold text-2xl text-center tracking-widest"
                  placeholder="000000"
                  required
                />
              </div>
              {demoOTP && (
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-xl p-3 mt-3">
                  <p className="text-xs text-yellow-200 text-center font-bold">
                    📧 OTP sent to: {email}
                  </p>
                  <p className="text-sm text-yellow-100 text-center font-bold mt-1">
                    Your OTP: <span className="text-2xl tracking-wider">{demoOTP}</span>
                  </p>
                  <p className="text-xs text-yellow-200 text-center mt-1">
                    Check backend console for email details
                  </p>
                </div>
              )}
              <p className="text-xs text-indigo-200 mt-2 text-center">
                💡 OTP is valid for 10 minutes
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-xl disabled:opacity-50 text-lg"
            >
              {isLoading ? 'Verifying...' : '✓ Verify OTP'}
            </button>

            <button
              type="button"
              onClick={() => toast.info('OTP resent!')}
              className="w-full text-indigo-200 hover:text-white font-semibold transition"
            >
              Didn't receive? Resend OTP
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition backdrop-blur-sm font-medium"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition backdrop-blur-sm font-medium"
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition transform hover:scale-105 shadow-xl disabled:opacity-50 text-lg"
            >
              {isLoading ? 'Resetting...' : '🔒 Reset Password'}
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center space-y-6">
            <div className="bg-green-500/20 border-2 border-green-400 rounded-2xl p-6">
              <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Password Reset Complete!</h3>
              <p className="text-indigo-200">
                Your password has been successfully reset. You can now login with your new password.
              </p>
            </div>

            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-xl text-lg"
            >
              ← Go to Login
            </Link>
          </div>
        )}

        {step < 4 && (
          <div className="mt-8 text-center">
            <Link to="/login" className="text-indigo-200 font-semibold hover:text-white transition flex items-center justify-center gap-2">
              ← Back to Login
            </Link>
          </div>
        )}

        {/* Developer Credit */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-indigo-200 text-sm">
            Developed by <span className="font-bold text-white">BHUPESH INDURKAR</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
