import { Component, OnInit } from '@angular/core';
import { IPurchase } from 'src/app/Models/IPurchase';
import { PurchaseService } from 'src/app/Services/purchase.service';

@Component({
  selector: 'app-mypurchase',
  templateUrl: './mypurchase.component.html',
  styleUrls: ['./mypurchase.component.scss']
})
export class MypurchaseComponent implements OnInit {
  purchases:IPurchase[]=[];
  constructor(
    private _purchaseService:PurchaseService
  ) { }

  ngOnInit(): void {
    var customer=JSON.parse(sessionStorage.getItem("customer")|| "");
    this._purchaseService.GetPurchaseByCustomer(customer.id).subscribe({
      next:(data:IPurchase[])=>this.purchases=data,
      complete:()=>console.log("ok")
    })

    

  }

}
