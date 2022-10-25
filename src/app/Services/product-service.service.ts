import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IProductCreate } from '../Models/IProductCreate';
import { IProduct } from '../Models/IProduct.model';
import { IProductUpdate } from '../Models/IProductUpdate';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private _url:string = "https://localhost:7290/api/Product/"
  constructor(private _httpClient:HttpClient) { }

  public GetProducts<IProduct> () : Observable<IProduct>
  {
    return this._httpClient.get<IProduct>(this._url);
  }

  public CreateProducts(product:IProductCreate) :Observable<IProduct>{
    return this._httpClient.post<IProduct>(this._url,product);
  }
  public GetProduct(id:number) : Observable<IProduct>{
    return this._httpClient.get<IProduct>(this._url+id);
  }
  public GetProductByProducer(producerId:number) : Observable<IProduct[]>{
    return this._httpClient.get<IProduct[]>(this._url+"producer/"+producerId);
  }
  public DeleteProduct(id:number):Observable<IProduct>{
    return this._httpClient.delete<IProduct>(this._url+id);
  }
  public UpdateProduct(id:number, product:IProductUpdate): Observable<IProduct>
  {
    return this._httpClient.put<IProduct>(this._url+id,product);
  }
}
