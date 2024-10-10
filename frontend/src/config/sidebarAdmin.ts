import { CiShoppingTag } from "react-icons/ci";
import { FaBox, FaUsers } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { HiOutlineInboxArrowDown, HiOutlineInboxStack, HiOutlineNewspaper, HiOutlineSquaresPlus, HiOutlineTicket } from "react-icons/hi2";
import { IoColorPaletteOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuUserCircle } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { PiResizeLight } from "react-icons/pi";

const sidebarConfig: any[] = [
	{
		path: "",
		icon: GrAnalytics ,
		isVisible: true,
		isAdmin: false,
		label: "Thống kê",
	},
	
	
	{
		path: "/users",
		isVisible: true,
		icon:LuUserCircle, 
		label: "Người dùng",
		isAdmin: false,
		children: [
			{
				path: "",
				icon: FaUsers,
				isVisible: true,
				label: "Danh sách",
			},
			// {
			// 	path: "/staff",
			// 	icon: FaUsersCog,
			// 	isVisible: true,
			// 	label: "Danh sách nhân viên",
			// },
		],
	},
	{
		path: "/product",
		isVisible: true,
		label: "Sản phẩm",
		isAdmin: false,
		children: [
			{
				path: "/category",
				icon: HiOutlineSquaresPlus ,
				isVisible: true,
				isAdmin: false,
				label: "Danh mục",
			},
			{
				path: "/voucher",
				icon:HiOutlineTicket, 
				isVisible: true,
				isAdmin: false,
				label: "Mã giảm giá",
			},
			{
				path: "/",
				icon: HiOutlineInboxStack,
				isVisible: true,
				label: "Danh sách sản phẩm",
			},
			{
				path: "/add",
				icon: HiOutlineInboxArrowDown,
				isVisible: true,
				label: "Thêm sản phẩm",
			},
		],
	},
	{
		path: "/variant",
		isVisible: true,
		label: "Biến thể",
		isAdmin: false,
		children: [
			{
				path: "/color",
				icon:IoColorPaletteOutline ,
				isVisible: true,
				label: "Màu sắc",
				isAdmin: false,
			},
			{
				path: "/size",
				icon:PiResizeLight ,
				isVisible: true,
				label: "Kích thước",
				isAdmin: false,
			},
		],
	},
	
	{
		path: "/blogs",
		isVisible: true,
		label: "Bài viết",
		isAdmin: false,
		children: [
			{
				icon:CiShoppingTag ,
				path: "/tags",
				isVisible: true,
				label: "Nhãn",
				isAdmin: false,
			},
			{
				path: "/",
				icon: HiOutlineNewspaper ,
				isVisible: true,
				label: "Danh sách bài viết",
			},
			{
				path: "/new-blog",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Tạo bài viết",
			},
			{
				path: "/my-blogs",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Bài viết của tôi",
			},
		],
	},
	
	{
		path: "/revenue",
		icon: LuLayoutDashboard,
		isVisible: true,
		label: "Doanh thu",
		isAdmin: true,
	},
	{
		path: "/order",
		icon: FaBox,
		isVisible: true,
		label: "Đơn hàng",
		isAdmin: false,
		children: [
			{
				path: "",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Đơn hàng chờ xác nhận",
			},
			{
				path: "/orderconfirm",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Đơn hàng xác nhận",
			},
			{
				path: "/orderconfirmShipper",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Đơn hàng chọn vận chuyển",
			},
			{
				path: "/ordership",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Đơn giao hàng ",
			},
			{
				path: "/ordershipsuccess",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Đơn giao hàng thành công",
			},
			{
				path: "/orderreceived",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Đơn đã nhận",
			},
			{
				path: "/ordercancel",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Đơn đã hủy",
			},
		],
	},
	{
		path: "/location",
		isVisible: true,
		label: "Vị trí cửa hàng",
		isAdmin: false,
	},
];

export default sidebarConfig;
