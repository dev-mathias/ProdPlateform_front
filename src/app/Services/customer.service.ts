import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../Models/ICustomer';
import { IUserCreate } from '../Models/IUserCreate';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private _url:string= "https://localhost:7290/api/Customer/"
constructor(
  private _http:HttpClient
) { }

public CreateCustomer(customer:IUserCreate):Observable<ICustomer>
{
  return this._http.post<ICustomer>(this._url,customer);
}

}
