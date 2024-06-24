import Actions from "./Actions";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
const Header = () => {
	return (
		<header className="backdrop-blur-md  fixed top-0 inset-x-0  padding">
			<div className="">
				<div className="flex h-16 items-center justify-between">
					<div className="block md:hidden">
						<MenuMobile />
					</div>
					<div className="absolute top-1/2 max-sm:-translate-x-1/2 left-1/2 max-sm:-translate-y-1/2 sm:static sm:flex sm:items-center   ">
						<a className="block " href="#">
							Logo
						</a>
					</div>
					<Menu />
					<Actions />
				</div>
			</div>
		</header>
	);
};

export default Header;
