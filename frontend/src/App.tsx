import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AdminRouter from "./routers/AdminRouter";
import AuthRouter from "./routers/AuthRouter";
import MainRouter from "./routers/MainRouter";
import ProgessBarLoading from "./components/common/ProgessBarLoading";
import LoadingProvider from "./components/common/LoadingProvider";
import { useLoadingModal } from "./store/useLoadingModal";
const router = createBrowserRouter([
	...MainRouter,
	...AuthRouter,
	...AdminRouter,
]);
const App = () => {
	const { isOpen } = useLoadingModal();

	return (
		<>
			<RouterProvider router={router} />
			<ProgessBarLoading />
			{isOpen && <LoadingProvider />}
		</>
	);
};
export default App;
