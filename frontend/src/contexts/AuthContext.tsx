import { getItemLocal } from "@/common/localStorage";
import instance from "@/config/instance";
import { currentAccount } from "@/service/account";
import { AxiosError } from "axios";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";
export interface IUser {
	avatarUrl?: string;
	blocked_at?: boolean;
	comment_blocked_at?: boolean;
	createdAt?: string;
	email?: string;
	full_name?: string;
	is_admin?: boolean;
	updatedAt?: string;
	_id?: string;
}
interface AuthContextType {
	authUser?: IUser | undefined; // thông tin người dùng
	setAuthUser?: Dispatch<SetStateAction<IUser | undefined>>; // set thông tin người dùng
	isLoggedIn?: boolean; // trạng thái đăng nhập
	setIsLoggedIn?: Dispatch<SetStateAction<boolean>>; // set trạng thái đăng nhập
}

const AuthContext = createContext<AuthContextType>({});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authUser, setAuthUser] = useState<IUser | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
	useEffect(() => {
		(async () => {
			try {
				if (getItemLocal("token")) {
					instance.defaults.headers.common.Authorization = `Bearer ${getItemLocal("token")}`;
				}
				const { data } = await currentAccount();
				setAuthUser(data?.data);
				setIsLoggedIn(true);
				toast.success(data?.message);
			} catch (error) {
				// if (error instanceof AxiosError) {
				// 	toast.error(error.response?.data?.message);
				// }
			}
		})();
	}, []);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
