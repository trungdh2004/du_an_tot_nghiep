import React from "react";

interface VoucherIconProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

export const VoucherIcon: React.FC<VoucherIconProps> = ({
	width = 64,
	height = 64,
	color = "#f72222",
	className = "",
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 32 32"
			fill={color}
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			style={{
				fillRule: "evenodd",
				clipRule: "evenodd",
				strokeLinejoin: "round",
				strokeMiterlimit: 2,
			}}
		>
			<g transform="matrix(-1 0 0 -1 32 32)">
				<g transform="translate(-336 -336)">
					<g transform="translate(288 96)">
						<path
							d="M77 253c-1.656 0-3 1.344-3 3s1.344 3 3 3v4c0 1.105-.895 2-2 2h-22c-1.105 0-2-.895-2-2v-4c1.656 0 3-1.344 3-3s-1.344-3-3-3v-4c0-1.105.895-2 2-2h22c1.105 0 2 .895 2 2v4z"
							fill="#fff"
						/>
					</g>
					<path
						d="M341 362a3 3 0 01-3-3v-4a1 1 0 011-1 2 2 0 100-4 1 1 0 01-1-1v-4a3 3 0 013-3h22a3 3 0 013 3v4a1 1 0 01-1 1 2 2 0 100 4 1 1 0 011 1v4a3 3 0 01-3 3h-22zm0-2h22a1 1 0 001-1v-3.126a4.002 4.002 0 01-3-3.874 4.002 4.002 0 013-3.874V345a1 1 0 00-1-1h-22a1 1 0 00-1 1v3.126a4.002 4.002 0 013 3.874 4.002 4.002 0 01-3 3.874V359a1 1 0 001 1zm15-5v1a1 1 0 002 0v-1a1 1 0 00-2 0zm-4-3a1 1 0 110 2 1 1 0 010-2zm-5.293 1.707l6-6a1 1 0 00-1.414-1.414l-6 6a1 1 0 001.414 1.414zM356 351v2a1 1 0 002 0v-2a1 1 0 00-2 0zm-10-3a1 1 0 110 2 1 1 0 010-2zm10-2v1a1 1 0 002 0v-1a1 1 0 00-2 0z"
						fill={color}
					/>
				</g>
			</g>
		</svg>
	);
};
