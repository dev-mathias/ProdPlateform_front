import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/Models/ICustomer';
import { IProducer } from 'src/app/Models/IProducer';

@Component({
  selector: 'app-myprofil',
  templateUrl: './myprofil.component.html',
  styleUrls: ['./myprofil.component.scss']
})
export class MyprofilComponent implements OnInit {
  customer:ICustomer={} as ICustomer;
  producer:IProducer={} as IProducer;
  constructor() { } 

  ngOnInit(): void {
    if(sessionStorage.getItem("producer")!=null) {
      var data=JSON.parse(sessionStorage.getItem("producer")||"");
      this.producer=data;
    }else{
      var data=JSON.parse(sessionStorage.getItem("customer")||"");
      this.customer=data;
    }


  }

}
