import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { IProducer } from '../Models/IProducer';
import { IProduct } from '../Models/IProduct.model';
import {GlobalConstant} from 'src/app/global/global';
import { LowerCasePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class MarkerService {

private _dico=GlobalConstant.dicoPopUp;
private _url:string= "https://localhost:7290/api/Producer/"


constructor(
  private _httpClient:HttpClient
) { }
makeMarkers(map: L.Map): void { 
  this._httpClient.get<IProducer[]>(this._url).subscribe((res: IProducer[]) => {
    for (var p of res) {
      const lon = p.address.long;
      const lat = p.address.lat;
      var marker= L.marker([lat, lon]).addTo(map);
    }
  });
}
makeProducerMarkers(map: L.Map, producer:IProducer): L.Marker<any> { 
  const lon = producer.address.long;
  const lat = producer.address.lat;
  var marker= L.marker([lat, lon]).addTo(map);
  return marker;
}
public openPopUp(map:L.Map,product:IProduct):void{
  const lon = product.producer.address.long
  const lat = product.producer.address.lat;
  var marker=L.marker([lat,lon]);
  marker.bindPopup(product.producer.lastname).openPopup();
  let urlImg : string=this._dico[product.name];
  var popup = L.popup()
    .setLatLng([lat,lon])
    .setContent("<img src=\"" + urlImg.toLowerCase()+ "\" width=\"64\" height=\"64\">")  // <img src="url">
    .openOn(map);
}

}
