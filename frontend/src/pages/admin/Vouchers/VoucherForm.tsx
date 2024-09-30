import InputNumber from "@/components/common/InputNumber";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	createVoucher,
	getVoucherById,
	updateVoucherById,
} from "@/service/voucher";
import { useProcessBarLoadingEventNone } from "@/store/useSidebarAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
const voucherSchema = z
	.object({
		name: z.string().min(1, "Tên voucher là bắt buộc"),
		description: z.string().min(1, "Mô tả voucher là bắt buộc"),
		startDate: z.date({
			required_error: "Vui lòng chọn ngày bắt đầu",
		}),
		endDate: z.date({
			required_error: "Vui lòng chọn ngày kết thúc",
		}),
		discountType: z.enum(["fixed", "percentage"], {
			required_error: "Vui lòng chọn loại giảm giá",
		}),
		discountValue: z
			.number({
				required_error: "Giá trị giảm là bắt buộc",
				invalid_type_error: "Giá trị giảm phải là số",
			})
			.min(0, "Giá trị giảm không được âm"),
		// .refine((val) => val <= 100, {
		// 	message: "Giá trị giảm tối đa là 100%",
		// }),
		usageLimit: z
			.number({
				required_error: "Giới hạn sử dụng là bắt buộc",
				invalid_type_error: "Giới hạn sử dụng phải là số",
			})
			.min(1, "Giới hạn sử dụng phải lớn hơn 0"),
		minimumOrderValue: z
			.number({
				required_error: "Giá trị đơn hàng tối thiểu là bắt buộc",
				invalid_type_error: "Giá trị đơn hàng tối thiểu phải là số",
			})
			.min(0, "Giá trị đơn hàng tối thiểu không được âm"),
		status: z.enum(["active", "inactive"], {
			required_error: "Vui lòng chọn trạng thái",
		}),
	})
	.refine(
		(data) => {
			if (data.discountType === "percentage" && data.discountValue > 100) {
				return false;
			}
			return true;
		},
		{
			message: "Giá trị giảm tối đa là 100% cho loại giảm giá phần trăm",
			path: ["discountValue"],
		},
	);
export type VoucherFormValues = z.infer<typeof voucherSchema>;
const VoucherForm = () => {
	const { setOpenProcessLoadingEventNone, setCloseProcessLoadingEventNone } =
		useProcessBarLoadingEventNone();
	const { id } = useParams();
	useEffect(() => {
		(async () => {
			if (id) {
				try {
					const { data } = await getVoucherById(id);
					const deafaultForm = {
						...data.data,
						discountType: data.data.discountType == 1 ? "fixed" : "percentage",
						status: data.data.status == 1 ? "active" : "inactive",
						startDate: new Date(data.data.startDate),
						endDate: new Date(data.data.endDate),
					};
					form.reset(deafaultForm);
				} catch (error) {
					if (error instanceof AxiosError) {
						toast.error(error.response?.data.message);
					}
				}
			}
		})();
	}, []);
	const form = useForm<z.infer<typeof voucherSchema>>({
		resolver: zodResolver(voucherSchema),
		defaultValues: {
			name: "",
			description: "",
			startDate: new Date(),
			endDate: new Date(),
			discountType: "fixed",
			discountValue: 0,
			usageLimit: 0,
			minimumOrderValue: 0,
			status: "active",
		},
	});
	const handleCreateVoucher = async (
		payload: z.infer<typeof voucherSchema>,
	) => {
		try {
			const { status, ...voucherData } = payload;
			const formattedData = {
				...voucherData,
				discountType: voucherData.discountType === "fixed" ? 1 : 2,
			};
			const { data } = await createVoucher(formattedData as any);
			toast.success(data?.message);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		}
	};
	const handleUpdateVoucher = async (
		payload: z.infer<typeof voucherSchema>,
	) => {
		try {
			const { status, ...voucherData } = payload;
			const formattedData = {
				...voucherData,
				_id: id,
				discountType: voucherData.discountType === "fixed" ? 1 : 2,
			};
			const { data } = await updateVoucherById(formattedData as any);
			toast.success(data?.message);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		}
	};
	const onSubmit = async (payload: z.infer<typeof voucherSchema>) => {
		try {
			setOpenProcessLoadingEventNone();
			if (id) {
				await handleUpdateVoucher(payload);
			} else {
				await handleCreateVoucher(payload);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		} finally {
			setCloseProcessLoadingEventNone();
		}
	};
	return (
		<div className="p-6 mx-auto ">
			<h2 className="mb-6 text-2xl font-bold">{`${id ? "Cập nhập mã giảm giá" : "Thêm mới mã giảm giá"}`}</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên</FormLabel>
									<FormControl>
										<Input placeholder="Nhập tên voucher" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Trạng thái</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Chọn trạng thái" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="active">Hoạt động</SelectItem>
											<SelectItem value="inactive">Không hoạt động</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							control={form.control}
							name="startDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Ngày bắt đầu</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={`w-full pl-3 text-left font-normal ${
														!field.value && "text-muted-foreground"
													}`}
												>
													{field.value ? (
														format(field.value, "dd/MM/yyyy")
													) : (
														<span>Chọn ngày</span>
													)}
													<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={(e) => {
													field.onChange(e?.toISOString());
												}}
												disabled={(date) =>
													date < new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Ngày kết thúc</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={`w-full pl-3 text-left font-normal ${
														!field.value && "text-muted-foreground"
													}`}
												>
													{field.value ? (
														format(field.value, "dd/MM/yyyy")
													) : (
														<span>Chọn ngày</span>
													)}
													<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={(e) => {
													field.onChange(e?.toISOString());
												}}
												disabled={(date) =>
													date < new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							control={form.control}
							name="discountType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Loại giảm giá</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Chọn loại giảm giá" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="fixed">Số tiền</SelectItem>
											<SelectItem value="percentage">Số phần trăm</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="discountValue"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá trị giảm</FormLabel>
									<FormControl>
										<InputNumber
											isNumeric
											value={String(field.value)}
											name={field.name}
											placeholder="Nhập giá trị giảm"
											onChange={(value) => field.onChange(+value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							control={form.control}
							name="usageLimit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giới hạn sử dụng</FormLabel>
									<FormControl>
										{/* <Input
											type="number"
											placeholder="Nhập giới hạn sử dụng"
											{...field}
											onChange={(event) => field.onChange(+event.target.value)}
										/> */}
										<InputNumber
											isNumeric
											value={String(field.value)}
											name={field.name}
											placeholder="Nhập giới hạn sử dụng"
											onChange={(value) => field.onChange(+value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="minimumOrderValue"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá trị đơn hàng tối thiểu</FormLabel>
									<FormControl>
										<InputNumber
											isNumeric
											value={String(field.value)}
											name={field.name}
											placeholder="Nhập giá trị tối thiểu"
											onChange={(value) => field.onChange(+value)}
										/>
										{/* <Input
											type="number"
											placeholder="Nhập giá trị tối thiểu"
											{...field}
											onChange={(event) => field.onChange(+event.target.value)}
										/> */}
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mô tả</FormLabel>
								<FormControl>
									<Textarea placeholder="Nhập mô tả voucher" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full text-white bg-blue-600 hover:bg-blue-700"
					>
						Lưu
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default VoucherForm;
