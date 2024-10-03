import { optimizeCloudinaryUrl } from "@/common/localFunction";
import { removeItemLocal } from "@/common/localStorage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import app from "@/config/initializeFirebase";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { logOut } from "@/service/account";
import useCart from "@/store/cart.store";
import { AxiosError } from "axios";
import { getAuth, signOut } from "firebase/auth";
import { LucideUser } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
const User = () => {
	const location = useLocation();
	const regex = /\b\/?admin\b/;

	const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
	const { setCarts, updateTotalCart } = useCart();
	const handleLogout = async () => {
		try {
			const data = await logOut();
			setAuthUser?.(undefined);
			setIsLoggedIn?.(false);
			removeItemLocal("token");
			signOut(getAuth(app));
			updateTotalCart(0);
			setCarts([]);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message);
			}
		}
	};
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<LucideUser strokeWidth={1.5} size={20} />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				style={{ boxShadow: "0 -4px 32px rgba(0, 0, 0, .2)" }}
				className="py-2 px-4 *:cursor-pointer  text-[#1d2129] rounded-lg border-none"
			>
				<DropdownMenuLabel>
					<div className="flex items-center gap-3">
						<div className="size-10 ">
							<img
								className="object-cover w-full h-full rounded-full"
								src={optimizeCloudinaryUrl(
									authUser?.avatarUrl ||
										"https://i.pinimg.com/564x/93/e4/e6/93e4e61c962b5cb8a9ac79626b2f242e.jpg",
									40,
									40,
								)}
								alt={authUser?.full_name}
							/>
						</div>
						<div className="">
							<p className="text-sm truncate max-w-20 ">
								{authUser?.full_name}
							</p>
							<span className="max-w-20  truncate text-xs font-normal text-[#757575] ">
								{authUser?.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator
					className={cn(!authUser?.is_admin && "hidden")}
				/>
				<DropdownMenuItem
					className={cn(
						" hidden",
						authUser?.is_admin || authUser?.is_staff ? "block" : "hidden",
					)}
				>
					<Link
						to={regex.test(location.pathname) ? "/" : "/admin"}
						className="block w-full h-full"
					>
						{regex.test(location.pathname)
							? "Trở về trang khách hàng"
							: "Vào trang quản trị"}
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator
					className={cn(regex.test(location.pathname) ? "hidden" : "block")}
				/>
				<DropdownMenuItem
					className={cn(regex.test(location.pathname) ? "hidden" : "block")}
				>
					<Link to={"/account/profile"} className="block w-full h-full">
						Tài khoản của tôi
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(regex.test(location.pathname) ? "hidden" : "block")}
				>
					<Link to={"/"} className="block w-full h-full">
						Địa chỉ
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator
					className={cn(regex.test(location.pathname) ? "hidden" : "block")}
				/>
				<DropdownMenuItem
					className={cn(regex.test(location.pathname) ? "hidden" : "block")}
				>
					<Link to={"/"} className="block w-full h-full">
						Yêu thích
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(regex.test(location.pathname) ? "hidden" : "block")}
				>
					<Link to="/account/purchase" className="block w-full h-full">
						Đơn hàng
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className="font-semibold text-red-500"
				>
					Đăng xuất
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default User;
