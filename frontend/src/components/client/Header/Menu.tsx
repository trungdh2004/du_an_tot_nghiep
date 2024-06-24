import { MdKeyboardArrowDown } from "react-icons/md";

const Menu = () => {
	return (
		<div className="hidden md:block">
			<ul className="text-black font-medium flex items-center justify-center gap-x-5">
				<li>Trang chủ</li>
				<li className="relative group flex items-center">
					Sản phẩm{" "}
					<MdKeyboardArrowDown className="ml-1 group-hover:rotate-180 origin-center  group-hover:mt-2 transition-all " />
					<ul className="group-hover:block hidden sub-menu absolute w-52 left-1/2 -translate-x-1/2 top-11 bg-white  shadow *:cursor-pointer  *:px-5 *:py-2 *:text-nowrap rounded-md ">
						<li className="hover:bg-[#919eab14]">Áo nike</li>
						<li className="hover:bg-[#919eab14]">Áo nike</li>
						<li className="hover:bg-[#919eab14]">Áo nike</li>
						<li className="hover:bg-[#919eab14]">Áo nike</li>
					</ul>
				</li>
				<li>Bài viết</li>
				<li>Liên hệ</li>
				<li>Giới thiệu</li>
			</ul>
		</div>
	);
};

export default Menu;
