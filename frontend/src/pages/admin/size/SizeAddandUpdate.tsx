import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import instance from "@/config/instance";
import { toast } from "sonner";
import { SearchObjectType } from "@/types/searchObjecTypes";

interface FormDialog {
	open: boolean | string;
	title?: "Thêm size" | "Cập nhật";
	labelConfirm?: string;
	handleClose: () => void;
	handlePaging: () => void;
}
const formSchema = z.object({
	name: z
		.string({
			message: "Tên danh mục không được để trống",
		})
		.min(1, {
			message: "Bạn nên tạo danh mục lớn hơn 1 ",
		}),
	toWeight: z.number().min(1, "Phải lớn hơn 0"),
	fromWeight: z.number().min(1, "Phải lớn hơn 0"),
  toHeight:z.number().min(1, "Phải lớn hơn 0"),
  fromHeight: z.number().min(1, "Phải lớn hơn 0"),
});
const SizeAddandUpdate = ({
	title,
	open,
	handleClose,
	handlePaging,
}: FormDialog) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
      toHeight: 0,
      fromHeight: 0,
      toWeight: 0,
      fromWeight: 0,
		},
	});
	const onHandleUpdate = async (dataForm: {
		name: string;
		toWeight: number;
		fromHeight: number;
		toHeight: number;
		fromWeight: number;
	}) => {
		try {
			const { data } = await instance.put(`/size/updateSize/${open}`, dataForm);
			console.log("Update size success");
			handleClose();
			handlePaging();
			toast.success("Bạn cập nhật size thành công");
		} catch (error) {
			console.error("Error:", error);
		}
	};
	const onHandleAdd = async (dataForm: {
		name: string;
		toWeight: number;
		fromHeight: number;
		toHeight: number;
		fromWeight: number;
	}) => {
		try {
			const { data } = await instance.post(`/size/addSize`, dataForm);
			console.log(data);
			console.log("Add size success");
			form.reset();
			handleClose();
			handlePaging();
			toast.success("Bạn thêm size thành công");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		if (typeof open === "string") {
			(async () => {
				try {
					const { data } = await instance.get(`/size/size/${open}`);
					console.log(data);
					form.reset(data.data);
				} catch (error) {
					console.error("Error:", error);
				}
			})();
		}
	}, [open]);

	const onSubmit = (data: { name: string; toWeight: number,fromHeight:number,toHeight:number,fromWeight:number }) => {
		if (typeof open === "string") {
			onHandleUpdate(data);
		} else {
			onHandleAdd(data);
		}
	};

	return (
		<div>
			<Dialog open={!!open} onOpenChange={handleClose}>
				<DialogTrigger asChild>
					<Button variant="outline">{title}</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{typeof open === "string" ? "Cập nhật" : "Thêm size"}
						</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-3">
								<FormField
									control={form.control}
									name="fromHeight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Chiều cao nhỏ</FormLabel>
											<FormControl>
												<Input
													placeholder="Chiều cao nhỏ"
													{...field}
													onChange={(event) =>
														field.onChange(+event.target.value)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="toHeight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Chiều cao lớn</FormLabel>
											<FormControl>
												<Input
													placeholder="Chiều cao lớn"
													{...field}
													type="number"
													onChange={(event) =>
														field.onChange(+event.target.value)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<FormField
									control={form.control}
									name="fromWeight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cân nặng thấp</FormLabel>
											<FormControl>
												<Input
													placeholder="Cân nặng thấp"
													{...field}
													type="number"
													onChange={(event) =>
														field.onChange(+event.target.value)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="toWeight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cân nặng cao</FormLabel>
											<FormControl>
												<Input
													placeholder="Cân nặng cao"
													{...field}
													type="number"
													onChange={(event) =>
														field.onChange(+event.target.value)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button type="submit">
								{typeof open === "string" ? "Cập nhật" : "Thêm size"}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SizeAddandUpdate;
