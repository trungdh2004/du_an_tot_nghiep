import { getItemLocal } from "@/common/localStorage";
import LoadingFixed from "@/components/LoadingFixed";
import instance from "@/config/instance";
import { currentAccount } from "@/service/account";
import { getCountMyShoppingCart, pagingCart } from "@/service/cart";
import useCart from "@/store/cart.store";
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
	is_staff?: boolean;
	_id?: string;
	is_shipper?: boolean;
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
	const { setCarts, setTotalCart } = useCart();
	const [authUser, setAuthUser] = useState<IUser | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
	useEffect(() => {
		setIsLoggedIn(true);
		(async () => {
			try {
				const [account, carts, cartCount] = await Promise.all([
					currentAccount(),
					pagingCart({ pageSize: 999999999999999 }),
					getCountMyShoppingCart(),
				]);
				setCarts(carts?.data?.data?.content);
				setTotalCart(cartCount?.data?.count);
				setAuthUser(account?.data?.data);
			} catch (error) {
				setTotalCart(0);
				setCarts([]);
				setAuthUser(undefined);
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);
	if (isLoading) {
		return <LoadingFixed />;
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
