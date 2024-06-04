import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { callCity, callCommune, callDistrict, editAddress, getAddressById } from "@/service/address";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
		})
		.max(10, {
			message: "Bạn phải nhập ít nhất 10 kí tự",
		})
		.startsWith("0", {
			message: "Không hợp lệ",
		})
		.trim(),
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

const EditAddress = ({ open, handleClose, id }: any) => {
	const [citys, setCitys] = useState<ICity[] | null>(null);
	const [districts, setDistricts] = useState<IDistrict[] | null>(null);
	const [commune, setCommune] = useState<ICommune[] | null>(null);
	const queryClient = useQueryClient();
	const [dataValue, setDataValue] = useState<any | null>(null);
	console.log(dataValue);
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		const fetchAlldata = async () => {
			const { data } = await getAddressById(id);
			setDataValue(data);
			form.reset({
				username: data.data.username,
				phone: data.data.phone,
				address: data.data.address,
				city: data.data.city.idProvince,
				district: data.data.district.idDistrict,
				commune: data.data.commune.idCommune,
			});
			const { data: district } = await callDistrict(
				data?.data?.city.idProvince,
			);
			setDistricts(district);
			const { data: commune } = await callCommune(
				data?.data?.district.idDistrict,
			);
			setCommune(commune);
		};
		fetchAlldata();
	}, [id]);

	useEffect(() => {
		(async () => {
			const { data } = await callCity();
			setCitys(data);
		})();
	}, []);

	const onSubmit = async (dataForm: any) => {
		const city = citys?.find((city) => city.idProvince === dataForm.city);
		const district = districts?.find(
			(district) => district.idDistrict === dataForm.district,
		);
		const communes = commune?.find(
			(commune) => commune.idCommune === dataForm.commune,
		);
		let dataNew = {
			username: dataForm.username,
			phone: dataForm.phone,
			address: dataForm.address,
			city: city,
			district: district,
			commune: communes,
		};
		mutate(dataNew);
	};
	const { mutate } = useMutation({
		mutationFn: async (dataNew: any) => {
				const { data } = await editAddress({id,dataNew})
		},
		onSuccess: () => {
      handleClose(null);
      toast.success("Bạn cập nhật địa chỉ thành công");
			queryClient.invalidateQueries({
				queryKey: ["address"],
      });
		},
		onError: () => {
			handleClose(null);
			toast.error("Bạn cập nhật địa chỉ thất bại");
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
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[660px]">
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
									<FormLabel className="">Địa chỉ chi tiết</FormLabel>
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
													setCommune(null);
													handleOnChangeDistrict(e);
												}}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="border">
														<SelectValue placeholder="Lựa chọn quận huyện" />
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
													<SelectValue placeholder="Lựa chọn phường xã" />
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
						<h4 className="text-sm">
							<strong>Địa chỉ</strong> : {dataValue?.data?.location}
						</h4>
						<Button
							type="submit"
							className="border rounded-full w-[170px] bg-slate-950"
						>
							Sửa
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditAddress;
