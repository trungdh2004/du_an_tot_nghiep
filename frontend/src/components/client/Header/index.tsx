import Actions from "./Actions";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
const Header = () => {
	return (
		<header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md padding">
			<div className="">
				<div className="flex items-center justify-between h-16">
					<div className="block md:hidden">
						<MenuMobile />
					</div>
					<div className="absolute max-sm:-translate-x-1/2 left-1/2 max-sm:-translate-y-1/2 sm:static sm:flex sm:items-center ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={150}
							height={50}
							viewBox="0 0 300 100"
						>
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
							<text
								x="15"
								y="65"
								fontFamily="Brush Script MT, cursive"
								fontSize="70"
								fill="#00e0d0"
							>
								N
							</text>
							<text
								x="55"
								y="65"
								fontFamily="Brush Script MT, cursive"
								fontSize="70"
								fill="url(#grad)"
							>
								ucshop
							</text>

							<path
								d="M10,70 Q90,90 200,70"
								fill="none"
								stroke="red"
								strokeWidth="6"
								strokeLinecap="round"
							/>
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
