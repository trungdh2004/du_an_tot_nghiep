import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import SignInWithFacebookOrGoogle from "./SignInWithFacebookOrGoogle";
import { createAccount } from "@/service/account";
import { toast } from "sonner";
import { AxiosError } from "axios";

const Register = () => {
	const formSchema = z
		.object({
			userName: z.string({ required_error: "Bạn chưa nhập tên đăng nhập" }),
			email: z
				.string({ required_error: "Bạn chưa  nhập email" })
				.email({ message: "Bạn nhập email không đúng định dạng" }),
			password: z
				.string({ required_error: "Bạn phải nhập mật khẩu" })
				.min(6, { message: "Mật khẩu ít nhất phải 6 ký tự" }),
			forgotPassword: z
				.string({ required_error: "Bạn phải nhập xác nhận mật khẩu" })
				.min(6, { message: "Mật khẩu ít nhất phải 6 ký tự" }),
		})
		.refine((data) => data.password === data.forgotPassword, {
			message: "Mật khẩu không khớp",
			path: ["forgotPassword"],
		});
	const [isPassword, setIsPassword] = useState(false);
	const [isConfrimPassword, setIsConfrimPassword] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: "",
			email: "",
			password: "",
			forgotPassword: "",
		},
	});
	const onSubmit = async (payload: z.infer<typeof formSchema>) => {
		try {
			const { data } = await createAccount(payload);
			toast.success(data?.message);
		} catch (error: any) {
			toast.error(error.response!.data!.message);
		}
	};
	return (
		<div className="">
			<Link
				to={"/"}
				className="dark:bg-slate-600 relative flex items-center justify-center max-w-36 mt-10 ml-12 p-3 bg-white rounded-lg shadow-lg"
			>
				<IoIosArrowRoundBack size={20} className="mr-4" /> Trang chủ
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
			</Link>
			<div className="dark:bg-slate-800 w-full max-w-xs md:max-w-sm mx-auto mt-5  px-8 py-9 bg-white shadow-md border border-gray-200 rounded-2xl">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className=" space-y-5">
							<h2 className="text-center text-xl font-bold">Đăng ký</h2>
							<SignInWithFacebookOrGoogle />
							<div className=" space-y-1">
								<div className="">
									<FormField
										control={form.control}
										name="userName"
										render={({ field }) => (
											<FormItem className="space-y-0">
												<FormLabel>Tên đăng nhập</FormLabel>
												<FormControl className="">
													<Input {...field} className="" type="text" />
												</FormControl>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								<div className="">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="space-y-0">
												<FormLabel>Email</FormLabel>
												<FormControl className="">
													<Input {...field} className="" />
												</FormControl>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								<div>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="space-y-0">
												<FormLabel>Mật khẩu</FormLabel>
												<div className="relative">
													<FormControl>
														<Input
															{...field}
															type={isPassword ? "text" : "password"}
														/>
													</FormControl>
													{isPassword ? (
														<FaRegEyeSlash
															onClick={() => setIsPassword((prev) => !prev)}
															size={18}
															className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
														/>
													) : (
														<FaRegEye
															onClick={() => setIsPassword((prev) => !prev)}
															size={18}
															className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
														/>
													)}
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div>
									<FormField
										control={form.control}
										name="forgotPassword"
										render={({ field }) => (
											<FormItem className="space-y-0">
												<FormLabel className="text-xs">
													Xác nhận mật khẩu
												</FormLabel>
												<div className="relative">
													<FormControl>
														<Input
															{...field}
															type={isConfrimPassword ? "text" : "password"}
														/>
													</FormControl>
													{isConfrimPassword ? (
														<FaRegEyeSlash
															onClick={() =>
																setIsConfrimPassword((prev) => !prev)
															}
															size={18}
															className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
														/>
													) : (
														<FaRegEye
															onClick={() =>
																setIsConfrimPassword((prev) => !prev)
															}
															size={18}
															className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
														/>
													)}
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
						<Button
							type="submit"
							className="w-full mt-3 mb-6 text-white text-base font-bold bg-blue-500 hover:bg-blue-400"
						>
							Đăng ký
						</Button>
						<p className="text-center">
							Bạn đã có tài khoản ?{" "}
							<Link to={"/auth/login"} className="text-blue-500">
								Đăng nhập
							</Link>
						</p>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Register;
