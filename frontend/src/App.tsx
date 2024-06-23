import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import AdminRouter from "./routers/AdminRouter";
import AuthRouter from "./routers/AuthRouter";
import MainRouter from "./routers/MainRouter";
const router = createBrowserRouter([
	...MainRouter,
	...AuthRouter,
	...AdminRouter,
]);

export default router;
