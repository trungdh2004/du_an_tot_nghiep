import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "./components/ui/sonner";

import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/clients/Home";
import { useEffect } from "react";
import useStore from "./store/home.store";

import Address from "./pages/client/address/Address";
import Login from "./pages/auth/Login";
import instance from "./config/instance";
import axios from "axios";

function App() {
	const { onUpdateCart } = useStore();

	// useEffect(() => {
	// 	(async () => {
	// 		const { data } = await axios.post(
	// 			`${process.env.SERVER_URL}/auth/refreshToken`,
	// 			{},
	// 			{
	// 				withCredentials: true,
	// 			},
	// 		);

	// 		instance.defaults.headers.common["Authorization"] =
	// 			"Bearer " + data.accessToken;
	// 	})();
	// }, []);

	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="*" element={<NotFound />}></Route>
					<Route path="address" element={<Address />} />
					
				</Route>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
				</Route>

				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Toaster richColors position="top-right" />
		</>
	);
}

export default App;
