import SidebarShipper from "@/components/shipper/sidebar/SidebarShipper";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCartPlus, FaShoppingCart, FaRegChartBar } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const ShipperLayout = () => {
	return (
		<div>
			<div className="scroll-custom flex bg-main min-h-[100vh]">
				<div className="fixed top-0 left-0 bottom-0 hidden lg:block">
					<SidebarShipper />
				</div>
				<div className="pb-10 lg:pb-0 lg:pl-[280px] w-full ">
					{/* header */}
					<Outlet />
				</div>
				<div className="w-full fixed bottom-0 left-0 h-10 lg:hidden grid grid-cols-5 bg-white  border-t border-t-blue-500 shadow">
					<Link to={"/shipper/orderNew"}>
						<TooltipComponent label="Đơn hàng mới">
							<div className="w-full h-full hover:bg-blue-100 cursor-pointer flex items-center justify-center">
								<FaCartPlus size={20} className="text-blue-500" />
							</div>
						</TooltipComponent>
					</Link>
					<TooltipComponent label="Đơn hàng đã giao">
						<div className="w-full h-full hover:bg-blue-100 cursor-pointer flex items-center justify-center">
							<FaShoppingCart size={20} className="text-blue-500" />
						</div>
					</TooltipComponent>

					<Link to={"/shipper"}>
						<div className="w-full h-full relative flex bottom-4 justify-center">
							<TooltipComponent label="Bản đồ">
								<div className="absolute cursor-pointer size-12 rounded-full bg-blue-500 flex items-center justify-center">
									<FaMapMarkerAlt size={20} color="white" />
								</div>
							</TooltipComponent>
						</div>
					</Link>
					<TooltipComponent label="Thống kê">
						<div className="w-full h-full hover:bg-blue-100 cursor-pointer flex items-center justify-center">
							<FaRegChartBar size={20} className="text-blue-500" />
						</div>
					</TooltipComponent>
					<TooltipComponent label="trang chủ">
						<div className="w-full h-full hover:bg-blue-100 cursor-pointer flex items-center justify-center">
							<FaUser size={20} className="text-blue-500" />
						</div>
					</TooltipComponent>
				</div>
			</div>

			<ScrollRestoration />

		</div>
	);
};

export default ShipperLayout;
