import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "./components/ui/sonner";

import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/clients/Home";
import { useEffect, useState } from "react";
import useStore from "./store/home.store";

import Login from "./pages/auth/Login";
import Address from "./pages/clients/address/Address";
import EditAddress from "./pages/clients/address/EditAddress";
import instance from "./config/instance";
import axios from "axios";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

function App() {
	const { onUpdateCart } = useStore();
	const [loading, setLoading] = useState(false);

	// 	useEffect(() => {
	// 		(async () => {
	// 			const { data } = await axios.post(
	// 				`${process.env.SERVER_URL}/auth/refreshToken`,
	// 				{},
	// 				{
	// 					withCredentials: true,
	// 				},
	// 			);
	// 			const accessToken = data.accessToken;

	// 			instance.defaults.headers.common["Authorization"] =
	//         `Bearer ${accessToken}`;
	//       setLoading(true)
	// 		})();
	//   }, []);

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
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="add" element={<Dashboard />} />
					<Route path="user" element={<Dashboard />} />
					<Route path="user/staff" element={<Dashboard />} />
				</Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Toaster richColors position="top-right" />
		</>
	);
}

export default App;
