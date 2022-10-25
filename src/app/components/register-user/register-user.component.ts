import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserCreate } from 'src/app/Models/IUserCreate';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  user:IUserCreate={} as IUserCreate;
  fg!:FormGroup

  constructor(
    private _builder:FormBuilder,
    private _customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.fg=this._builder.group({
      nom:[null,[Validators.minLength(3),Validators.maxLength(50), Validators.required]],
      prenom:[null,[Validators.minLength(3),Validators.maxLength(50), Validators.required]],
      email:["mail@example.com",[Validators.minLength(3),Validators.maxLength(50), Validators.required]],
      password:[null,[Validators.minLength(6),Validators.maxLength(20), Validators.required]],
      confirm:[null,[ Validators.required]],
      rue:[null,[ Validators.required]],
      numero:[null,[ Validators.required]],
      codepostal:[null,[ Validators.required]],
      ville:[null,[ Validators.required]],
      pays:[null,[ Validators.required]],
    })
  }
  public AddCustomer(user:IUserCreate){
    this._customerService.CreateCustomer(user).subscribe();
  }

}
