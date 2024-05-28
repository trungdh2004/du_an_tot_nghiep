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
import { toast } from "sonner";
import { callCity, callCommune, callDistrict } from "@/service/address";

const formSchema = z.object({
	username: z
		.string({
			message: "Bạn phải nhập họ tên",
		})
		.min(6, {
			message: "Bạn phải nhập ít nhất 6 kí tự",
		}),
	phone: z
		.string({
			message: "Bạn phải nhập số điện thoại",
		})
		.min(10, {
			message: "Bạn phải nhập ít nhất 10 kí tự",
		}),
	address: z.string({
		message: "Bạn phải nhập địa chỉ",
	}),
	city: z.string({
		message: "Bạn phải chọn tên thành phố",
	}),
	district: z.string({
		message: "Bạn phải chọn tên quận/huyện",
	}),
	commune: z.string({
		message: "Bạn phải chọn tên phường/xã",
	}),
});

interface ICity {
	idProvince: string;
	name: string;
}

interface IDistrict extends ICity {
	idDistrict: string | null;
}
interface ICommune extends IDistrict {
	idDistrict: string | null;
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
			const { data } = await callCity();
			setCitys(data);
		})();
	}, []);
	const onSubmit = (data: any) => {
		console.log(data);
	};

	const handleOnChangeCity = async (idProvince: string) => {
		try {
			const { data } = await callDistrict(idProvince);
			setDistricts(data);
		} catch (error: any) {
			toast.error(error.response!.data!.message);
		}
	};

	const handleOnChangeDistrict = async (idDistrict: string) => {
		try {
			const { data } = await callCommune(idDistrict);
			setCommune(data);
		} catch (error: any) {
			toast.error(error.response!.data!.message);
		}
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
												setDistricts(null);
												setCommune(null);
												console.log("e:", e);
												form.setValue("district", null);
												form.setValue("commune", null);
												handleOnChangeCity(e);

												field.onChange(e);
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
															className=""
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
												console.log("e2", e);

												setCommune(null);
												handleOnChangeDistrict(e);
											}}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="border">
													<SelectValue placeholder="Select District" hidden />
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
											<SelectTrigger className="">
												<SelectValue placeholder="Select commune" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{commune?.map((commune: any, index: number) => {
												return (
													<SelectItem
														value={commune.idCommune}
														className=""
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
