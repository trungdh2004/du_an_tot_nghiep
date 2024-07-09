import Notification from "@/components/client/Header/Notification";
import Search from "@/components/client/Header/Search";
import User from "@/components/client/Header/User";
import { useOpenSidebar } from "@/store/useSidebarAdmin";
import { IoMenu } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";

const HeaderAdmin = () => {
	const { setOpen } = useOpenSidebar();
	return (
		<div className="w-full lg:w-[calc(100%-280px)] h-[75px] backdrop-blur-sm fixed top-0 px-8 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div
					className="p-1 hover:bg-gray-100 rounded-full cursor-pointer block lg:hidden"
					onClick={setOpen}
				>
					<IoMenu size={20} strokeWidth={0.5} />
				</div>
				<div className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
					<Search />
				</div>
			</div>

			<div className="flex items-center gap-2">
				<div className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
					<Notification />
				</div>
				<div className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
					<User />
				</div>
			</div>
		</div>
	);
};

export default HeaderAdmin;
