import React, { useState, } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (isSignIn) {
      console.log("Logging in with:", formData.email, formData.password);
    } else {
      console.log("Registering with:", formData);
    }

    // Clear form after submit (optional)
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowConfirm(false);
  };

  const navigate = useNavigate();
  return (

    <div className="min-h-[500px] mt-4 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border-2 bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h2>
          <div className="w-10 h-1 bg-gray-800 mt-2 mx-auto rounded-full"></div>
        </div>

        {/* Name (only in sign-up) */}
        {!isSignIn && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {/* Confirm Password (only in sign-up) */}
        {!isSignIn && (
          <div className="relative w-full">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={() =>(navigate('/'))}
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition"
        >
          {isSignIn ? 'Login' : 'Register'}
        </button>

        {/* Toggle Sign In/Up */}
        <p className="text-center text-sm text-gray-500">
          {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsSignIn((prev) => !prev)}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
