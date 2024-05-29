import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "./components/ui/sonner";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="*" element={<NotFound />}></Route>
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
