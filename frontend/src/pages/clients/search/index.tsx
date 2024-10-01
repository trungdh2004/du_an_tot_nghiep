const SearchPage = () => {
	return (
		<div className="padding">
			<h1 className="mb-4 text-xl font-bold">Tìm kiếm</h1>

			<div className="mb-8">Tìm kiếm khóa học, bài viết và các video...</div>

			<div className="w-full border-b border-gray-300">
				<input
					type="text"
					placeholder=""
					className="block w-full p-3 text-xl bg-transparent outline-none"
				/>
			</div>
			<div className="flex mb-8 space-x-4">
				<button className="pb-1 font-semibold text-orange-500 border-b-2 border-orange-500">
					Khóa học
				</button>
				<button className="text-gray-500">Bài viết</button>
				<button className="text-gray-500">Video</button>
			</div>

			<div className="flex items-start space-x-6">
				<div className="flex flex-col items-center justify-center w-64 h-40 p-4 text-white rounded-lg bg-gradient-to-r from-blue-400 to-blue-600">
					<h3 className="mb-2 text-2xl font-bold">HTML, CSS</h3>
					<p className="text-center">từ zero đến hero</p>
				</div>

				<div className="flex-1">
					<h3 className="mb-2 text-xl font-bold">HTML CSS từ Zero đến Hero</h3>
					<p className="text-gray-600">
						Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web
						là The Band & Shopee.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
