import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoPencil } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { IoFlagOutline } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
const Actions = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="outline-none border-none bg-transparent hover:bg-transparent focus-visible:right-0"
				>
					{" "}
					<TbDotsVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-min">
				<DropdownMenuCheckboxItem>
					<div className="flex items-center gap-2.5">
						<GoPencil /> <span className="text-nowrap">Chỉnh sửa</span>
					</div>
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem>
					<div className="flex items-center gap-2.5">
						<HiOutlineTrash /> <span className="text-nowrap">Xoá</span>
					</div>
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Actions;
