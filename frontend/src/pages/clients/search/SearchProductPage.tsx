const SearchProductPage = () => {
	return (
		<div className="flex items-start space-x-6">
			<div className="flex flex-col items-center justify-center w-64 h-40 p-4 text-white rounded-lg bg-gradient-to-r from-blue-400 to-blue-600">
				<h3 className="mb-2 text-2xl font-bold">HTML, CSS</h3>
				<p className="text-center">từ zero đến hero</p>
			</div>

			<div className="flex-1">
				<h3 className="mb-2 text-xl font-bold">HTML CSS từ Zero đến Hero</h3>
				<p className="text-gray-600">
					Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là
					The Band & Shopee.
				</p>
			</div>
		</div>
	);
};

export default SearchProductPage;
