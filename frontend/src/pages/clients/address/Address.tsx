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
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { callCity, callCommune, callDistrict } from "@/service/address";
import AddressInformation from "./AddressInformation";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    }).max(10, {
      message: "Bạn phải nhập ít nhất 10 kí tự",
    }).startsWith("0", {
     message: "Không hợp lệ" 
    }).trim(),
	address: z.string({
		message: "Bạn phải nhập địa chỉ",
	}),
  city: z.string({
    message: "Bạn phải nhập tỉnh/thành phố",
  }),
  district: z.string({
    message: "Bạn phải nhập quận/huyện",
  }),
  commune: z.string({
    message: "Bạn phải nhập xã/phường",
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
	idCommune: string | null;
}

type Props = {};

const Address = (props: Props) => {
	const [citys, setCitys] = useState<ICity[] | null>(null);
	const [districts, setDistricts] = useState<IDistrict[] | null>(null);
  const [commune, setCommune] = useState<ICommune[] | null>(null);
  const queryClient = useQueryClient();
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		(async () => {
			const { data } = await callCity();
			setCitys(data);
		})();
  }, []);
  const onSubmit =(dataForm: any) => {
    
    const city = citys?.find(city => city.idProvince === dataForm.city)
    const district = districts?.find(district => district.idDistrict === dataForm.district)
    const communes = commune?.find(commune => commune.idCommune === dataForm.commune)
    let dataNew = { username: dataForm.username, phone: dataForm.phone, address: dataForm.address, city: city, district: district, commune: communes }
    mutate(dataNew)
    
	};
  const { mutate } = useMutation({
		mutationFn: async (dataNew: any) => {
			try {
				const { data } = await axios.post(
					`http://localhost:5000/api/v1/address/addAddress`,
					dataNew,
					{
						headers: {
							Authorization:
								"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTg0NGFkYzc1ZTk1ZDc1NzZkOWI4ZiIsImVtYWlsIjoidHV5ZW4yMDA0QGdtYWlsLmNvbSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNzE3MjU0ODEwLCJleHAiOjE3MTcyNTg0MTB9.8vFxsSAEDBwVU8wKfPsHfV6aC9dgWL8QOAZJTxoDKi8",
						},
					},
				);
				console.log(data);
				toast.success("Bạn thêm địa chỉ thành công");
			} catch (error: any) {
				toast.error(error.response!.data!.message);
			}
		},
    onSuccess: () => {
      form.reset();
			queryClient.invalidateQueries({
				queryKey: ["address"],
			});
		},
		onError: () => {
			toast.error("Bạn thêm địa chỉ thất bại");
		},
	});
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
		<div className="padding mx-auto px-[20px] sm:px-[30px] md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="flex flex-row gap-3 w-full">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="">Username</FormLabel>
										<FormControl>
											<Input
												placeholder="Họ và Tên"
												{...field}
												className="border rounded-xl"
											/>
										</FormControl>
										<FormMessage className="" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="">Số điện thoại</FormLabel>
										<FormControl>
											<Input
												placeholder="Số điện thoại"
												{...field}
												className="border rounded-xl"
											/>
										</FormControl>
										<FormMessage className="" />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="">Địa chỉ</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập địa chỉ chi tiết"
											{...field}
											className="border rounded-xl"
										/>
									</FormControl>
									<FormMessage className="" />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 w-full gap-4 sm:grid-cols-3">
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => {
									return (
										<FormItem className="">
											<FormLabel className="">Thành phố</FormLabel>
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
														<SelectValue placeholder="Lựa chọn thành phố" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="">
													{citys?.map((city: any) => {
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
										<FormItem className="">
											<FormLabel className="">Quận Huyện</FormLabel>
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
														<SelectValue placeholder="Lựa chọn quận huyện"/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{districts?.map((district: any) => {
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
									<FormItem className="">
										<FormLabel className="">Phường , Xã</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="">
													<SelectValue placeholder="Lựa chọn phường xã"/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{commune?.map((commune: any) => {
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
							Chọn
						</Button>
					</form>
				</Form>
				<AddressInformation/>
			</div>
		</div>
	);
};

export default Address;
