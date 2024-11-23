import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaLocationDot } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { toast } from "sonner";
const formSchema = z.object({
	name: z.string({ required_error: "Bạn chưa nhập tên" }),
	email: z
		.string({ required_error: "Bạn chưa  nhập email" })
		.email({ message: "Bạn nhập email không đúng định dạng" }),
	content: z.string({ required_error: "Bạn chưa nhập nội dung" }),
});
const ContactIndex = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	const onSubmit = async (payload: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("entry.1499165544", payload?.name);
		formData.append("entry.1584898917", payload?.email);
		formData.append("entry.1002049118", payload?.content);
		const response = fetch(
			`https://docs.google.com/forms/u/0/d/e/1FAIpQLSej6HJ20CXKB2_sD7wAOI5_k5HC0artC6re2CKaq9Od4sJ4hw/formResponse`,
			{
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: formData,
			},
		);
		console.log("response: ", response);
		form.reset({
			name: "",
			email: "",
			content: "",
		});
		toast.success("Đã gửi liên hệ thành công");
	};
	return (
		<>
			<section className=" mb-36 pt-20">
				<div className="padding">
					<div className="">
						<div className="grid grid-cols-12 md:gap-5 lg:gap-10 ">
							<div className="col-span-12 lg:col-span-6">
								<div className="max-w-[500px] w-full mx-auto">
									<div className="space-y-5 pb-16">
										<div className="flex gap-3 items-center ">
											<span className="border-[1px] border-[#c9ae63]/70 p-2 rounded-full">
												<FaLocationDot color="#c9ae63" />
											</span>
											<h3 className="text-[18px]">
												Dị Nậu, Thạch Thất, Hà Nội
											</h3>
										</div>
										<div className="flex gap-3 items-center ">
											<span className="border-[1px] border-[#c9ae63]/80 p-2 rounded-full">
												<MdOutlinePhoneAndroid color="#c9ae63" />
											</span>
											<h3 className="text-[18px]">19001007</h3>
										</div>
										<div className="flex gap-3 items-center ">
											<span className="border-[1px] border-[#c9ae63]/80 p-2 rounded-full">
												<GoMail color="#c9ae63" />
											</span>
											<h3 className="text-[18px]">Nucshop@gmail.com</h3>
										</div>
									</div>
									<h3 className="text-xl font-medium pb-4">
										Liên hệ với chúng tôi
									</h3>
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(onSubmit)}
											className="space-y-8"
										>
											<FormField
												control={form.control}
												name="name"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																placeholder="Họ và tên"
																{...field}
																className="rounded-xl  outline-none"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																placeholder="Email"
																{...field}
																className="rounded-xl  outline-none"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="content"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Textarea
																placeholder="Nội dung"
																className=""
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="w-full flex justify-center lg:justify-start">
												<button
													className="px-4 py-2 border border-[#c9ae63]/80 bg-[#c9ae63] text-white  rounded-lg "
													type="submit"
												>
													Gửi liên hệ
												</button>
											</div>
										</form>
									</Form>
								</div>
							</div>
							<div className="col-span-12 lg:col-span-6">
								<div className="relative flex justify-center  ">
									<motion.div
										className="absolute bg-gradient-to-br from-[#9cffe97d] to-[#6b6bd56b] rounded-full inset-x-6 inset-y-14 md:inset-y-6 lg:inset-2  md:inset-x-12"
										initial={{ scale: 1 }}
										animate={{ scale: 1.05 }}
										transition={{
											duration: 2.5,
											repeat: Infinity,
											repeatType: "reverse",
										}}
									></motion.div>

									<div className="hidden md:flex pb-4  h-[600px] items-center  z-10 ">
										<img
											// src="https://owen.cdn.vccloud.vn/media/codazon/slideshow/a/r/artboard_1-100.jpg"
											src="/NUCC.svg"
											alt=""
											// className="w-[400px] md:rounded-[170px] lg:rounded-[130px] h-full object-cover  mix-blend-multiply"
											className="w-full md:rounded-[170px] lg:rounded-[130px] h-[230px] object-cover  mix-blend-multiply"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContactIndex;
