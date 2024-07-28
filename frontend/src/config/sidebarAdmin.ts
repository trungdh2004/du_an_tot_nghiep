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
		path: "/category",
		isVisible: true,
		label: "Danh mục",
	},
	{
		path: "/users",
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
	,
	{
		path: "/tags",
		isVisible: true,
		label: "Nhãn",
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
		],
	},
	{
		path: "/size",
		isVisible: true,
		label: "Kích thước",
	},
	{
		path: "",
		icon: LuLayoutDashboard,
		isVisible: true,
		label: "Thống kê",
	}
];


export default sidebarConfig;
