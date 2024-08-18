import HeaderAdmin from "@/components/admin/header/HeaderAdmin";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import SidebarShipper from "@/components/shipper/sidebar/SidebarShipper";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const ShipperLayout = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div className="scroll-custom flex bg-main min-h-[100vh] overflow-y-auto">
				{/* <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
					<SheetContent className="p-0 !max-w-[300px] z-[101]" side={"left"}>
						<SidebarShipper />
					</SheetContent>
				</Sheet> */}
				<div className="fixed top-0 left-0 bottom-0 hidden lg:block">
					<SidebarShipper />
				</div>
				<div className="pb-10 lg:pl-[280px] w-full">
					{/* header */}
						<Outlet />
				</div>
				<div className="w-full fixed bottom-0 left-0 h-10 bg-blue-400"></div>
			</div>
		</div>
	);
};

export default ShipperLayout;
