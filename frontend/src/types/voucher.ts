export interface IVoucher {
	code: string;
	createdAt: string;
	description: string;
	discountType: number;
	discountValue: number;
	endDate: string;
	minimumOrderValue: number;
	modifiedBy: string;
	modifiedDate: string;
	name: string;
	startDate: string;
	status: number;
	updatedAt: string;
	usageCount: number;
	usageLimit: number;
	user: string;
	_id: string;
}
