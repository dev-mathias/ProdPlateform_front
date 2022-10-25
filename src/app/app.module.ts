import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProducerListComponent } from './components/producer-list/producer-list.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoixUserComponent } from './components/choix-user/choix-user.component';
import { RegisterProducerComponent } from './components/register-producer/register-producer.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { MypurchaseComponent } from './components/mypurchase/mypurchase.component';
import { MyprofilComponent } from './components/myprofil/myprofil.component';
import { MyproductsComponent } from './components/myproducts/myproducts.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';
import { MarkerService } from './Services/marker.service';
import { ProductbyproducerComponent } from './components/productbyproducer/productbyproducer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductListComponent,
    ProducerListComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    ChoixUserComponent,
    RegisterProducerComponent,
    RegisterUserComponent,
    AddproductComponent,
    LogoutComponent,
    PurchaseComponent,
    MypurchaseComponent,
    MyprofilComponent,
    MyproductsComponent,
    UpdateProductComponent,
    MapComponent,
    ProductbyproducerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule
  
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
