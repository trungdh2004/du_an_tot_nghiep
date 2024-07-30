import { NavLink } from "react-router-dom";

const Menu = () => {
	return (
		<div className="hidden md:block">
			<ul className="text-black font-medium flex items-center justify-center gap-x-5 *:py-0.5 *:border-b-[3px] *:border-transparent transition-all ">
				<li className=" hover:border-blue-500 hover:text-blue-500 has-[.active]:border-blue-500 has-[.active]:text-blue-500">
					<NavLink to={"/"}>Trang chủ</NavLink>
				</li>
				<li className="relative group flex items-center hover:border-blue-500 hover:text-blue-500 has-[.active]:border-blue-500 has-[.active]:text-blue-500 cursor-pointer">
					<NavLink to={"/shop"}>Sản phẩm </NavLink>
					<ul className="text-black group-hover:block hidden sub-menu absolute w-52 left-1/2 -translate-x-1/2 top-11 bg-white  shadow *:cursor-pointer  *:px-5 *:py-2 *:text-nowrap rounded-md ">
						<li className="hover:bg-[#919eab14]">Áo nike</li>
						<li className="hover:bg-[#919eab14]">Áo nike</li>
						<li className="hover:bg-[#919eab14]">Áo nike</li>
						<li className="hover:bg-[#919eab14]">Áo nike</li>
					</ul>
				</li>
				<li className="hover:border-blue-500 hover:text-blue-500 has-[.active]:border-blue-500 has-[.active]:text-blue-500">
					<NavLink to={"/blogs"}>Bài viết</NavLink>
				</li>
				<li className="hover:border-blue-500 hover:text-blue-500 has-[.active]:border-blue-500 has-[.active]:text-blue-500">
					<NavLink to={"/contacts"}>Liên hệ </NavLink>
				</li>
				<li className="hover:border-blue-500 hover:text-blue-500 has-[.active]:border-blue-500 has-[.active]:text-blue-500">
					<NavLink to={"/introduce"}>Giới thiệu</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
