import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICustomer } from '../Models/ICustomer';
import { ILoginForm } from '../Models/ILoginForm';
import { IProducer } from '../Models/IProducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isConnected:boolean=false;
    whoIsConnected!:string;
    
    private _url:string ="https://localhost:7290/api/Auth/";

    private authEvent: BehaviorSubject<string> = new BehaviorSubject("undefined");
    constructor(
    private _httpClient:HttpClient
    ) { }
    
    public Login(form:ILoginForm ) :Observable<ICustomer|IProducer>{
       return this._httpClient.post<ICustomer|IProducer>(this._url,form);
    }
    // public changeIsConnected() {
    //   this.isConnected = !this.isConnected;
    //   this.change.emit(this.isConnected);
    // }
    public ChangeWhoIsConnected(){
      if(sessionStorage.getItem("customer") !== null) this.whoIsConnected="customer";
      else if(sessionStorage.getItem("producer")!==null) this.whoIsConnected=  "producer";
      else if(sessionStorage.getItem("admin")!==null) this.whoIsConnected="admin"
      else this.whoIsConnected ="undefined";
      this.emitAuthStatus(this.whoIsConnected);
    }
    emitAuthStatus(whoIsConnected:string){
      this.authEvent.next(whoIsConnected);
    }
    authListener(){
      return this.authEvent.asObservable();
    }
}
