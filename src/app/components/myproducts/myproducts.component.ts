import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/IProduct.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.scss']
})
export class MyproductsComponent implements OnInit {
  products:IProduct[]=[];
  constructor(
    private _productService: ProductServiceService
  ) { }

  ngOnInit(): void {
    var producer=JSON.parse(sessionStorage.getItem("producer") || "");
    this._productService.GetProductByProducer(producer.id).subscribe(
      {
        next:(data:IProduct[])=>this.products=data,
      }
    )
  }
  public Delete(productId:number){
    this._productService.DeleteProduct(productId).subscribe();
  }
}
