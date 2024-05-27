import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "./components/ui/sonner";

import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

import Address from "./pages/client/address/Address";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="*" element={<NotFound />}></Route>
					<Route path="address" element={<Address />} />
				</Route>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>

				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Toaster richColors />
		</>
	);
}

export default App;
