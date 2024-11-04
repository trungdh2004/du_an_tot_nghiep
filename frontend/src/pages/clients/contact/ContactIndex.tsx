import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});
const ContactIndex = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});
	const onSubmit = () => {};
	return (
		<>
			<section className="py-10">
				<div className="padding">
					<div className="pb-14">
						<h3 className="text-[28px] font-medium text-center ">Liên Hệ</h3>
					</div>
					<div className="grid grid-cols-12 gap-5">
						<div className="col-span-12 md:col-span-5">
							<div className="max-w-[500px] w-full mx-auto">
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
											name="name"
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
											name="name"
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
										<button
											className="px-4 py-2 border border rounded-lg "
											type="submit"
										>
											Gửi liên hệ
										</button>
									</form>
								</Form>
							</div>
						</div>
						<div className="col-span-12 md:col-span-7">
							<div className="relative flex justify-center  ">
								<motion.div
									className="absolute bg-gradient-to-br from-[#9cffe97d] to-[#6b6bd56b] rounded-full inset-x-6 inset-y-14 md:inset-y-5  md:inset-x-12"
									initial={{ scale: 1 }}
									animate={{ scale: 1.05 }}
									transition={{
										duration: 2.5,
										repeat: Infinity,
										repeatType: "reverse",
									}}
								></motion.div>

								<div className="relative z-10 h-auto max-w-96">
									<img
										src="/slider-1.png"
										alt=""
										className="w-full h-full mix-blend-multiply"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className=""></div>
			</section>
		</>
	);
};

export default ContactIndex;
