import { ComponentRef, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ChoixUserComponent } from './components/choix-user/choix-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MapComponent } from './components/map/map.component';
import { MyproductsComponent } from './components/myproducts/myproducts.component';
import { MyprofilComponent } from './components/myprofil/myprofil.component';
import { MypurchaseComponent } from './components/mypurchase/mypurchase.component';
import { ProducerListComponent } from './components/producer-list/producer-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductbyproducerComponent } from './components/productbyproducer/productbyproducer.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { RegisterProducerComponent } from './components/register-producer/register-producer.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  { path:"ProductList", component:ProductListComponent},
  {path:"ProducerList", component:ProducerListComponent},
  {path:"About", component:AboutComponent},
  {path:"Home", component:HomeComponent},
  {path:"Login", component:LoginComponent},
  {path:"Logout", component:LogoutComponent},
  {path:"Choix", component:ChoixUserComponent},
  {path:"RegisterUser", component:RegisterUserComponent},
  {path:"RegisterProducer", component:RegisterProducerComponent},
  {path:"Addproduct", component:AddproductComponent},
  {path:"Purchase/:id", component:PurchaseComponent},
  {path:"MyProfil", component:MyprofilComponent},
  {path:"MyProducts", component:MyproductsComponent},
  {path:"UpdateProduct/:id", component:UpdateProductComponent},
  {path:"MyPurchases", component:MypurchaseComponent},
  {path:"Map", component:MapComponent},
  {path:"ProductbyProducer/:id", component:ProductbyproducerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
