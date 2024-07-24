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
import { MdDelete } from "react-icons/md";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategory } from "@/service/category-admin";
import { getAllSize } from "@/service/size-admin";
import instance from "@/config/instance";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const formSchema = z.object({
	name: z.string().min(1, {
		message: "Bạn phải nhập tên sản phẩm",
	}),
	price: z.number().min(1, "Phải lớn hơn 0"),
	description: z.string().min(1, {
		message: "Bạn phải nhập mô tả cho sản phẩm",
	}),
	discount: z.number().min(1, "Phải lớn hơn 0"),
	category: z.string().nonempty("Mời bạn chọn Category"),
	variants: z.array(
		z.object({
			color: z.string().nonempty("Mời bạn chọn color"),
			size: z.string().nonempty("Mời bạn chọn size"),
			priceVar: z.number().min(1, "Phải lớn hơn 0"),
			quantity: z.number().min(1, "Phải lớn hơn 0"),
			discountVar: z.number().min(1, "Phải lớn hơn 0"),
		}),
	),
	featured: z.boolean(),
});
const ProductAddandUpdate = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			category: "",
			price: 0,
			discount: 0,
			featured: false,
			description: "",
			thumbnail_url: "",
			variants: [
				{ size: "", color: "", priceVar: 0, quantity: 0, discountVar: 0 },
			],
			array_image: [],
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
	// const [color, setColor] = useState([]);
	const [img, setImg] = useState<any>({
		isLoading: false,
		url: [],
	});
	const [name, setName] = useState<string | null>(null);
	const [price, setPrice] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllCategory();
				setCategory(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllSize();
				setSize(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const { data } = await instance.get("/color/getAll");
	// 			console.log(data);
	// 			setColor(data.data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// }, []);
	const color = [
		{ _id: 1, name: "Đỏ" },
		{ _id: 2, name: "Vàng" },
		{ _id: 3, name: "Xanh lá" },
		{ _id: 4, name: "Trắng" },
		{ _id: 5, name: "Đen" },
		{ _id: 6, name: "Tím" },
	];
	const control = form.control;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "variants",
	});
	const onSubmit = (data: any) => {
		setIsPending(true);
		console.log(data);
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
	// const onImageRemove = (index: number) => {
	// 	const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
	// 	setImages(updatedImages);
	// 	const updatedArrayImage = updatedImages.map((image) => image.data_url);
	// 	form.setValue("array_image", updatedArrayImage as any);
	// };
	return (
		<div className="w-full flex gap-5">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 flex gap-5 w-[75%]"
				>
					<div className="w-full">
						<div className="flex w-[full] gap-4">
							<div className="w-[50%] flex flex-col gap-4">
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

											<FormMessage />
										</FormItem>
									)}
								/>
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

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									disabled={isPending}
									control={form.control}
									name="thumbnail_url"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ảnh sản phẩm</FormLabel>
											<FormControl>
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
																"flex flex-col justify-center items-center border rounded-lg py-5 ",
																previewUrl?.url && "hidden",
															)}
														>
															<AiOutlineCloudUpload size={50} strokeWidth={1} />
															<h3 className="mt-2 text-sm font-medium text-gray-900">
																<span>Chọn ảnh</span>
															</h3>
															<p className="mt-1 text-xs text-gray-500">
																PNG, JPG, GIF.
															</p>
														</div>
														<div className="max-h-[180px] relative">
															<img
																src={previewUrl?.url}
																className={cn(
																	"w-50% mx-auto relative max-h-[180px] object-cover",
																	previewUrl?.url ? "" : "hidden",
																)}
																id="preview"
															/>
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
														onChange={(event) =>
															field.onChange(async () => {
																setPreviewUrl({
																	url: URL.createObjectURL(
																		(event?.target as HTMLInputElement)
																			?.files?.[0] as File,
																	),
																	isLoading: true,
																});
																form.clearErrors("thumbnail_url");
																const url = await handleUploadFile(
																	(event?.target as HTMLInputElement)
																		?.files?.[0] as File,
																);
																form.setValue("thumbnail_url", url);
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
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="featured"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mt-5">
											<div className="space-y-1 leading-none">
												<FormLabel>Featured</FormLabel>
											</div>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div className="w-[50%] flex flex-col gap-4">
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
														<SelectGroup>
															<SelectLabel>Lựa chọn danh mục</SelectLabel>
															{category.map((category: any) => (
																<SelectItem
																	key={category._id}
																	value={category._id}
																>
																	{category.name}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
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

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									disabled={isPending}
									control={form.control}
									name="array_image"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mảng Ảnh sản phẩm</FormLabel>
											<FormControl>
												<div className="w-full ">
													<label
														htmlFor="array_image"
														className={cn(
															"w-full relative cursor-pointer  rounded-lg p-6",
														)}
														id=""
													></label>
													<ImageUploading
														multiple
														value={images}
														onChange={async (imageList: ImageListType) => {
															try {
																setOpen();
																const formData = new FormData();
																for (let i = 0; i < imageList.length; i++) {
																	formData.append(
																		"images",
																		imageList[i].file as any,
																	);
																}
																const dataImg =
																	await uploadMultipleFileService(formData);
																const arrImg = dataImg?.data?.map(
																	(image: any) => {
																		return image?.path;
																	},
																);
																console.log(arrImg);
																const dataImage = arrImg?.map((image: any) => {
																	return { data_url: image };
																});
																console.log(imageList);

																console.log(dataImage);
																setImages(dataImage);
																form.setValue("array_image", arrImg);
															} catch (error) {
																console.log(error);
															} finally {
																setClose();
															}
														}}
														maxNumber={maxNumber}
														dataURLKey="data_url"
													>
														{({
															imageList,
															onImageUpload,
															onImageRemove,
															onImageRemoveAll,
															onImageUpdate,
															isDragging,
															dragProps,
														}) => {
															return (
																// Khu vực kéo và thả hoặc nhấp để tải ảnh
																<div className=" flex-col justify-center items-center border rounded-lg py-5">
																	<div className="flex justify-center items-center ">
																		<button
																			style={
																				isDragging
																					? { color: "red" }
																					: undefined
																			}
																			onClick={onImageUpload}
																			{...dragProps}
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
																		</button>
																		<MdDelete
																			onClick={onImageRemoveAll}
																			size={30}
																			className="cursor-pointer"
																		/>
																	</div>
																	<div className="grid grid-cols-4 gap-3 p-3">
																		{imageList.map(
																			(image: any, index: number) => {
																				console.log(image, index);
																				return (
																					<div
																						key={index}
																						className="image-item relative"
																					>
																						<img
																							src={image.data_url}
																							alt=""
																							width="100"
																							onClick={() =>
																								onImageUpdate(index)
																							}
																							className="cursor-pointer w-full h-[100px]"
																						/>
																						<AiFillCloseCircle
																							className="absolute top-2 right-2 cursor-pointer"
																							size={20}
																							onClick={() =>
																								onImageRemove(index)
																							}
																						/>
																					</div>
																				);
																			},
																		)}
																	</div>
																</div>
															);
														}}
													</ImageUploading>
													<Input
														type="text"
														placeholder="Hình ảnh thu nhỏ"
														{...field}
														className="hidden outline-none focus-visible:ring-0 "
													/>
												</div>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="w-[full]">
							<FormField
								disabled={isPending}
								name="description"
								control={control}
								render={({ field }) => (
									<FormItem className="flex w-full flex-col">
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Hãy viết gì đó cho sản phẩm này"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h3>Thêm biến thể</h3>
							<div className="flex flex-col w-full border p-9 gap-5 rounded-lg items-center">
								<ul className="flex w-full flex-col justify-between gap-4">
									{fields.map((item, index) => (
										<li
											key={item.id}
											className="flex  w-full justify-between gap-4"
										>
											<FormField
												disabled={isPending}
												control={control}
												name={`variants.${index}.size`}
												render={({ field }) => (
													<FormItem className="flex w-full flex-col">
														<FormLabel>Size</FormLabel>
														<FormControl>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value ? field.value : ""}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Lựa chọn Size" />
																</SelectTrigger>
																<SelectContent>
																	<SelectGroup>
																		<SelectLabel>Lựa chọn Size</SelectLabel>
																		{size.map((category: any) => (
																			<SelectItem
																				key={category._id}
																				value={category._id}
																			>
																				{category.name}
																			</SelectItem>
																		))}
																	</SelectGroup>
																</SelectContent>
															</Select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="flex flex-col w-full gap-2">
												<FormField
													disabled={isPending}
													name={`variants.${index}.color`}
													control={control}
													render={({ field }) => (
														<FormItem className="flex w-full flex-col">
															<FormLabel>Color</FormLabel>
															<FormControl>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={field.value ? field.value : ""}
																>
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Lựa chọn color" />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectGroup>
																			<SelectLabel>Lựa chọn Color</SelectLabel>
																			{color.map((category: any) => (
																				<SelectItem
																					key={category._id}
																					value={category._id}
																				>
																					{category.name}
																				</SelectItem>
																			))}
																		</SelectGroup>
																	</SelectContent>
																</Select>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<FormField
												disabled={isPending}
												name={`variants.${index}.priceVar`}
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
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												disabled={isPending}
												name={`variants.${index}.quantity`}
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
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												disabled={isPending}
												name={`variants.${index}.discountVar`}
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
														<FormMessage />
													</FormItem>
												)}
											/>
											{index > 0 ? (
												<button type="button" onClick={() => remove(index)}>
													<CiCircleMinus size={25} />
												</button>
											) : (
												<button
													type="button"
													onClick={() => remove(index)}
													disabled
													className="opacity-10 "
												>
													<CiCircleMinus size={25} />
												</button>
											)}
										</li>
									))}
								</ul>
								<button
									type="button"
									onClick={() =>
										append({
											size: "",
											color: "",
											priceVar: 0,
											quantity: 0,
											discountVar: 0,
										})
									}
								>
									<CiCirclePlus size={25} />
								</button>
							</div>
						</div>
						<Button type="submit" disabled={isPending}>
							Thêm sản phẩm
						</Button>
					</div>
				</form>
			</Form>
			<div className="w-[25%] py-8">
				{/* <div className="flex-col w-full gap-4">
					<img src={form.watch("thumbnail_url")} alt="" className="w-full" />
					<div className="flex justify-between">
						<span>{form.watch("name")}</span>
						<span>{form.watch("price")}</span>
					</div>
				</div> */}

				<div className="w-full">
					<img src={form.watch("thumbnail_url")} alt="" className="w-full" />
				</div>
				<div className="p-3">
					<p>{form.watch("name")}</p>
					<div className="flex items-center justify-start -space-x-1 *:size-3 *:inline-block  *:rounded-full my-1.5">
						<span
							style={{ background: "#fff" }}
							className="box-shadow border border-black/40"
						></span>
						<span
							style={{ background: "#333" }}
							className="box-shadow border border-black/40"
						></span>
						<span
							style={{ background: "#FF8A4A" }}
							className="box-shadow border border-black/40"
						></span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium text-red-500">
							{/* {formatCurrency(1551516)} */}
							{form.watch("price")}
						</span>
						{/* <span className="text-xs">
								Đã bán {formatQuantitySort(151551)}
							</span> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductAddandUpdate;
