import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import ForgotPassword from "./pages/auth/ForgotPassword";
import Register from "./pages/auth/Register";
import Home from "./pages/clients/Home";
import NotFound from "./pages/NotFound";

import Login from "./pages/auth/Login";
import Address from "./pages/clients/address/Address";

function App() {
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
