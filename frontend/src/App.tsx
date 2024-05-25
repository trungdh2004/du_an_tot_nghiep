import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "./components/ui/sonner";
import { Login, Register } from "./pages/auth";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}></Route>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
			<Toaster richColors />
		</>
	);
}

export default App;
