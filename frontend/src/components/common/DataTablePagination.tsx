import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Paginations from "./Pagination";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex-1 text-sm text-muted-foreground">
				Tổng : {table.getRowCount()} -{" "}
				{table.getFilteredSelectedRowModel().rows.length} /{" "}
				{table.getFilteredRowModel().rows.length} chọn.
			</div>
			<div className="flex items-center space-x-2">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Số lượng</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[1, 5, 10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Trang {table.getState().pagination.pageIndex + 1} /{" "}
					{table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Paginations
						size="sm"
						pageCount={table.getPageCount()}
						handlePageClick={({ selected }: { selected: number }) => {
							table.setPageIndex(selected);
						}}
					/>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
