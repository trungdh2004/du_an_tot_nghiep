import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/auth";
import { LucideShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import Search from "./Search";
import User from "./User";
const Actions = () => {
	const { isLoggedIn, authUser } = useAuth();
	return (
		<div className="flex items-center justify-center max-h-8 gap-1 md:gap-4  *:rounded-full  *:cursor-pointer">
			<div className="">
				<Search />
			</div>
			<div className="">
				<Notification />
			</div>
			<div className="hover:bg-[#919eab27] p-1">
				<LucideShoppingCart strokeWidth={1.5} size={20} />
			</div>

			{isLoggedIn && authUser?._id ? (
				<div className="hover:bg-[#919eab27] p-1 ">
					<User />
				</div>
			) : (
				<Link to={"/auth/login"} className="hidden md:block">
					<Button className=" rounded h-8 text-xs px-3" size={"sm"}>
						Đăng nhập
					</Button>
				</Link>
			)}
		</div>
	);
};

export default Actions;
