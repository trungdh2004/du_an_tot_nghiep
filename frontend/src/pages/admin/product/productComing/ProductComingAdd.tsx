import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import SelectPagingComponent from "@/components/common/SelectPagingComponent";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { createProductComing } from "@/service/product";
import { toast } from "sonner";
import { vi } from "date-fns/locale";

interface Props {
	open: boolean;
	close: () => void;
	handleCustomer: () => void;
}
interface DataComingState {
	productId: string;
	date: Date | undefined;
	active: boolean;
}
const ProductComingAdd = ({ open, close, handleCustomer }: Props) => {
	const [value, setValue] = useState<any>();
	const [date, setDate] = React.useState<Date>();
	const [dataComing, setDataComing] = useState<DataComingState>(() => ({
		productId: "",
		date: undefined,
		active: false,
	}));
	const handleSelectProductComing = async () => {
		if (dataComing?.productId === "") {
			toast.error("Bạn chưa chọn sản phẩm");
			return;
		}
		if (date === undefined) {
			toast.error("Bạn chưa chọn ngày kết thúc");
			return;
		}
		try {
			const { data } = await createProductComing(dataComing);
			toast.success("Thêm sản phẩm chờ thành công");
			handleCustomer();
			close();
			return;
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={close}>
				<DialogContent className="sm:max-w-[725px] max-h-[600px]">
					<DialogHeader>
						<DialogTitle>Thêm sản phẩm chờ</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<h4>Sản phẩm</h4>
						<SelectPagingComponent<any>
							value={value}
							onChange={(e) => {
								setDataComing((prev) => {
									return {
										...prev,
										productId: e._id,
									};
								});
							}}
							url="product/pagingProductOfVoucher"
							getOptionLabel={(option) => {
								return (
									<div className="flex items-center gap-3">
										<img src={option.thumbnail} alt="" className="w-8 h-8" />
										<span className="ml-2 w-[500px] truncate">
											{option.name}
										</span>
									</div>
								);
							}}
							getOptionValue={(option) => {
								return option._id;
							}}
						/>
						<h4>Ngày kết thúc</h4>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[240px] justify-start text-left font-normal",
										!date && "text-muted-foreground",
									)}
								>
									<CalendarIcon />
									{date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={(selectedDate) => {
										setDate(selectedDate);
										setDataComing((prev) => ({
											...prev,
											date: selectedDate,
										}));
									}}
									initialFocus
									locale={vi}
									disabled={(date) => {
										const today = new Date();
										today.setHours(0, 0, 0, 0);
										return date < today || date < new Date("1900-01-01");
									}}
								/>
							</PopoverContent>
						</Popover>
						<div className="flex items-center gap-3">
							<Checkbox
								onCheckedChange={(isChecked) => {
									const checked = Boolean(isChecked);
									setDataComing((prev) => ({
										...prev,
										active: checked,
									}));
								}}
							/>
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Mặc định
							</label>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="submit"
							onClick={() => {
								handleSelectProductComing();
							}}
						>
							Thêm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProductComingAdd;
