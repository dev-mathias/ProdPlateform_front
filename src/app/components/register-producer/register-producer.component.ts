import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IProducer } from 'src/app/Models/IProducer';
import { IProducerCreate } from 'src/app/Models/IProducerCreate';
import { ProducerService } from 'src/app/Services/producer.service';

@Component({
  selector: 'app-register-producer',
  templateUrl: './register-producer.component.html',
  styleUrls: ['./register-producer.component.scss']
})
export class RegisterProducerComponent implements OnInit {
  fg!:FormGroup
  producer:IProducerCreate={ } as IProducerCreate;
  constructor(
    private _builder:FormBuilder,
    private _producerServicer:ProducerService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.fg=this._builder.group({
      nom:[null,[Validators.minLength(3),Validators.maxLength(50), Validators.required]],
      email:["mail@example.com",[Validators.email,Validators.maxLength(384), Validators.required]],
      password:[null,[Validators.minLength(6),Validators.maxLength(50), Validators.required]],
      confirm:[null,[Validators.required]],
      rue:[null,[Validators.required]],
      numero:[null,[Validators.required]],
      codepostal:[null,[Validators.required]],
      ville:[null,[Validators.required]],
      pays:[null,[Validators.required]],
    })
  }
  public AddProducer(producer:IProducerCreate){
    this._producerServicer.CreateProducer(producer).subscribe({
      complete:()=>this._router.navigateByUrl("Login")
    });
  }
}
