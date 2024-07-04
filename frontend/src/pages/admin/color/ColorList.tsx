import TableComponent from "@/components/common/TableComponent";
import { Checkbox } from "@/components/ui/checkbox";
import instance from "@/config/instance";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";
import ColorForm from "./ColorForm";
interface IData {
    _id: string;
    name: string;
    code: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    slug: string;
}
export const hiddencolor = async (id: string | boolean) => {
    const data = await instance.delete(`color/delete/${id}`);
    return data;
};


export const unhiddencolor = async (id: string | boolean) => {
    const data = await instance.put(`color/unDelete/${id}`);
    return data;
};

const ColorList = () => {
    const [openId, setOpenId] = useState<string | boolean>(false);
    const [openUnhiddenCategory, setopenUnhiddenCategory] = useState<string | boolean>(false);
    const [data, setData] = useState<IData[]>([])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // xử lí selected
    const [listRowSeleted, setListRowSelected] = useState<IData[]>([]);
    const [openUnhiddenColor, setopenUnhiddenColor] = useState<
        string | boolean
    >(false);
    const [openHiddenColor, setOpenHiddenColor] = useState<
        string | boolean
    >(false);

    const [searchObject, setSearchObject] = useState<any>({
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
        fieldSort: "",
        sort: 1,
        tab: 1,
    });
    console.log(searchObject);
    const [response, setResponse] = useState<any>({
        pageCount: 0,
        totalElement: 0, //tổng số phần tử
        totalOptionPage: 0, //tổng số phần tử trong 1 trang
    });
    const handleColor = async () => {
        try {
            const { data } = await instance.post('/color/paging');
            setData(data.content);
            setResponse({
                pageCount: data.totalPage,
                totalElement: data.totalAllOptions,
                totalOptionPage: data.totalOptionPage,
            });
        } catch (error) {
            console.error(`color`, error)
        }
    }
    useEffect(() => {
        handleColor()
    }, [searchObject])
    const handleHiddenColor = async (id: string | boolean) => {
        try {
            const { data } = await hiddencolor(id);
            setOpenHiddenColor(false);
            handleColor();
            toast.success("Đã ẩn danh mục thành công");
        } catch (error) {
            toast.error("Ẩn danh mục thất bại");
        }
    };

    const handleUnhiddenCate = async (id: string | boolean) => {
        try {
            const { data } = await unhiddencolor(id);
            setopenUnhiddenCategory(false);
            handleColor();
            toast.success("Bỏ ẩn danh mục thành công");
        } catch (error) {
            toast.error("Bỏ ẩn danh mục thất bại");
        }
    };
    const columns: ColumnDef<IData>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => {
                        table.toggleAllPageRowsSelected(!!value);
                        if (value) setListRowSelected(data);
                        if (!value) setListRowSelected([]);
                    }}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                        if (value) setListRowSelected((prev) => [...prev, row.original]);
                        if (!value)
                            setListRowSelected((prev) => {
                                return prev.filter((item) => item._id !== row.original._id);
                            });
                    }}
                    aria-label="Select row"
                />
            ),
            size: 100,
        },
        {
            accessorKey: "name",
            header: () => {
                return <div className="md:text-base text-xs">Tên</div>;
            },
            cell: ({ row }) => {
                console.log(row.original)
                return (
                    <div className="md:text-base text-xs">{row?.original?.name}</div>
                );
            },
        },
        {
            accessorKey: "description",
            header: () => {
                return <div className="md:text-base text-xs">Mã màu</div>;
            },
            cell: ({ row }) => {
                return (
                    <div className="md:text-base text-xs">
                        {row?.original?.code}
                    </div>
                );
            },
        },

        {
            accessorKey: "createdAt",
            header: () => {
                return <div className="md:text-base text-xs">Ngày tạo</div>;
            },
            cell: ({ row }) => {
                const parsedDate = parseISO(row.original.createdAt);
                const formattedDate = format(parsedDate, "dd/MM/yyyy");
                return (
                    <div className="font-medium md:text-base text-xs">
                        {formattedDate}
                    </div>
                );
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <HiOutlineDotsVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuSeparator />
                            <Button
                                onClick={() => setOpenId(row?.original?._id)}
                                className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full"
                            >
                                Sửa danh mục
                            </Button>
                            {row?.original?.deleted ? (
                                <DropdownMenuItem
                                    className="text-green-400 text-center"
                                    onClick={() => setopenUnhiddenColor(row?.original?._id)}
                                >
                                    Bỏ ẩn
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem
                                    className="text-red-400 text-center"
                                    onClick={() => setOpenHiddenColor(row?.original?._id)}
                                >
                                    Ẩn
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    const handleChangePageSize = (value: number) => {
        setSearchObject((prev) => ({
            ...prev,
            pageSize: value,
            pageIndex: 1,
        }));
    };
    const handleChangePage = (value: any) => {
        console.log("value change page", value);

        setSearchObject((prev) => ({
            ...prev,
            pageIndex: value.selected + 1,
        }));
    };
    const debounced = useDebounceCallback((inputValue: string) => {
        setSearchObject((prev) => ({
            ...prev,
            pageIndex: 1,
            keyword: inputValue,
        }));
    }, 300);
    return (
        <>
            <div className="flex flex-col gap-3 mb-5">
                <div className="flex flex-col gap-3">
                    <h4 className="font-medium md:text-xl text-base">Danh sách danh mục</h4>
                    <div className="flex justify-between">
                        <Input
                            placeholder="Tìm kiếm danh mục"
                            className="w-[40%] md:text-base text-xs"
                            onChange={(event) => debounced(event.target.value)}
                        />
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => setOpenId(true)}
                                className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full border"
                            >
                                Thêm danh mục
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Tabs value={`${searchObject.tab}`} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="1"
                        onClick={() => setSearchObject((prev) => ({ ...prev, tab: 1 }))}
                        className="md:text-base text-sm"
                    >
                        Danh mục
                    </TabsTrigger>
                    <TabsTrigger
                        value="2"
                        onClick={() => setSearchObject((prev) => ({ ...prev, tab: 2 }))}
                        className="md:text-base text-sm"
                    >
                        Danh mục ẩn
                    </TabsTrigger>
                </TabsList>
            </Tabs> */}

            <TableComponent
                data={data}
                columns={columns}
                // selected
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                // phân trang
                handleChangePage={handleChangePage}
                pageIndex={searchObject.pageIndex}
                pageSize={searchObject.pageSize}
                pageCount={response.pageCount}
                totalElement={response.totalElement}
                handleChangePageSize={handleChangePageSize}
                dataPageSize={[1, 3, 5, 10]}
            />
            {!!openId && (
                <ColorForm
                    open={openId}
                    title="Cập nhật"
                    handleClose={() => setOpenId(false)}
                    handlePaging={() => handleColor()}
                />
            )}
        </>
    )
}

export default ColorList