import { IAdresse } from "./IAdresse";

export interface ICustomer {
    id:number;
    lastname:string;
    firstname:string;
    address:IAdresse;
    email:string;
    password:string;
    isAdmin:boolean;
}
