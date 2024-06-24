import { Input } from "@/components/ui/input";
import React from "react";
import { IoFilter } from "react-icons/io5";

const SearchUser = () => {
	return (
		<div className="flex flex-col gap-3">
			<h4 className="font-medium text-xl">Danh sách người dùng</h4>
			<div className="flex justify-between">
				<Input placeholder="Tìm kiếm người dùng" className="w-[40%]" />
				<div className="pr-5">
					<IoFilter size={20} />
				</div>
			</div>
		</div>
	);
};

export default SearchUser;
