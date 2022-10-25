import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstant } from 'src/app/global/global';
import { IProduct } from 'src/app/Models/IProduct.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-productbyproducer',
  templateUrl: './productbyproducer.component.html',
  styleUrls: ['./productbyproducer.component.scss']
})
export class ProductbyproducerComponent implements OnInit {
  productPourEnfant:IProduct={} as IProduct;
  dico=GlobalConstant.dico;
  id!:number;
  products:IProduct[]=[] as IProduct[];
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _productService:ProductServiceService
  ) { }

  ngOnInit(): void {
    this.id=this._activatedRoute.snapshot.params['id'];
    this._productService.GetProductByProducer(this.id).subscribe({
      next: (data:IProduct[])=> this.products=data
    });
  }
  public changeProductEnfant(item:IProduct){
    this.productPourEnfant=item;
  }

}
