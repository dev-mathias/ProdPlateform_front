import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/IProduct.model';
import { IPurchaseCreate } from 'src/app/Models/IPurchaseCreate';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { PurchaseService } from 'src/app/Services/purchase.service';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  @Input() product!:IProduct;
  purchase:IPurchaseCreate={} as IPurchaseCreate;
  
  constructor(
    private _router:Router,
    private _purchaseService:PurchaseService
  ) { }

  ngOnInit(): void {

    this.purchase.quantity=this.product.quantity/2 ; //Pour le range(avoir une valeur par défault au milieu)
    
  }

  public AddPurchase(purchase:IPurchaseCreate){
    var data= JSON.parse(sessionStorage.getItem("customer")|| "");
    this.purchase.customerId=data.id;
    this.purchase.date=new Date();
    this.purchase.productId=this.product.id;
    console.log(this.purchase.customerId);
    console.log(this.purchase.quantity);
    console.log(this.purchase.productId);
    console.log(this.purchase.date);
    this._purchaseService.CreatePurchase(purchase).subscribe({
      complete:()=>this._router.navigateByUrl("/MyPurchases")
    });
  }
}
