import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { addCategory, getCategory, updateCategory } from "@/service/category-admin";
import instance from "@/config/instance";

interface FormDialog {
	open: boolean | string;
	title?: "Thêm danh mục" | "Cập nhật";
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
			message: "Tên danh mục không được để trống",
		}),
	description: z
		.string({
			message: "Mô tả danh mục không được để trống",
		})
		.min(1, {
			message: "Mô tả danh mục không được để trống",
		}),
});
const CategoryAdd = ({
	title,
	open,
	handleClose,
	handlePaging,
}: FormDialog) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});
	console.log(open);

	const onHandleUpdate = async (dataForm: any) => {
		try {
			const { data } = await updateCategory(open, dataForm)
			handleClose();
			handlePaging();
			toast.success("Bạn cập nhật danh mục thành công");
		} catch (error) {
			console.error("Error:", error);
		}
	};
	const onHandleAdd = async (dataForm: any) => {
		try {
			const { data } = await addCategory(dataForm)
			form.reset();
			handleClose();
			handlePaging();
			toast.success("Bạn thêm danh mục thành công");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		if (typeof open === "string") {
			(async () => {
				try {
					const { data } = await getCategory(open)
					form.reset(data.data);
				} catch (error) {
					console.error("Error:", error);
				}
			})();
		}
	}, [open]);

	const onSubmit = (data: { name: string; description: string }) => {
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
				<DialogContent className="w-[90%] sm:max-w-[660px] rounded-md max-h-[90vh] p-2 sm:p-4 overflow-y-auto">
					<DialogHeader>
						<DialogTitle>
							{typeof open === "string" ? "Cập nhật" : "Thêm danh mục"}
						</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder="Description" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">
								{typeof open === "string" ? "Cập nhật" : "Thêm danh mục"}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CategoryAdd;
