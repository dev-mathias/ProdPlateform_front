import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPurchase } from '../Models/IPurchase';
import { IPurchaseCreate } from '../Models/IPurchaseCreate';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
private _url:string="https://localhost:7290/api/Purchase/";
constructor(
  private httpClient: HttpClient
  ) { }
public CreatePurchase(purchase:IPurchaseCreate ):Observable<IPurchase>{
  return this.httpClient.post<IPurchase>(this._url,purchase);
}
public GetPurchaseByCustomer(customerId:number):Observable<IPurchase[]>{
  return this.httpClient.get<IPurchase[]>(this._url+"?customerId="+customerId);
}
}
