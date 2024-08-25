export interface Address {
	location: number[];
	_id: string;
	user: string;
	username: string;
	is_main: boolean;
	phone: string;
	city: {
		name: string;
		idProvince: string;
		_id: string;
	};
	district: {
		name: string;
		idDistrict: string;
		_id: string;
	};
	commune: {
		name: string;
		idCommune: string;
		_id: string;
	};
	address: string;
	detailAddress: string;
	deleted: boolean;
}

export interface ObjectCheckoutOrder {
	listId: string[];
	addressId: string;
	voucher?: string;
	paymentMethod: number;
	note?: string;
  shippingCost?: number;
  returnUrl?: string;
}
