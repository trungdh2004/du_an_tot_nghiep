import { NavLink } from "react-router-dom";

const Menu = () => {
	return (
		<div className="hidden md:block">
			<ul className="text-black flex items-center justify-center gap-x-5 *:py-0.5 *:border-b-[3px] *:border-transparent transition-all uppercase font-semibold text-[14px]">
				<li className="relative cursor-pointer">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[4px] before:bg-[#e46969] before:rounded-full before:transition-all before:duration-300 ${isActive ? "before:w-full" : "before:w-0 hover:before:w-full"}`
						}
					>
						TRANG CHỦ
					</NavLink>
				</li>
				<li className="relative cursor-pointer">
					<NavLink
						to="/shop"
						className={({ isActive }) =>
							`before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[4px] before:bg-[#e46969] before:rounded-full before:transition-all before:duration-300 ${isActive ? "before:w-full" : "before:w-0 hover:before:w-full"}`
						}
					>
						SẢN PHẨM
					</NavLink>
				</li>
				<li className="relative cursor-pointer">
					<NavLink
						to="/blogs"
						className={({ isActive }) =>
							`before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[4px] before:bg-[#e46969] before:rounded-full before:transition-all before:duration-300 ${isActive ? "before:w-full" : "before:w-0 hover:before:w-full"}`
						}
					>
						TIN TỨC
					</NavLink>
				</li>
				<li className="relative cursor-pointer">
					<NavLink
						to="/contacts"
						className={({ isActive }) =>
							`before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[4px] before:bg-[#e46969] before:rounded-full before:transition-all before:duration-300 ${isActive ? "before:w-full" : "before:w-0 hover:before:w-full"}`
						}
					>
						LIÊN HỆ
					</NavLink>
				</li>
				<li className="relative cursor-pointer">
					<NavLink
						to="/introduce"
						className={({ isActive }) =>
							`before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[4px] before:bg-[#e46969] before:rounded-full before:transition-all before:duration-300 ${isActive ? "before:w-full" : "before:w-0 hover:before:w-full"}`
						}
					>
						GIỚI THIỆU
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Menu;

// hover:border-blue-500 hover:text-blue-500 has-[.active]:border-blue-500 has-[.active]:text-blue-500 cursor-pointer
