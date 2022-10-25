
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IAdresse } from 'src/app/Models/IAdresse';
import { IProduct } from 'src/app/Models/IProduct.model';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import {GlobalConstant} from 'src/app/global/global';
import { IProducer } from 'src/app/Models/IProducer';
import { IAdressGeo } from 'src/app/Models/IAdressGeo';
import { MarkerService } from 'src/app/Services/marker.service';
import { ProducerService } from 'src/app/Services/producer.service';

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
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.scss']
})
export class ProducerListComponent implements OnInit{
  productPourEnfant:IProduct={} as IProduct;
  products:IProduct[]=[] as IProduct[];
  producers:IProducer[]=[] as IProducer[];
  dico=GlobalConstant.dico;
  coordGps:IAdressGeo[]=[];
  marker:any;
  
  private map!:L.Map
  constructor(
    private _productService:ProductServiceService,
    private _producerService:ProducerService,
    private _markerService:MarkerService
    ) { }
    
    ngOnInit(): void {
      this._producerService.GetProducers().subscribe({
        next:(data:IProducer[])=>{
            this.producers=data;
        }
      });
      this.Initmap();   
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
    public openProducerMarker(item:IProducer){
      if(this.marker==undefined)
      {
        this.marker=this._markerService.makeProducerMarkers(this.map,item);
      }
      else{
        this.marker.remove();
        this.marker=undefined;
      }
    }
  }
