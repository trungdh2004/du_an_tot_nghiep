import Actions from "./Actions";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
const Header = () => {
	return (
		<header className="backdrop-blur-md  fixed top-0 inset-x-0  padding z-50">
			<div className="">
				<div className="flex h-16 items-center justify-between">
					<div className="block md:hidden">
						<MenuMobile />
					</div>
					<div className="absolute top-1/2 max-sm:-translate-x-1/2 left-1/2 max-sm:-translate-y-1/2 sm:static sm:flex sm:items-center   ">
						<svg xmlns="http://www.w3.org/2000/svg" width={150} height={50} viewBox="0 0 300 100">
							<defs>
								<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop
										offset="0%"
										style={{ stopColor: "#4ecdc4", stopOpacity: 1 }}
									/>
									<stop
										offset="100%"
										style={{ stopColor: "#ff6b6b", stopOpacity: 1 }}
									/>
								</linearGradient>
							</defs>
							<rect width="300" height="100" fill="none" />
							<text x="15" y="65" fontFamily="Brush Script MT, cursive" fontSize="70" fill="#00e0d0">N</text>
							<text x="55" y="65" font-family="Brush Script MT, cursive" font-size="70" fill="url(#grad)">ucshop</text>
						
							<path d="M10,70 Q90,90 200,70" fill="none" stroke="red" stroke-width="6" stroke-linecap="round"/>
							{/* <text
								x="150"
								y="70"
								fontFamily="Brush Script MT, cursive"
								fontSize="50"
								textAnchor="middle"
								fill="url(#grad)"
							>
								<tspan fontSize="65">N</tspan>ucshop
							</text> */}
							
						</svg>
					</div>
					<Menu />
					<Actions />
				</div>
			</div>
		</header>
	);
};

export default Header;
