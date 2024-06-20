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
import ProductDetail from "./pages/clients/product/ProductDetail";
import LayoutAdmin from "./layout/LayoutAdmin";
import { DataTableDemo } from "./pages/admin/users/UserHome";

function App() {

  const [loading, setLoading] = useState(false)
  
	useEffect(() => {
		(async () => {
			const { data } = await axios.post(
				`${process.env.SERVER_URL}/auth/refreshToken`,
				{},
				{
					withCredentials: true,
				},
			);
			const accessToken = data.accessToken;

			instance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
      setLoading(true)
		})();
  }, []);
  if (!loading) {
		return "loading";
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="*" element={<NotFound />}></Route>
					<Route path="address" element={<Address />} />
					<Route path="product/:id" element={<ProductDetail />} />
				</Route>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
				</Route>
				<Route>
					<Route path="/admin" element={<LayoutAdmin />}>
						<Route path="users" element={<DataTableDemo/>} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Toaster richColors position="top-right" />
		</>
	);
}

export default App;
