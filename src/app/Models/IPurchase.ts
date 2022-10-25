import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct.model";

export interface IPurchase {
    // public int Id { get; set; }
    // public DateTime Date { get; set; }
    // public Product Product{ get; set; }
    // public Customer Customer { get; set; }
    // public decimal Quantity { get; set; }

    id:number;
    date:Date;
    product:IProduct;
    customer:ICustomer;
    quantity:number;
}
