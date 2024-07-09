import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";

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
		path: "/blogs",
		isVisible: true,
		label: "Bài viết",
		children: [
			{
				path: "/new-blog",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Tạo bài viết",
			},
			{
				path: "/",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Danh sách bài viết",
			},
			{
				path: "/my-blog",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Bài viết của tôi",
			},
			{
				path: "/remove-blog",
				icon: MdOutlinePostAdd,
				isVisible: true,
				label: "Bài viết đã xoá",
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
		path: "",
		icon: LuLayoutDashboard,
		isVisible: true,
		label: "Thống kê",
	},
];
export default sidebarConfig;
