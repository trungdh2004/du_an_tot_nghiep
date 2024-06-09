import { removeItemLocal } from "@/common/localStorage";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { logOut } from "@/service/account";
import { AxiosError } from "axios";
import { LucideUser } from "lucide-react";
import { toast } from "sonner";
const User = () => {
	const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
	const handleLogout = async () => {
		try {
			const data = await logOut();
			console.log(data);
			setAuthUser?.(undefined);
			setIsLoggedIn?.(false);
			removeItemLocal("token");
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message);
			}
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="border-none outline-none">
				<LucideUser strokeWidth={1.5} className="text-xl md:text-2xl" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				style={{ boxShadow: "0 -4px 32px rgba(0, 0, 0, .2)" }}
				className="absolute right-0 top-2  py-2 px-4 *:cursor-pointer  text-[#1d2129] rounded-lg border-none"
			>
				<DropdownMenuLabel>
					<div className="flex items-center gap-3">
						<div className="size-10 ">
							<img
								className="w-full h-full object-cover rounded-full"
								src={
									authUser?.avatarUrl ||
									"https://i.pinimg.com/564x/06/25/9f/06259fed99c906d43f691b1d1d4956cc.jpg"
								}
								alt={authUser?.full_name}
							/>
						</div>
						<div className="">
							<p className="text-sm">{authUser?.full_name}</p>
							<span className="w-24 line-clamp-1 text-xs font-normal text-[#757575] ">
								{authUser?.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Tài khoản của tôi</DropdownMenuItem>
				<DropdownMenuItem>Địa chỉ</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Yêu thích</DropdownMenuItem>
				<DropdownMenuItem>Đơn hàng</DropdownMenuItem>
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
