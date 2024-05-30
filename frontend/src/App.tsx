import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "./components/ui/sonner";

import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/clients/Home";
import { useEffect } from "react";
import useStore from "./store/home.store";

import Address from "./pages/client/address/Address";
import Login from "./pages/auth/login";

function App() {
	const { onUpdateCart } = useStore();

	useEffect(() => {
		const data = {
			quantity: 1,
			name: "sp1",
		};

		onUpdateCart(data);
	}, []);

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
				</Route>

				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Toaster richColors position="top-right" />
		</>
	);
}

export default App;
