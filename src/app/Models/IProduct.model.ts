

import { IProducer } from "./IProducer";


 export interface IProduct{
    id:number;
    name:string;
    description:string;
    quantity:number;
    price:number;
    producer:IProducer;
}