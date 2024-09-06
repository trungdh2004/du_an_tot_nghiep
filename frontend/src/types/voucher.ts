interface VoucherCheck {
	_id: string;
	name: string;
	description: string;
	code: string;
	startDate: string;
	endDate: string;
	discountType: number;
	discountValue: number;
	usageLimit: number;
	minimumOrderValue: number;
	usageCount: number;
	status: number;
	version: number;
	modifiedDate: string | null;
	modifiedBy: string | null;
	user: string;
}
