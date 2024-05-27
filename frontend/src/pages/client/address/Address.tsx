import React, { useEffect, useRef, useState } from "react";
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

interface ICity {
	idProvince: string;
	name: string;
}

interface IDistrict extends ICity {
	idDistrict: string;
}
interface ICommune extends IDistrict {
	idDistrict: string;
}

type Props = {};

const Address = (props: Props) => {
	const [citys, setCitys] = useState<ICity[] | null>(null);
	const [districts, setDistricts] = useState<IDistrict[] | null>(null);
	const [commune, setCommune] = useState<ICommune[] | null>(null);
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(
				"https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province",
			);
			setCitys(data);
		})();
	}, []);
	const onSubmit = (data: any) => {
		console.log(data);
	};

	const handleOnChangeCity = async (idProvince: string) => {
		try {
			const { data } = await axios.get(
				`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district?idProvince=${idProvince}`,
			);
			console.log("data:", data);

			setDistricts(data);
		} catch (error) {}
	};

	const handleOnChangeDistrict = async (idDistrict: string) => {
		try {
			const { data } = await axios.get(
				`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=${idDistrict}`,
			);
			setCommune(data);
		} catch (error) {}
	};

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
							render={({ field }) => {
								return (
									<FormItem className="w-[180px]">
										<Select
											onValueChange={(e) => {
												field.onChange(e);
												setDistricts(null);
												setCommune(null);
												console.log("e:", e);

												handleOnChangeCity(e);
											}}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="border">
													<SelectValue placeholder="Select City" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="">
												{citys?.map((city: any, index: number) => {
													return (
														<SelectItem
															value={city.idProvince}
															className="border mb-3"
															key={city.idProvince}
														>
															<p>{city.name}</p>
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="district"
							render={({ field }) => {
								return (
									<FormItem className="w-[180px]">
										<Select
											onValueChange={(e) => {
												field.onChange(e);
												setCommune(null);
												handleOnChangeDistrict(e);
											}}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="border">
													<SelectValue placeholder="Select District" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{districts?.map((district: any, index: number) => {
													return (
														<SelectItem
															value={district.idDistrict}
															className=""
															key={district.idDistrict}
														>
															{district.name}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
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
												<SelectValue placeholder="Select commune" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{commune?.map((commune: any, index: number) => {
												return (
													<SelectItem
														value={commune.idCommune}
														className="border rounded-[30px] mb-3"
														key={commune.idCommune}
													>
														{commune.name}
													</SelectItem>
												);
											})}
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
