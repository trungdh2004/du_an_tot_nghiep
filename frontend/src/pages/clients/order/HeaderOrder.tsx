import React from 'react'

const HeaderOrder = () => {
  return (
		<div className="bg-white w-full lg:h-[100px] h-[70px] flex items-center border border-gray-200 box-shadow">
			<div className="flex items-center gap-4 lg:px-[130px] md:px-[65px] px-0">
				<h1 className="text-2xl">Logo</h1>
				<span className="lg:text-xl text-sm">|</span>
				<span className="lg:text-2xl text-sm">Thanh toán</span>
			</div>
		</div>
	);
}

export default HeaderOrder