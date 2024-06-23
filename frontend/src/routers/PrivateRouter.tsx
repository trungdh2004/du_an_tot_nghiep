import { useAuth } from "@/hooks/auth";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type PrivateRouterType = {
	children: ReactNode;
};
const PrivateRouter = ({ children }: PrivateRouterType) => {
	const { authUser, isLoggedIn } = useAuth();
	return isLoggedIn && authUser?.is_admin ? (
		children
	) : (
		<Navigate to={"/auth/login"} />
	);
};

export default PrivateRouter;
