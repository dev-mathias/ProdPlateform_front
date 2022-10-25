import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/IProduct.model';
import { IProductUpdate } from 'src/app/Models/IProductUpdate';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  product:IProduct={} as IProduct
  productUpdate:IProductUpdate ={} as IProductUpdate
  fg!:FormGroup

  constructor(
    private _productService:ProductServiceService,
    private _route:ActivatedRoute,
    private _builder:FormBuilder,
    private _router:Router
  ) { }

  ngOnInit(  ): void {
    this._productService.GetProduct(this._route.snapshot.params["id"]).subscribe({
      next: (data:IProduct)=> this.product=data
    })
    this.fg=this._builder.group({
      nom:[this.product.name,[Validators.required]],
      description:[this.product.description,[Validators.required]],
      quantite:[this.product.quantity,[Validators.required]],
      prix:[this.product.price,[Validators.required]],
     })
    
  }
  UpdateProduct(productUpdate:IProductUpdate){
    productUpdate.name=this.product.name;
    productUpdate.price=this.product.price;
    productUpdate.quantity=this.product.quantity;
    productUpdate.price=this.product.price;
    this._productService.UpdateProduct(this.product.id,productUpdate).subscribe({
      complete:()=>this._router.navigateByUrl("/MyProducts")
    });
  }
}



