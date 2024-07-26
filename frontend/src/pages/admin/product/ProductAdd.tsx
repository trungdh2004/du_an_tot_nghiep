import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { array, z } from "zod";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
	AiOutlineCloudUpload,
	AiOutlineLoading3Quarters,
	AiFillCloseCircle,
} from "react-icons/ai";
import { cn } from "@/lib/utils";
import { uploadFileService, uploadMultipleFileService } from "@/service/upload";
import { useProcessBarLoading } from "@/store/useSidebarAdmin";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategory } from "@/service/category-admin";
import { getAllSize } from "@/service/size-admin";
import instance from "@/config/instance";
import { IColor, IProduct } from "@/types/typeProduct";
import { MdDeleteForever } from "react-icons/md";
import FroalaEditor from "@/components/common/Froala";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addProduct } from "@/service/product";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
	name: z.string().nonempty("Nhập tên sản phẩm"),
	price: z.number().min(1, "Phải lớn hơn 0"),
	description: z.string().nonempty("Nhập mô tả sản phẩm"),
	discount: z.number().min(1, "Phải lớn hơn 0"),
	category: z.string().nonempty("Chọn loại sản phẩm"),
	attributes: z
		.array(
			z.object({
				color: z.string().nonempty("Mời bạn chọn color"),
				size: z.string().nonempty("Mời bạn chọn size"),
				price: z.number().min(1, "Phải lớn hơn 0"),
				quantity: z.number().min(1, "Phải lớn hơn 0"),
				discount: z.number().min(1, "Phải lớn hơn 0"),
			}),
		)
		.refine(
			(arr) => {
				// const prices = arr.map((item) => item.price);
				const combinations = arr.map((item) => `${item.color}-${item.size}`);
				return new Set(combinations).size === combinations.length;
			},
			{
				message: "Bạn nhập trùng màu và kích cỡ",
			},
		),
	featured: z.boolean(),
	thumbnail: z.string().refine(
		(data) => {
			return !!data;
		},
		{ message: "Nhập ảnh sản phẩm" },
	),
	images: z
		.array(
			z.object({
				url: z.string(),
				file: z.instanceof(File).optional(),
			}),
		)
		.refine(
			(data) => {
				return data.length !== 0;
			},
			{ message: "Nhập ảnh khác" },
		),
});

const ProductAddandUpdate = () => {
	const router = useNavigate();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			category: "",
			// 	price: 0,
			// 	discount: 0,
			featured: false,
			description: "",
			thumbnail: "",
			attributes: [{ size: "", color: "", price: 0, quantity: 0, discount: 0 }],
			images: [],
		},
	});
	const { isOpen, setOpen, setClose } = useProcessBarLoading();
	const [previewUrl, setPreviewUrl] = useState({
		isLoading: false,
		url: "",
	});
	const [images, setImages] = useState<ImageListType>([]);
	const maxNumber = 8; // Số lượng ảnh tối đa có thể tải lên
	const [category, setCategory] = useState([]);
	const [size, setSize] = useState([]);
	const [color, setColor] = useState([]);
	const [isPending, setIsPending] = useState(false);
	const { mutate } = useMutation({
		mutationFn: (value: IProduct) => addProduct(value),
		onSuccess: () => {
			toast.success("Thêm sản phẩm thành công");
			form.reset();
			router("/admin/product");
		},
		onError: () => {
			toast.error("Thêm sản phẩm thất bại");
		},
	});
	useEffect(() => {
		(async () => {
			try {
				const { data: dataCate } = await getAllCategory();
				const { data: dataSize } = await getAllSize();
				const { data } = await instance.get("/color/getAll");
				setCategory(dataCate.data);
				setSize(dataSize.data);
				setColor(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const control = form.control;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "attributes",
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const listImageNotFile = values.images?.filter((image) => !image?.file);
			const listImageFile = values.images?.filter((image) => image?.file);
			let listImage;

			if (listImageFile?.length > 0) {
				const formData = new FormData();
				for (let i = 0; i < listImageFile?.length; i++) {
					formData.append("images", listImageFile[i]?.file as any);
				}

				const { data } = await uploadMultipleFileService(formData);

				listImage = data?.map((item: any) => ({
					url: item.path,
				}));
			}
			const images = [...listImageNotFile, ...listImage];
			const data: IProduct = { ...values, images };
			mutate(data);
		} catch (error) {
			toast.error("Tạo sản phẩm xảy ra lỗi");
		}
	};
	const handleUploadFile = async (file: File) => {
		try {
			setOpen();
			const formdata = new FormData();
			formdata.append("image", file);
			const { data } = await uploadFileService(formdata);
			URL.revokeObjectURL(previewUrl.url);
			setPreviewUrl({
				url: data.path,
				isLoading: false,
			});
			return data.path;
		} catch (error) {
			console.error(error);
		} finally {
			setClose();
		}
	};

	return (
		<div>
			<h4 className="font-medium md:text-xl text-base">Thêm mới sản phẩm</h4>
			<button
				onClick={() => {
					console.log("values", form.getValues());
				}}
			>
				click
			</button>
			<div className="w-full gap-5 grid lg:grid-cols-12 mt-4">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 flex gap-5 w-full lg:col-span-9"
					>
						<div className="w-full">
							<div className=" w-[full] grid grid-cols-2 gap-2">
								<div className="col-span-2 sm:col-span-1 ">
									<FormField
										disabled={isPending}
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tên sản phẩm</FormLabel>
												<FormControl>
													<Input
														placeholder="Tên sản phẩm"
														{...field}
														// onChange={(e) => setName(e.target.value)}
													/>
												</FormControl>

												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<FormField
										disabled={isPending}
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Giá sản phẩm</FormLabel>
												<FormControl>
													<Input
														placeholder="Giá sản phẩm"
														type="number"
														{...field}
														onChange={(event) => {
															return field.onChange(+event.target.value);
														}}
													/>
												</FormControl>

												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								{/* category */}
								<div className="col-span-2 sm:col-span-1">
									<FormField
										disabled={isPending}
										control={form.control}
										name="category"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Danh mục</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value ? field.value : ""}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Lựa chọn danh mục" />
														</SelectTrigger>
														<SelectContent>
															{category.map((category: any) => (
																<SelectItem
																	key={category._id}
																	value={category._id}
																>
																	{category.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>

												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<FormField
										disabled={isPending}
										control={form.control}
										name="discount"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Giảm giá</FormLabel>
												<FormControl>
													<Input
														placeholder="Giảm giá sản phẩm"
														type="number"
														{...field}
														onChange={(event) =>
															field.onChange(+event.target.value)
														}
													/>
												</FormControl>

												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								{/* ảnh */}
								<div className="col-span-2 sm:col-span-1">
									<FormField
										disabled={isPending}
										control={form.control}
										name="thumbnail"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Ảnh sản phẩm</FormLabel>
												<FormControl>
													<div className="w-full ">
														<label
															htmlFor="file-upload"
															className={cn("w-full relative ")}
														>
															<div className="w-full border rounded-sm bg-white relative">
																<div
																	className={cn(
																		"w-full h-[160px] flex justify-center items-center flex-col",
																		previewUrl?.url && "hidden",
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

																<div
																	className={cn(
																		" relative flex justify-center items-center h-[160px]",
																		previewUrl?.url ? "" : "hidden",
																	)}
																>
																	<img
																		src={previewUrl?.url}
																		className={cn(
																			"size-[140px] object-cover border border-slate-100",
																		)}
																		id="preview"
																	/>
																</div>

																{previewUrl?.isLoading && (
																	<div className="absolute bg-slate-50/50 w-full inset-0 flex items-center justify-center">
																		<AiOutlineLoading3Quarters
																			size={20}
																			strokeWidth="4px"
																			className="animate-spin w-full "
																		/>
																	</div>
																)}
															</div>
														</label>
														<input
															type="file"
															name=""
															id="file-upload"
															accept="image/jpeg, image/png,image/svg,image/jpg,image/webp"
															onChange={(event) =>
																field.onChange(async () => {
																	setPreviewUrl({
																		url: URL.createObjectURL(
																			(event?.target as HTMLInputElement)
																				?.files?.[0] as File,
																		),
																		isLoading: true,
																	});
																	form.clearErrors("thumbnail");
																	const url = await handleUploadFile(
																		(event?.target as HTMLInputElement)
																			?.files?.[0] as File,
																	);
																	form.setValue("thumbnail", url);
																})
															}
															hidden
															className="hidden outline-none focus-visible:ring-0 "
														/>
													</div>
												</FormControl>

												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<FormField
										disabled={isPending}
										control={form.control}
										name="images"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Ảnh khác</FormLabel>
												<FormControl>
													<div className="w-full ">
														<ImageUploading
															multiple
															value={images}
															onChange={async (imageList: ImageListType) => {
																try {
																	setImages(imageList);
																	form.setValue("images", imageList || []);
																} catch (error) {
																	console.log(error);
																} finally {
																	setClose();
																}
															}}
															maxNumber={maxNumber}
															dataURLKey="url"
														>
															{({
																imageList,
																onImageUpload,
																onImageRemove,
																onImageUpdate,
																dragProps,
															}) => {
																return (
																	// Khu vực kéo và thả hoặc nhấp để tải ảnh
																	<div
																		className={cn(
																			"w-full relative h-[160px] rounded-sm border grid grid-cols-4 grid-rows-2 gap-1 p-1 bg-white",
																			form.formState.errors.images &&
																				"border-red-500",
																		)}
																	>
																		{imageList?.map(
																			(image: any, index: number) => {
																				return (
																					<div className="col-span-1 row-span-1">
																						<div
																							// key={index}
																							className=" relative w-full h-full border rounded flex justify-center items-center"
																						>
																							<img
																								src={image?.url}
																								alt=""
																								onClick={() =>
																									onImageUpdate(index)
																								}
																								className="cursor-pointer h-[90%] object-cover aspect-square"
																							/>
																							<AiFillCloseCircle
																								className="absolute top-2 right right-0 cursor-pointer"
																								size={20}
																								onClick={() =>
																									onImageRemove(index)
																								}
																							/>
																						</div>
																					</div>
																				);
																			},
																		)}
																		<button
																			onClick={onImageUpload}
																			{...dragProps}
																			className={cn(
																				"col-span-1 row-span-1 relative w-full h-full border rounded flex justify-center items-center",
																				images.length === maxNumber && "hidden",
																			)}
																		>
																			<AiOutlineCloudUpload
																				size={50}
																				strokeWidth={1}
																			/>
																		</button>
																	</div>
																);
															}}
														</ImageUploading>
													</div>
												</FormControl>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								{/* attribute */}
								<div className="col-span-2 space-y-2">
									<FormLabel
										className={cn(
											"",
											form.formState.errors.attributes && "text-red-500",
										)}
									>
										Biến thể
									</FormLabel>
									<div
										className={cn(
											"flex flex-col w-full border p-4 md:p-6 gap-5 rounded-lg items-center",
											form.formState.errors.attributes && "border-red-500",
										)}
									>
										<ul className="flex w-full flex-col justify-between gap-4">
											{fields.map((item, index) => (
												<li
													key={item.id}
													className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full gap-4 border-b pb-2"
												>
													<FormField
														disabled={isPending}
														control={control}
														name={`attributes.${index}.size`}
														render={({ field }) => (
															<FormItem className="flex w-full flex-col">
																<FormLabel>Kích thước</FormLabel>
																<FormControl>
																	<Select onValueChange={field.onChange}>
																		<SelectTrigger className="w-full">
																			<SelectValue placeholder="Lựa chọn Size" />
																		</SelectTrigger>
																		<SelectContent>
																			{size.map((size: any) => (
																				<SelectItem
																					key={size._id}
																					value={size._id}
																					className="cursor-pointer"
																				>
																					{size.name}
																				</SelectItem>
																			))}
																		</SelectContent>
																	</Select>
																</FormControl>
																<FormMessage className="text-xs" />
															</FormItem>
														)}
													/>
													<div className="flex flex-col w-full gap-2">
														<FormField
															disabled={isPending}
															name={`attributes.${index}.color`}
															control={control}
															render={({ field }) => (
																<FormItem className="flex w-full flex-col">
																	<FormLabel>Màu</FormLabel>
																	<FormControl>
																		<Select onValueChange={field.onChange}>
																			<SelectTrigger className="w-full">
																				<SelectValue placeholder="Lựa chọn color" />
																			</SelectTrigger>
																			<SelectContent>
																				{color?.map((item: IColor) => (
																					<SelectItem
																						value={item?._id.toString()}
																						className="flex justify-between w-full cursor-pointer"
																						key={item?._id}
																					>
																						{item.name}
																						<div
																							className="w-2 h-2 inline-block rounded-full ml-1"
																							style={{
																								backgroundColor: item.code,
																							}}
																						></div>
																					</SelectItem>
																				))}
																			</SelectContent>
																		</Select>
																	</FormControl>
																	<FormMessage className="text-xs" />
																</FormItem>
															)}
														/>
													</div>
													<FormField
														disabled={isPending}
														name={`attributes.${index}.price`}
														control={control}
														render={({ field }) => (
															<FormItem className="flex w-full flex-col">
																<FormLabel>Giá</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Giá"
																		type="number"
																		{...field}
																		className=""
																		onChange={(event) =>
																			field.onChange(+event.target.value)
																		}
																	/>
																</FormControl>
																<FormMessage className="text-xs" />
															</FormItem>
														)}
													/>
													<FormField
														disabled={isPending}
														name={`attributes.${index}.quantity`}
														control={control}
														render={({ field }) => (
															<FormItem className="flex w-full flex-col">
																<FormLabel>Số lượng</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Số lượng"
																		type="number"
																		{...field}
																		className=""
																		onChange={(event) =>
																			field.onChange(+event.target.value)
																		}
																	/>
																</FormControl>
																<FormMessage className="text-xs" />
															</FormItem>
														)}
													/>
													<FormField
														disabled={isPending}
														name={`attributes.${index}.discount`}
														control={control}
														render={({ field }) => (
															<FormItem className="flex w-full flex-col">
																<FormLabel>Giảm giá</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Giảm giá"
																		type="number"
																		{...field}
																		className=""
																		onChange={(event) =>
																			field.onChange(+event.target.value)
																		}
																	/>
																</FormControl>
																<FormMessage className="text-xs" />
															</FormItem>
														)}
													/>
													<div className="w-full flex justify-center items-center">
														<button
															type="button"
															onClick={() => {
																remove(index);
															}}
															className={cn(
																"hover:bg-gray-100 p-1 rounded-full",
																fields?.length === 1 && "opacity-30",
															)}
															disabled={fields?.length === 1}
														>
															<MdDeleteForever
																size={20}
																className="text-red-500"
															/>
														</button>
													</div>
												</li>
											))}
										</ul>
										<button
											type="button"
											onClick={() =>
												append({
													size: "",
													color: "",
													price: 0,
													quantity: 0,
													discount: 0,
												})
											}
										>
											<CiCirclePlus size={25} />
										</button>
									</div>
									{form.formState.errors.attributes?.root && (
										<FormMessage className="text-xs">
											{form?.formState?.errors?.attributes?.root?.message}
										</FormMessage>
									)}
								</div>

								<div className="col-span-2">
									<FormField
										disabled={isPending}
										name="description"
										control={control}
										render={({ field }) => (
											<FormItem className="flex w-full flex-col">
												<FormLabel>Mô tả</FormLabel>
												<FormControl>
													<FroalaEditor
														content={field.value}
														onChangeContext={field.onChange}
													/>
												</FormControl>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<Button type="submit" disabled={isPending} className="mt-4">
								Thêm sản phẩm
							</Button>
						</div>
					</form>
				</Form>
				<div className="hidden lg:block lg:col-span-3 p-4 ">
					<div className="w-full border rounded">
						<img
							src={
								form.watch("thumbnail") ||
								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixbrVNY9XIHQBZ1iehMIV0Z9AtHB9dp46lg&s"
							}
							alt=""
							className="w-full object-cover max-h-[200px] border-b"
						/>

						<div className="p-3 bg-white">
							<p className="font-medium line-clamp-1">
								{form.watch("name") || "Chưa có tên"}
							</p>

							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-red-500">
									{form.watch("price") || 0} đ
								</span>
								{/* <span className="text-xs">
								Đã bán {formatQuantitySort(151551)}
							</span> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductAddandUpdate;
