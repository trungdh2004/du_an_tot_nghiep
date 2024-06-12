import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosSearch } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
const Search = () => {
	return (
		<Dialog>
			<DialogTrigger className="border-none outline-none hover:bg-[#919eab27] p-1 rounded-full">
				<IoIosSearch strokeWidth={0.5} className="text-2xl " />
			</DialogTrigger>
			<DialogContent className="max-sm:max-w-[92%] rounded-md">
				<DialogHeader className="border-b border-gray-300 pb-3">
					<div className="flex items-center">
						<label className="" htmlFor="search-header">
							<IoSearch size={24} className="text-gray-400" />
						</label>
						<input
							id="search-header"
							type="text"
							placeholder="Tìm kiếm..."
							className="w-full mx-3 border-none outline-none"
						/>
					</div>
				</DialogHeader>
				<ul className="*:py-3 *:px-1 *:rounded *:relative">
					<li className="hover:bg-gray-100 ">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit
					</li>
				</ul>
			</DialogContent>
		</Dialog>
	);
};

export default Search;
