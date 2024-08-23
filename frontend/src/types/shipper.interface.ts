import { IAddress } from "./address";

export interface IShipper {
    user?: string ;
    fullName: string;
    birthDate: Date;
    address: string ;
    idCitizen: string;
    avatar: string;
    phone: string;
    is_block?: boolean;
    active?: boolean;
    block_at?: string;
    totalIncome?: number;
    createdAt?: string;
    updatedAt?: string;
    city: {
      name: string;
      idProvince: string;
    };
    district: {
      name: string;
      idDistrict: String;
    };
    commune: {
      name: string;
      idCommune: string;
    };
  }


  export interface IOrderShipper {
    _id?:string,
    code:string,
    address:IAddress;
    totalMoney:number;
    amountToPay:number;
    shippingCost:number;
    status:number;
    orderItems:string[],
    note:string
  }