import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { Toaster } from "./components/ui/sonner";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}></Route>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="login" element={<></>} />
					<Route path="register" element={<></>} />
				</Route>
			</Routes>
			<Toaster richColors />
		</>
	);
}

export default App;
