import React from "react";
import { Outlet } from "react-router-dom";

const LayoutChat = () => {
	return (
		<div className="grid grid-cols-3 gap-4 h-[calc(100vh-120px)]">
			<div className="col-span-1 bg-white border box-shadow rounded-md h-full">
				<header className="flex items-center justify-between w-full p-3 border-b h-[60px]">
					<p className="text-xl font-semibold text-blue-500">Trò chuyện</p>
				</header>
			</div>
			<div className="col-span-2 bg-white border box-shadow rounded-md h-full">
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutChat;
