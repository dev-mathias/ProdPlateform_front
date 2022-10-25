import { IAdresse } from "./IAdresse";

export interface IProducer {

    // public int Id { get; set; }
    // public string? Lastname { get; set; }
    // public string? Firstname { get; set; }
    // public string? Address { get; set; }
    // public string? Email { get; set; }
    // public string? Password { get; set; }
    id:number;
    lastname:string;
    firstname:string;
    address:IAdresse;
    email:string;
    password:string;
}
