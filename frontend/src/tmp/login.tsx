import React from "react";

const Login = () => {
  return (
    <div className="w-[1120px] m-auto">
      <div className="flex gap-2 pb-24 m-3">
        <div className="w-5 h-5 bg-[#9900FF] rounded-full"></div>
        <div className="w-5 h-9 bg-[#FF0099] rounded-full "></div>
      </div>
      <div className="w-80 h-64 mx-auto">
        <h1 className="text-center font-medium text-5xl">Sign In</h1>
        <h6 className=" pt-8 ">Username</h6>
        <input
          type="text"
          className="w-80 h-12 border mt-5 rounded-md mb-10 pl-2"
        />
        <button
          type="submit"
          className="w-80 h-12 bg-[#9900FF] rounded-full text-white hover:bg-[#9900CC] transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;