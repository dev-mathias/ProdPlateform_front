import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IAdresse } from 'src/app/Models/IAdresse';
import { IProduct } from 'src/app/Models/IProduct.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import {GlobalConstant} from 'src/app/global/global';
import { IProducer } from 'src/app/Models/IProducer';
import { IAdressGeo } from 'src/app/Models/IAdressGeo';
import { MarkerService } from 'src/app/Services/marker.service';

const iconRetinaUrl = 'assets\\marker\\marker-icon-2x.png';
const iconUrl = 'assets\\marker\\marker-icon.png';
const shadowUrl = 'assets\\marker\\marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  productPourEnfant:IProduct={} as IProduct;
  products:IProduct[]=[] as IProduct[];
  producer:IProducer={} as IProducer;
  dico=GlobalConstant.dico;
  coordGps:IAdressGeo[]=[];
  
  private map!:L.Map
  constructor(
    private _productService:ProductServiceService,
    private _markerService:MarkerService
    ) { }
    
    ngOnInit(): void {
      this._productService.GetProducts<IProduct[]>().subscribe({
        next:(data:IProduct[])=>{
            this.products=data;
        }
      })
      this.Initmap();
      this._markerService.makeMarkers(this.map);
     
  }
    private Initmap(): void{
      this.map=L.map('map').setView([50.4,4.4],9);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom:19, 
        minZoom:3,
        attribution:'<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    }
    public openPopUp(item:IProduct){
      this._markerService.openPopUp(this.map,item);
    }
    public changeProductEnfant(item:IProduct){
      this.productPourEnfant=item;
    }

  }
