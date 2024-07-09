import FroalaEditor from "@/components/common/Froala";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Textarea } from "@/components/ui/textarea";
import useDebounce from "@/hooks/shared";
import { cn } from "@/lib/utils";
import { newBlogs } from "@/service/blog";
import { uploadFileService } from "@/service/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { z } from "zod";
const NewBlog = () => {
	const [previewUrl, setPreviewUrl] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();
	const formSchema = z.object({
		title: z.string({
			required_error: "Tiêu đề bài viết là bắt buộc",
			invalid_type_error: "Tiêu đề bài viết là một chuỗi",
		}),
		content: z.string({
			required_error: "Nội dung bài viết là bắt buộc",
			invalid_type_error: "Nội dung bài viết là một chuỗi",
		}),
		published_at: z.date({
			required_error: "Ngày đăng là bắt buộc",
			invalid_type_error: "Ngày đăng không đúng định dạng",
		}),
		selected_tags: z
			.array(
				z.object({
					value: z.string(),
					label: z.string(),
				}),
			)
			.nonempty({
				message: "Bạn chưa chọn nhãn",
			}),
		thumbnail_url: z.string({ required_error: "Ảnh thu nhỏ là bắt buộc" }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const handleAutoSave = async () => {
		const payload = form.getValues();
		console.log(payload);

		const { data } = await newBlogs(payload);
		navigate(`/admin/blogs/${data?._id}/edit`);
	};
	const handleUploadFile = async (file: File) => {
		const formdata = new FormData();
		formdata.append("image", file);
		const { data } = await uploadFileService(formdata);
		console.log(data);
		setPreviewUrl(data.path);
		return data.path;
	};
	const debouncedChangeHandler = useDebounce(() => {
		handleAutoSave();
	}, 5000);

	const options = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
		{ value: "strawberry1", label: "Strawberry1" },
		{ value: "vanilla1", label: "Vanilla1" },
	];

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("values:", values);
	}
	return (
		<div className="">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-6 gap-6 grid-flow-row-dense"
				>
					<div className="col-span-6 order-1 md:order-none">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="">
											<Input
												placeholder="Tiêu đề"
												{...field}
												onChange={(event) =>
													field.onChange(() => {
														const title = (event.target as HTMLInputElement)
															.value;
														form.clearErrors("title"),
															(title == "" || title == null) &&
																form.setError("title", {
																	type: "custom",
																	message: "Tiêu đề nội dung là bắt buộc",
																});

														form.setValue("title", title),
															debouncedChangeHandler();
													})
												}
												className="bg-transparent py-5 border-none outline-none focus-visible:ring-0 text-2xl font-semibold text-black"
											/>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-6 order-3 md:order-none md:col-span-4  z-[1] relative">
						<FroalaEditor
							content={content}
							onChangeContext={(value) => {
								debouncedChangeHandler();
								setContent(value);
								form.setValue("content", value);
								form.clearErrors("content");
								if (value == "" || value == null) {
									form.setError("content", {
										type: "custom",
										message: "Nội dung bài viết là bắt buộc",
									});
								}
							}}
						/>
						{/*  */}
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											defaultValue={content}
											{...field}
											className="hidden"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="col-span-6 order-2 md:order-none md:col-span-2 md:col-end-7 ">
						<div className=" bg-white box-shadow  rounded-lg ">
							<h3 className="font-semibold text-base py-2 px-5 ">Phát hành</h3>
							<div className="px-5 py-3 border-y border-gray-200">
								<FormField
									control={form.control}
									name="published_at"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Ngày đăng</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full flex justify-between items-center pl-3 text-left font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																format(field.value, "PPP", {
																	locale: vi,
																})
															) : (
																<span>Chọn ngày</span>
															)}
															<MdOutlineCalendarMonth />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<Calendar
														locale={vi}
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
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
							<div className="flex items-center justify-end px-5 py-3">
								<Button
									type="submit"
									className="py-0.5 px-5 bg-red-500 hover:bg-red-400"
								>
									Công khai
								</Button>
							</div>
						</div>
					</div>
					<div className="col-span-6 order-4 md:order-none  md:col-span-2 md:col-end-7 ">
						<div className={cn("bg-white box-shadow  rounded-lg")}>
							<FormField
								control={form.control}
								name="selected_tags"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Accordion type="single" collapsible className="w-full">
												<AccordionItem value="item-1" className="border-none">
													<AccordionTrigger className="pt-0 px-5 py-3 border-none">
														<FormLabel>Nhãn</FormLabel>
													</AccordionTrigger>
													<AccordionContent className="px-5">
														<div>
															<Select
																options={options}
																isMulti
																{...field}
																className="react-select-container"
																classNamePrefix="react-select"
																onChange={(e) => {
																	field.onChange(e);
																}}
															/>
														</div>
														<FormMessage />
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										</FormControl>
									</FormItem>
								)}
							></FormField>
						</div>
					</div>
					<div className="col-span-6 order-5 md:order-none  md:col-span-2 md:col-end-7 ">
						<div className=" bg-white box-shadow  rounded-lg ">
							<FormField
								control={form.control}
								name="thumbnail_url"
								render={({ field }) => (
									<FormItem className="flex flex-wrap  items-center ">
										<FormControl>
											<Accordion type="single" collapsible className="w-full ">
												<AccordionItem value="item-1" className="border-none">
													<AccordionTrigger className="pt-0 px-5 py-3 border-none">
														<FormLabel>Hình ảnh thu nhỏ</FormLabel>
													</AccordionTrigger>
													<AccordionContent className="px-5 ">
														<div className="w-full ">
															<label
																htmlFor="file-upload"
																className={cn(
																	"w-full relative cursor-pointer  rounded-lg p-6",
																)}
																id=""
															>
																<div
																	className={cn(
																		"flex flex-col justify-center items-center ",
																		previewUrl && "hidden",
																	)}
																>
																	<AiOutlineCloudUpload
																		size={50}
																		strokeWidth={1}
																	/>
																	<h3 className="mt-2 text-sm font-medium text-gray-900">
																		<span>Chọn ảnh</span>
																	</h3>
																	<p className="mt-1 text-xs text-gray-500">
																		PNG, JPG, GIF.
																	</p>
																</div>
																<img
																	src={previewUrl}
																	className={cn(
																		"w-full relative max-h-[180px] object-cover",
																		previewUrl ? "" : "hidden",
																	)}
																	id="preview"
																/>
															</label>
															<input
																type="file"
																name=""
																id="file-upload"
																onChange={(event) =>
																	field.onChange(async () => {
																		setPreviewUrl(
																			URL.createObjectURL(
																				(event?.target as HTMLInputElement)
																					?.files?.[0] as File,
																			),
																		);
																		form.setValue("thumbnail_url", previewUrl);
																		form.clearErrors("thumbnail_url");
																		const url = await handleUploadFile(
																			(event?.target as HTMLInputElement)
																				?.files?.[0] as File,
																		);
																		form.setValue("thumbnail_url", url);

																		URL.revokeObjectURL(previewUrl);
																	})
																}
																hidden
																className="hidden outline-none focus-visible:ring-0 "
															/>
															<Input
																type="text"
																placeholder="Hình ảnh thu nhỏ"
																{...field}
																className="hidden outline-none focus-visible:ring-0 "
															/>
														</div>
														<FormMessage />
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default NewBlog;
