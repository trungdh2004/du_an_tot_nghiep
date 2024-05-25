import React from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	phone: z.string().min(11, {
		message: "Phone must be at least 11 characters.",
	}),
	address: z.string(),
	city: z.string(),
	district: z.string(),
	commune: z.string(),
});
type Props = {};

const Address = (props: Props) => {
	const form = useForm({
		resolver: zodResolver(formSchema),
	});
	const onSubmit = (data: any) => {
		console.log(data);
	};
	const { data: city } = useQuery({
		queryKey: ["CITY"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province",
			);
			console.log(city);
			return data.data;
		},
	});
  const { data: district } = useQuery({
		queryKey: ["District"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district",
			);
			console.log(district);
			return data.data;
		},
	});
	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="flex flex-row gap-3">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="w-[300px]">
									<FormLabel className="mr-60">Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Họ và Tên"
											{...field}
											className="border rounded-xl"
										/>
									</FormControl>
									<FormMessage className="mr-60" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem className="w-[300px]">
									<FormLabel className="mr-52">Số điện thoại</FormLabel>
									<FormControl>
										<Input
											placeholder="Số điện thoại"
											{...field}
											className="border rounded-xl"
										/>
									</FormControl>
									<FormMessage className="mr-60" />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem className="w-[612px]">
								<FormLabel className="mr-[565px]">Địa chỉ</FormLabel>
								<FormControl>
									<Input
										placeholder="Nhập địa chỉ chi tiết"
										{...field}
										className="border rounded-xl"
									/>
								</FormControl>
								<FormMessage className="mr-[550px]" />
							</FormItem>
						)}
					/>
					<div className="flex flex-row gap-9">
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem className="w-[180px]">
									<Select
                    onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="border rounded-xl">
												<SelectValue placeholder="Select City" />
											</SelectTrigger>
										</FormControl>
                    <SelectContent className="mb-2">
                      {city?.map((city: any) => {

                        
                        
                        return (
                          <SelectItem
                            value={city}
                            className="border rounded-[30px]"
                            key={city.id}
                          >
                            {city.name}
                          </SelectItem>
                        );
                      })}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="district"
							render={({ field }) => (
								<FormItem className="w-[180px]">
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="border rounded-xl">
												<SelectValue placeholder="Select District" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="m@example.com">
												m@example.com
											</SelectItem>
											<SelectItem value="m@google.com">m@google.com</SelectItem>
											<SelectItem value="m@support.com">
												m@support.com
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="commune"
							render={({ field }) => (
								<FormItem className="w-[180px]">
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="border rounded-xl">
												<SelectValue placeholder="Select Commune" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="m@example.com">
												m@example.com
											</SelectItem>
											<SelectItem value="m@google.com">m@google.com</SelectItem>
											<SelectItem value="m@support.com">
												m@support.com
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" className="border rounded-full w-[170px]">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default Address;
