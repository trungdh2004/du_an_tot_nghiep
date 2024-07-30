import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AdminRouter from "./routers/AdminRouter";
import AuthRouter from "./routers/AuthRouter";
import MainRouter from "./routers/MainRouter";
import ProgessBarLoading from "./components/common/ProgessBarLoading";
const router = createBrowserRouter([
	...MainRouter,
	...AuthRouter,
	...AdminRouter,
]);
const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<ProgessBarLoading />
		</>
	);
};
export default App;
