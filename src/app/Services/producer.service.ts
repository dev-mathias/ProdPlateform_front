import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducer } from '../Models/IProducer';
import { IProducerCreate } from '../Models/IProducerCreate';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  private _url:string = "https://localhost:7290/api/Producer/"
  constructor(
  private _httpClient:HttpClient
  ) { }

  public GetProducers(): Observable<IProducer[]>
  {
    return this._httpClient.get<IProducer[]>(this._url);
  }
  public CreateProducer(producer:IProducerCreate) :Observable<IProducer>
  {
    return this._httpClient.post<IProducer>(this._url,producer);
  }

}
