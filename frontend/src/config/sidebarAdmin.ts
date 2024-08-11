import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";

const sidebarConfig: any[] = [
	{
		path: "",
		icon: LuLayoutDashboard,
		isVisible: true,
		isAdmin: false,
		label: "Thống kê",
	},
	{
		path: "/category",
		isVisible: true,
		isAdmin: false,
		label: "Danh mục",
	},
	{
		path: "/users",
		isVisible: true,
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
	,
	{
		path: "/tags",
		isVisible: true,
		label: "Nhãn",
		isAdmin: false,

	},
	{
		path: "/product",
		isVisible: true,
		label: "Sản phẩm",
		isAdmin: false,
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
		isAdmin: false,

	},
	{
		path: "/blogs",
		isVisible: true,
		label: "Bài viết",
		isAdmin: false,
		children: [
			{
				path: "/",
				icon: LuLayoutDashboard,
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
		path: "/size",
		isVisible: true,
		label: "Kích thước",
		isAdmin: false,
	},
	{
		path: "/revenue",
		icon: LuLayoutDashboard,
		isVisible: true,
		label: "Doanh thu",
		isAdmin: true,

	}
];


export default sidebarConfig;
