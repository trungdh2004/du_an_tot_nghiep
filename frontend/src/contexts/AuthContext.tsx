import { getItemLocal } from "@/common/localStorage";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
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
		const user = getItemLocal("user");
		if (user) {
			setAuthUser(user);
			setIsLoggedIn(true);
		} else {
			setAuthUser(undefined);
			setIsLoggedIn(false);
		}
	}, []);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
