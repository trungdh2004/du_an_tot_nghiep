import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="w-full min-h-[100vh]">
			{/*  */}

			<Outlet />
		</div>
	);
};

export default AuthLayout;
