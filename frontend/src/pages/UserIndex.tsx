import React from "react";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TableComponent from "@/components/common/TableComponent";

const UserIndex = () => {
	const onDelete = (id: string) => {
		console.log("id:", id);
	};

	interface ITable {
		id: string;
		name: string;
		address: string;
		email: string;
		age?: number;
	}

	const data: ITable[] = [
		{
			id: "84013be2-2cee-4bf5-a65a-e762854c76f1",
			name: "Rachael Brown",
			email: "jonathan54@yahoo.com",
			address: "744 Jessica Springs\nNew Tanyaborough, DE 58684",
			age: 12,
		},
		{
			id: "20dd3a03-b90c-42cd-9894-0eb4182fba21",
			name: "Roger Chang",
			email: "matthewfletcher@lopez.org",
			address: "97766 Matthew Walk\nAlexishaven, NM 06782",
			age: 12,
		},
		{
			id: "241431cc-651f-40ae-b83e-e4b2d940f932",
			name: "Jose Young",
			email: "gail42@yahoo.com",
			address: "58376 Patricia Ferry Suite 417\nAmyburgh, CT 00969",
			age: 12,
		},
		{
			id: "217a6a8d-35ed-44ca-94f5-878cd86582e9",
			name: "Robert Larsen",
			email: "petersonruth@hotmail.com",
			address: "595 Julie Estates Apt. 239\nWest Ericmouth, CO 04474",
		},
		{
			id: "f15421bf-4d5f-4222-a9f3-1cf994cb9f52",
			name: "Ryan Silva",
			email: "marcia70@miller.info",
			address: "765 Trevor Fork Suite 553\nJacquelineberg, MA 51358",
		},
		{
			id: "78fa871e-90ef-412e-b5b5-c4ba961f6bfd",
			name: "Elizabeth Kline",
			email: "odavis@weaver.com",
			address: "159 Adams Glen\nNew Darrellborough, OH 97161",
		},
		{
			id: "266e4236-8b54-46a5-a4ac-93293906a77d",
			name: "Kevin Howard",
			email: "milleramanda@hotmail.com",
			address: "30365 Olsen Passage Suite 193\nKristiestad, CT 37139",
		},
		{
			id: "0e25cb13-ea0a-483a-88e5-153cd6a78f21",
			name: "Savannah Williams",
			email: "aeaton@hotmail.com",
			address: "0581 Luis Locks\nBradleyfurt, TN 72675",
		},
		{
			id: "0db646c6-7e4e-4308-aa95-88e1c52fa175",
			name: "Tammy Dunn",
			email: "rachaelanderson@nicholson.com",
			address: "891 Joanna Forges\nVanessaborough, WV 53235",
		},
		{
			id: "0fe7c034-8c42-4bb0-a0c1-3eb506ed8f17",
			name: "Joseph Duran",
			email: "matthewbutler@yahoo.com",
			address: "097 Eugene Via\nEast Kathleenshire, HI 36979",
		},
	];

	const columns: ColumnDef<ITable>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "id",
			header: () => <div className="text-center text-red-500">Id user</div>,
		},
		{
			accessorKey: "email",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						className="text-center"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Email
					</Button>
				);
			},
		},
		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						className="text-center"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Name
					</Button>
				);
			},
			cell: ({ cell, row, column }) => {
				const name = `${row.getValue("name")}`;
				const age = row.original.age;
				return (
					<div className="text-center font-medium">{`${name} ${age ? "-" + age : ""}`}</div>
				);
			},
		},
		{
			accessorKey: "address",
			header: "Address",
		},
		{
			accessorKey: "action",
			header: "Action",
			cell: ({ cell, row }) => {
				return (
					<Button variant={"danger"} onClick={() => onDelete(row.original.id)}>
						Xóa
					</Button>
				);
			},
		},
	];

	return (
		<div>
			<h4 className="">Danh sách test</h4>
			<TableComponent data={data} columns={columns} />
		</div>
	);
};

export default UserIndex;
