import { setItemLocal } from "@/common/localStorage";
import OverlayViolet from "@/components/OverlayViolet";
import { useAuth } from "@/hooks/auth";
import { loginAccount } from "@/service/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import { useRouterHistory } from "@/hooks/router";
import { AxiosError } from "axios";
const Login = () => {
	const routerHistory = useRouterHistory();
	const { setAuthUser, setIsLoggedIn } = useAuth();
	const formSchema = z.object({
		email: z
			.string({ required_error: "Bạn chưa  nhập email" })
			.email({ message: "Bạn nhập email không đúng định dạng" }),

		password: z
			.string({ required_error: "Bạn phải nhập mật khẩu" })
			.min(6, { message: "Mật khẩu ít nhất phải 6 ký tự" }),
	});
	const [isPassword, setIsPassword] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = async (payload: z.infer<typeof formSchema>) => {
		try {
			const { data } = await loginAccount(payload);
			console.log(data);
			setAuthUser?.(data?.user);
			setIsLoggedIn?.(true);
			setItemLocal("token", data?.accessToken);
			toast.success(data?.message);
			routerHistory();
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message);
			}
		}
	};
	return (
		<div className="">
			<OverlayViolet />

			<div className="flex justify-between items-center pr-5">
				<Link
					to={"/"}
					className="dark:bg-slate-600 relative flex items-center justify-center max-w-36 p-3 bg-white rounded-lg shadow-lg"
				>
					<IoIosArrowRoundBack size={20} className="mr-4" /> Trang chủ
				</Link>
			</div>
			<div className="dark:bg-slate-800 w-full max-w-xs md:max-w-sm mx-auto mt-12  px-8 py-9 bg-white shadow-md border border-gray-200 rounded-2xl">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className=" space-y-5 ">
							<h2 className="text-center text-xl font-bold mb-10">Đăng nhập</h2>
							<SignInWithFacebookOrGoogle />
							{/* end line */}
							<div className="space-y-1">
								<div className="">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="space-y-0">
												<FormLabel className="text-start">Email</FormLabel>
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
												<FormLabel className="text-start">Mật khẩu</FormLabel>
												<div className="relative">
													<FormControl>
														<Input
															{...field}
															type={isPassword ? "text" : "password"}
															className=""
														/>
													</FormControl>
													{isPassword ? (
														<FaRegEyeSlash
															onClick={() => setIsPassword((prev) => !prev)}
															size={18}
															className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer "
														/>
													) : (
														<FaRegEye
															onClick={() => setIsPassword((prev) => !prev)}
															size={18}
															className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
														/>
													)}
												</div>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>

						<Link
							to={"/auth/forgot-password"}
							className="float-end text-blue-500 mt-2 "
						>
							Quên mật khẩu ?
						</Link>
						<Button
							type="submit"
							className="w-full mt-3 mb-6 text-white text-base font-bold bg-blue-500 hover:bg-blue-400"
						>
							Đăng nhập
						</Button>
						<p className="text-center">
							Bạn chưa có tài khoản ?{" "}
							<Link to={"/auth/register"} className="text-blue-500">
								Đăng ký
							</Link>
						</p>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Login;
