import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";

const WrapperSearch = () => {
	const location = useLocation();
	const listTopic = [
		{
			topic: "/posts",
			name: "Bài viết",
		},
	];
	console.log();
	return (
		<div className="padding">
			<h1 className="mb-4 text-xl font-bold">Tìm kiếm</h1>

			<div className="mb-8">Tìm kiếm khóa học, bài viết và các video...</div>

			<div className="w-full border-b border-gray-300">
				<input
					type="text"
					defaultValue={"HTML"}
					placeholder=""
					className="block w-full p-3 text-xl bg-transparent outline-none"
				/>
			</div>
			<div className="flex mb-8 space-x-4">
				<Link
					to={`/search`.concat(location.search)}
					className={cn(
						"pb-1 font-semibold   ",
						location.pathname.split("/search")[1] == ""
							? "text-orange-500 border-b-2 border-orange-500"
							: "text-gray-500",
					)}
				>
					Sản phẩm
				</Link>
				{listTopic?.map((t) => (
					<Link
						to={`/search${t.topic}`.concat(location.search)}
						className={cn(
							"pb-1 font-semibold   ",
							location.pathname.split("/search")[1] == t.topic
								? "text-orange-500 border-b-2 border-orange-500"
								: "text-gray-500",
						)}
					>
						{t.name}
					</Link>
				))}
			</div>
			<div className="">
				<Outlet />
			</div>
		</div>
	);
};

export default WrapperSearch;
