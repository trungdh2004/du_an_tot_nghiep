import LoadingFixed from "@/components/LoadingFixed";
import { currentAccount } from "@/service/account";
import { getCountMyShoppingCart, pagingCart } from "@/service/cart";
import useCart from "@/store/cart.store";
import {
	ClientToServerEvents,
	ServerToClientEvents,
} from "@/types/socket.interface";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { io, Socket } from "socket.io-client";
export interface IUser {
	avatarUrl?: string;
	blocked_at?: boolean;
	comment_blocked_at?: boolean;
	createdAt?: string;
	email?: string;
	full_name?: string;
	is_admin?: boolean;
	updatedAt?: string;
	is_staff?: boolean;
	_id?: string;
	is_shipper?: boolean;
}

interface AuthContextType {
	authUser?: IUser | undefined; // thông tin người dùng
	setAuthUser?: Dispatch<SetStateAction<IUser | undefined>>; // set thông tin người dùng
	isLoggedIn?: boolean; // trạng thái đăng nhập
	setIsLoggedIn?: Dispatch<SetStateAction<boolean>>; // set trạng thái đăng nhập
	socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const AuthContext = createContext<AuthContextType>({});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const { setCarts, setTotalCart } = useCart();
	const [authUser, setAuthUser] = useState<IUser | undefined>(undefined);
	const [socket, setSocket] =
		useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, socket };
	useEffect(() => {
		setIsLoggedIn(true);
		(async () => {
			try {
				const { data } = await currentAccount();
				const [carts, totalCountCart] = await Promise.all([
					pagingCart({ pageSize: 9999999999999 }),
					getCountMyShoppingCart(),
				]);
				setCarts(carts?.data?.data?.content);
				setTotalCart(totalCountCart?.data?.count);
				setAuthUser(data?.data);
			} catch (error) {
				setTotalCart(0);
				setCarts([]);
				setAuthUser(undefined);
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		})();

		return () => {
			if (socket) {
				socket.emit("disconnect", authUser?._id);
			}
		};
	}, []);
	if (isLoading) {
		return <LoadingFixed />;
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
