import { cn } from "@/lib/utils";
import Actions from "./Actions";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

const Header = () => {
	const location = useLocation();
	const [isScroll, setIsScroll] = useState(false);

	const handleScroll = useCallback(() => {
		setIsScroll(window.scrollY > 100);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<div
			className={cn(
				" w-full top-0 z-50  padding",
				location.pathname === "/"
					? "bg-transparent absolute"
					: "backdrop-blur-md fixed",
				isScroll && "backdrop-blur-md",
			)}
		>
			<div className="flex items-center justify-between h-16 max-w-full">
				<div className="block md:hidden">
					<MenuMobile />
				</div>
				<div className="absolute max-sm:-translate-x-1/2 top-1/2 left-1/2 max-sm:-translate-y-1/2 sm:static sm:flex sm:items-center">
					<Logo />
				</div>
				<Menu />
				<Actions />
			</div>
		</div>
	);
};

const Logo = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={100}
		height={50}
		viewBox="0 0 200 100"
		preserveAspectRatio="xMaxYMax meet"
	>
		<defs>
			<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style={{ stopColor: "#4ecdc4", stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: "#ff6b6b", stopOpacity: 1 }} />
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
	</svg>
);

export default Header;
