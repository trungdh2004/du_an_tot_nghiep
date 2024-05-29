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
import { findEmail } from "@/service/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
interface PropsFindMail {
	setStep: (val: number) => void;
	setEmail: (email: string) => void;
}
const FindEmail = ({ setStep, setEmail }: PropsFindMail) => {
	const FormSchema = z.object({
		email: z
			.string({ required_error: "Bạn chưa  nhập email" })
			.email({ message: "Bạn nhập email không đúng định dạng" }),
	});
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});
	const onSubmit = async (payload: z.infer<typeof FormSchema>) => {
		try {
			const { data } = await findEmail(payload);
			setStep(2);
			setEmail(payload.email as string);
			toast.success(data.message);
		} catch (error: any) {
			form.setError("email", { message: error.response!.data?.message });
		}
	};
	return (
		<div className="">
			<div className="flex justify-between items-center pr-5">
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
			</div>
			<div className="dark:bg-slate-800 w-full max-w-xs md:max-w-sm mx-auto mt-12  px-8 py-9 bg-white shadow-md border border-gray-200 rounded-2xl">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className=" space-y-5 ">
							<h2 className="text-left text-xl font-bold mb-10">Nhập mail</h2>
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
							</div>
						</div>

						<Button
							type="submit"
							className="w-full mt-3 mb-6 text-white text-base font-bold bg-blue-500 hover:bg-blue-400"
						>
							Xác nhận
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default FindEmail;
