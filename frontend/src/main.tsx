import "@/styles/LoadingFixed.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "react-quill/dist/quill.snow.css";
import "./index.css";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<RouterProvider router={router} />
			<Toaster richColors position="top-right" />
		</AuthProvider>
	</QueryClientProvider>,
);
