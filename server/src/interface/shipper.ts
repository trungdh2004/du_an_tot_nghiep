import { IAddress } from "./address";
import { IUser } from "./models";

export interface IShipper {
    user:string | IUser;
    firstName:string;
    lastName:string;
    fullName:string;
    birthDate:string;
    address:string | IAddress;
    idCitizen:string;
    avatar:string;
    phone:string;
    is_block:boolean;
    active:boolean;
    block_at:string;
    totalIncome:number;
    createdAt:string;
    updatedAt:string;
}