import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";

const sidebarConfig: any[] = [
	{
		path: "",
		icon: LuLayoutDashboard,
		isVisible: true,
		label: "Thống kê",
	},
	{
		path: "/user",
		isVisible: true,
		label: "Người dùng",
		children: [
			{
				path: "",
				icon: FaUsers,
				isVisible: true,
				label: "Danh sách",
			},
			{
				path: "/staff",
				icon: FaUsersCog,
				isVisible: true,
				label: "Danh sách nhân viên",
			},
		],
	},
	{
		path: "/product",
		isVisible: true,
		label: "Sản phẩm",
		children: [
			{
				path: "/",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Danh sách sản phẩm",
			},
			{
				path: "/add",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Thêm sản phẩm",
			},
		],
	},
	{
		path: "/blog",
		isVisible: true,
		label: "Bài viết",
		children: [
			{
				path: "",
				icon: FaUsers,
				isVisible: true,
				label: "Danh sách bài viết",
			},
			{
				path: "/staff",
				icon: FaUsersCog,
				isVisible: true,
				label: "Danh sách nhân viên",
			},
		],
	},
	{
		path: "/product",
		isVisible: true,
		label: "Sản phẩm",
		children: [
			{
				path: "/",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Danh sách sản phẩm",
			},
			{
				path: "/add",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Thêm sản phẩm",
			},
		],
	},
	{
		path: "/color",
		isVisible: true,
		label: "Màu sắc",
		children: [
			{
				path: "/",
				icon: FaUsers,
				isVisible: true,
				label: "Danh sách màu sắc",
			},
			{
				path: "/add",
				icon: FaUsersCog,
				isVisible: true,
				label: "Thêm màu sắc",
			},
		],
	},
	{
		path: "/product",
		isVisible: true,
		label: "Sản phẩm",
		children: [
			{
				path: "/",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Danh sách sản phẩm",
			},
			{
				path: "/add",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Thêm sản phẩm",
			},
		],
	},
	{
		path: "",
		icon: LuLayoutDashboard,
		isVisible: true,
		label: "Thống kê",
	},
];
export default sidebarConfig;
