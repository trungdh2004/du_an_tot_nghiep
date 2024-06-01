import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Paginations({ pageCount, handlePageClick}: any) {
	return (
		<>
			<ReactPaginate
				breakLabel=". . ."
				nextLabel={<FaAngleRight/>}
				onPageChange={handlePageClick}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel={<FaAngleLeft/>}
				renderOnZeroPageCount={null}
				pageLinkClassName={
					"border w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
				}
				previousLinkClassName={
					"border w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
				}
				nextLinkClassName={
					"border w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
				}
				disabledLinkClassName={
					"border-zinc-200 cursor-not-allowed text-zinc-200"
				}
				breakLinkClassName={
					" w-8 h-8 md:w-10 md:h-10 flex items-end justify-center rounded-md hover:bg-gray-100"
				}
				activeLinkClassName={"border-blue-500  text-blue-500 font-medium"}
				containerClassName={"flex gap-1"}
			/>
		</>
	);
}

export default Paginations;
