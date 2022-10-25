import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProductCreate } from 'src/app/Models/IProductCreate';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  fg!:FormGroup;
  product:IProductCreate={} as IProductCreate;
  constructor(
    private _builder:FormBuilder,
    private _productService: ProductServiceService,
    private _router:Router
  ) { }

  ngOnInit(): void {
   this.fg=this._builder.group({
    nom:[null,[Validators.required]],
    description:[null,[Validators.required]],
    quantite:[null,[Validators.required]],
    prix:[null,[Validators.required]],
   })
  }

  public AddProduct(product: IProductCreate){
 
    var data=JSON.parse(sessionStorage.getItem("producer")||"");
    product.producerId=data.id;
    product.name=product.name.toLowerCase();
    this._productService.CreateProducts(product).subscribe({
      complete:()=>this._router.navigateByUrl("/MyProducts")
    });
  }

}
