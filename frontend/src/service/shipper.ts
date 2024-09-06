import instance from "@/config/instance";
import { IOrderShipper, IShipper } from "@/types/shipper.interface";

export const registerShipper = async (obj: IShipper) =>
	instance.post(`/shipper/registerShipper`, obj);

export const getCurrentShipper = async () =>
	instance.get(`/shipper/getCurrentShipper`);

export const getListOrderMap = async (status: string) =>
	instance.get(`/shipper/getListOrderMap/${status}`);

export const getOrderMapByCode = async (code: string) =>
	instance.get(`/shipper/getOrderByCode/${code}`);

export const updateStatusShippingOrder = async (id: string): Promise<any> =>
	instance.put(`/shipper/updateStatusShippingOrder/` + id);

export const updateStatusShippedOrder = async (id: string): Promise<any> =>
	instance.put(`/shipper/updateStatusShippedOrder/` + id);

export const pagingShipperOrder = async (ObjectSearchShipper: any) =>
	instance.post(`/shipper/paging`, ObjectSearchShipper);
