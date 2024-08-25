
export interface IAddress {
	username: string;
	phone: string;
	city: {
		name: string;
		idProvince: string;
		_id?: string;
	};
	district: {
		name: string;
		idDistrict: String;
		_id?: string;
	};
	commune: {
		name: string;
		idCommune: string;
		_id?: string;
	};
	user: string;
	address: string;
	detailAddress: string;
    deleted:boolean;
    createdAt:string;
    updatedAt:string;
    location:{
        type:string;
        coordinates:number[]
    }
}
