import { useNavigate, useSearchParams } from "react-router-dom";

export const useRouterHistory = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const routerHistory = searchParams.get("routerHistory");
	if (routerHistory) {
		navigate(routerHistory);
	} else {
		navigate("/");
	}
};
export const useCurrentRouteAndNavigation = () => {
	const navigate = useNavigate();
	const currentRouter = location.pathname;
	navigate(`/auth/login?routerHistory=${currentRouter}`);
};
