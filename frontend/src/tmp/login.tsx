import React from "react";

const Login = () => {
  return (
    <div className="w-full max-w-[1120px] mx-auto py-10">
      {/* Header Icons */}
      <div className="flex gap-2 mb-10 px-4">
        <div className="w-5 h-5 bg-[#9900FF] rounded-full"></div>
        <div className="w-5 h-9 bg-[#FF0099] rounded-full"></div>
      </div>

      {/* Login Form */}
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
        <h1 className="text-center text-5xl font-medium mb-8">Sign In</h1>

        {/* Username Input */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-semibold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full h-12 border rounded-md pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9900FF] transition"
          />
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full h-12 border rounded-md pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9900FF] transition"
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full h-12 bg-[#9900FF] text-white rounded-full font-semibold hover:bg-[#9900CC] transition-colors"
        >
          Sign In
        </button>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
              alt="Google Logo"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
              alt="Facebook Logo"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
