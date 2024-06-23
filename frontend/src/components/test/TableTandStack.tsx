import React, { useState } from "react";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	VisibilityState,
	PaginationState,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DataTablePagination } from "../common/DataTablePagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	onDelete: (id: string) => void;
	data: TData[];
}

const TableTandStack = <TData, TValue>({
	columns,
	onDelete,
	data,
}: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	  })
	

	const table = useReactTable({
		data,
		columns,
		pageCount: 5,
		rowCount:500,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			pagination,
			
		},
		
		onPaginationChange: setPagination,
	});

	return (
		<div className="min-h-screen ">
			<p>
				Count:
				{table.getPageCount()}
			</p>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="ml-auto">
					Columns
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{table
					.getAllColumns()
					.filter(
						(column) => column.getCanHide()
					)
					.map((column) => {
						return (
						<DropdownMenuCheckboxItem
							key={column.id}
							className="capitalize"
							checked={column.getIsVisible()}
							onCheckedChange={(value) =>
							column.toggleVisibility(!!value)
							}
						>
							{column.id}
						</DropdownMenuCheckboxItem>
						)
					})}
				</DropdownMenuContent>
				</DropdownMenu>

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => {
						return (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						);
					})}
				</TableHeader>

				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<DataTablePagination table={table}/>
		</div>
	);
};

export default TableTandStack;
