import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface Props {
	pageCount: number;
	handlePageClick: ({ selected }: { selected: number }) => void;
	size?: "sm" | "md";
	forcePage: number;
	marginPagesDisplayed?: number;
}

function Paginations({
	pageCount,
	handlePageClick,
	size = "md",
	forcePage = 0,
	marginPagesDisplayed = 2,
}: Props) {
	return (
		<>
			{" "}
			{pageCount > 0 ? (
				<ReactPaginate
					forcePage={forcePage}
					breakLabel=". . ."
					nextLabel={<FaAngleRight />}
					onPageChange={handlePageClick}
					pageRangeDisplayed={1}
					marginPagesDisplayed={marginPagesDisplayed}
					pageCount={pageCount}
					previousLabel={<FaAngleLeft />}
					renderOnZeroPageCount={null}
					pageLinkClassName={cn(
						"border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					previousLinkClassName={cn(
						"border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					nextLinkClassName={cn(
						"border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					disabledLinkClassName={
						"border-zinc-200 cursor-not-allowed text-zinc-200"
					}
					breakLinkClassName={cn(
						"border w-8 h-8  flex items-end justify-center rounded-md hover:bg-gray-100",
						size === "md" && "md:w-10 md:h-10",
						size === "sm" && "md:w-8 md:h-8",
					)}
					activeLinkClassName={"border-custom  text-custom font-medium"}
					containerClassName={"flex gap-1"}
				/>
			) : (
				<div className="flex gap-1">
					<button
						className={cn(
							"border w-8 h-8  flex items-center justify-center rounded-md p-0 border-zinc-200 cursor-not-allowed text-zinc-200",
						)}
						disabled
					>
						<FaAngleLeft />
					</button>
					<button
						className={cn(
							"border w-8 h-8  flex items-center justify-center rounded-md p-0 border-custom  text-custom font-medium cursor-pointer",
						)}
					>
						1
					</button>
					<button
						className={cn(
							"border w-8 h-8  flex items-center justify-center rounded-md p-0 border-zinc-200 cursor-not-allowed text-zinc-200",
						)}
						disabled
					>
						<FaAngleRight />
					</button>
				</div>
			)}
		</>
	);
}

export default Paginations;
