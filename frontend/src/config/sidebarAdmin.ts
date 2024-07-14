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
		children: [
			{
				path: "",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Danh sách danh mục",
			},
			{
				path: "/overview",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Danh",
			},
		],
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
		label: "Tags",
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
      ]
  },
	{
		path: "",
		icon: LuLayoutDashboard,
		isVisible: true,
		label: "Thống kê",
	},
    {
    path: "/size",
		isVisible: true,
		label: "Size",
		children: [
			{
				path: "/",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Danh sách Size",
			},
			{
				path: "/add",
				icon: LuLayoutDashboard,
				isVisible: true,
				label: "Thêm sản phẩm",
			},
		],
	},
];


export default sidebarConfig;